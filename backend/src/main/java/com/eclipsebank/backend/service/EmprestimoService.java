package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.enums.StatusEmprestimo;
import com.eclipsebank.backend.enums.TipoEmprestimo;
import com.eclipsebank.backend.enums.TipoTransacao;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.model.Emprestimo;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.repository.EmprestimoRepository;


@Service
public class EmprestimoService {
    
    private final EmprestimoRepository emprestimoRepository;
    private final ContaRepository contaRepository;
    private final TransacaoService transacaoService;

    public EmprestimoService(EmprestimoRepository emprestimoRepository, ContaRepository contaRepository, TransacaoService transacaoService) {
        this.emprestimoRepository = emprestimoRepository;
        this.contaRepository = contaRepository;
        this.transacaoService = transacaoService;
    }

    public List<Emprestimo> listar() {
        return emprestimoRepository.findAll();
    }

    public Emprestimo buscarPorId(Long id) {
        return emprestimoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Emprestimo nao encontrado."));
    }

    public List<Emprestimo> listarPorConta(Long contaId) {
        return emprestimoRepository.findByContaId(contaId);
    }

    private void validacoes(Emprestimo emprestimo) {
        if (emprestimo.getTipo() == null) {
            throw new IllegalArgumentException("Tipo de emprestimo obrigatorio.");
        }

        if (emprestimo.getValorSolicitado() == null || emprestimo.getValorSolicitado() <= 0) {
            throw new IllegalArgumentException("Valor solicitado deve ser maior que zero.");
        }

        if (emprestimo.getQuantidadeParcelas() == null || emprestimo.getQuantidadeParcelas() <= 0) {
            throw new IllegalArgumentException("Quantidade de parcelas deve ser maior que zero.");
        }
    }

    public Emprestimo simular(Long contaId, Emprestimo emprestimo) {
        Conta conta = contaRepository.findById(contaId)
            .orElseThrow(() -> new IllegalArgumentException("Conta nao encontrada."));

        validacoes(emprestimo);

        double taxa = definirTaxaJuros(emprestimo.getTipo());
        double jurosTotal = emprestimo.getValorSolicitado() * taxa * emprestimo.getQuantidadeParcelas();
        double valorTotal = emprestimo.getValorSolicitado() + jurosTotal;
        double valorParcela = valorTotal / emprestimo.getQuantidadeParcelas();

        emprestimo.setConta(conta);
        emprestimo.setTaxaJurosMensal(taxa);
        emprestimo.setValorTotal(valorTotal);
        emprestimo.setParcelasPagas(0.0);
        emprestimo.setSaldoDevedor(valorTotal);
        emprestimo.setValorParcela(valorParcela);
        emprestimo.setStatus(StatusEmprestimo.SIMULADO);
        emprestimo.setDataSolicitacao(LocalDateTime.now());

        return emprestimoRepository.save(emprestimo);
    }

    private double definirTaxaJuros(TipoEmprestimo tipoEmprestimo) {
        return switch (tipoEmprestimo) {
            case PESSOAL -> 0.045;
            case CONSIGNADO -> 0.025;
            case EMPRESARIAL -> 0.035;
        };
    }

    public Emprestimo contratar(Long emprestimoId) {
        Emprestimo emprestimo = buscarPorId(emprestimoId);

        if (emprestimo.getStatus() != StatusEmprestimo.SIMULADO) {
            throw new IllegalArgumentException("Apenas emprestimos simulados podem ser contratados.");
        }

        Conta conta = emprestimo.getConta();

        if (conta == null || conta.getId() == null) {
            throw new IllegalArgumentException("Emprestimo sem conta vinculada.");
        }

        conta.setSaldo(conta.getSaldo() + emprestimo.getValorSolicitado());
        emprestimo.setStatus(StatusEmprestimo.CONTRATADO);

        contaRepository.save(conta);

        transacaoService.registrar(
            conta,
            TipoTransacao.EMPRESTIMO_CONTRATADO,
            emprestimo.getValorSolicitado(),
            "Contratacao de emprestimo " + emprestimo.getTipo(),
            "Emprestimos"
        );

        return emprestimoRepository.save(emprestimo);
    }

    public Emprestimo pagarParcela(Long emprestimoId) {
        Emprestimo emprestimo = buscarPorId(emprestimoId);

        if (emprestimo.getStatus() != StatusEmprestimo.CONTRATADO) {
            throw new IllegalArgumentException("Apenas emprestimos contratados pode pagar parcelas");
        }

        Conta conta = emprestimo.getConta();

        if (conta == null || conta.getId() == null) {
            throw new IllegalArgumentException("Emprestimo sem conta vinculada.");
        }

        double saldoDevedor = emprestimo.getSaldoDevedor() == null
            ? emprestimo.getValorTotal()
            : emprestimo.getSaldoDevedor();

        if (saldoDevedor <= 0) {
            throw new IllegalArgumentException("Emprestimo ja esta quitado");
        }

        double valorPagamento = Math.min(emprestimo.getValorParcela(), saldoDevedor);

        if (conta.getSaldo() < valorPagamento) {
            throw new IllegalArgumentException("Saldo insuficiente para pagar a parcela.");
        }

        double parcelasPagas = emprestimo.getParcelasPagas() == null
            ? 0
            : emprestimo.getParcelasPagas();

        conta.setSaldo(conta.getSaldo() - valorPagamento);
        emprestimo.setParcelasPagas(parcelasPagas + 1);
        emprestimo.setSaldoDevedor(saldoDevedor - valorPagamento);

        if (
            emprestimo.getSaldoDevedor() <= 0 ||
            emprestimo.getParcelasPagas() >= emprestimo.getQuantidadeParcelas()
        ) {
            emprestimo.setSaldoDevedor(0.0);
            emprestimo.setStatus(StatusEmprestimo.QUITADO);
        }

        contaRepository.save(conta);

        transacaoService.registrar(
            conta,
            TipoTransacao.PAGAMENTO_PARCELA_EMPRESTIMO,
            valorPagamento,
            "Pagamento de parcela do emprestimo " + emprestimo.getId(),
            "Emprestimos"
        );

        return emprestimoRepository.save(emprestimo);
    }
}
