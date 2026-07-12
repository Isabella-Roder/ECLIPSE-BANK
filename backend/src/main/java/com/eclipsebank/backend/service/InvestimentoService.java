package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.Investimento;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.repository.InvestimentoRepository;
import com.eclipsebank.backend.dto.ProdutoInvestimentoInfo;
import com.eclipsebank.backend.enums.StatusInvestimento;
import com.eclipsebank.backend.model.Conta;

@Service
public class InvestimentoService {
    
    private InvestimentoRepository investimentoRepository;
    private ContaRepository contaRepository;
    private ProdutoInvestimentoService produtoInvestimentoService;

    public InvestimentoService(InvestimentoRepository investimentoRepository, ContaRepository contaRepository, ProdutoInvestimentoService produtoInvestimentoService) {
        this.investimentoRepository = investimentoRepository;
        this.contaRepository = contaRepository;
        this.produtoInvestimentoService = produtoInvestimentoService;
    }

    public List<Investimento> listar() {
        return investimentoRepository.findAll();
    }

    public List<Investimento> listarPorConta(Long contaId) {
        return investimentoRepository.findByContaId(contaId);
    }

    private Double calcularRendimentoEstimado(Investimento investimento) {
        if (investimento.getValorAplicado() == null || investimento.getProduto() == null) {
            return 0.0;
        }

        ProdutoInvestimentoInfo produtoInfo = produtoInvestimentoService.listar()
            .stream().filter(produto -> produto.getProduto() == investimento.getProduto())
            .findFirst().orElseThrow(() -> new IllegalArgumentException("Produto de investimento não encontrado."));

        int prazoMeses = investimento.getPrazoMeses() == null ? 12 : investimento.getPrazoMeses();

        double taxaAnual = produtoInfo.getTaxaAnual() == null ? 0.0 : produtoInfo.getTaxaAnual();
        double taxaPeriodo = taxaAnual * (prazoMeses / 12.0);

        return investimento.getValorAplicado() * taxaPeriodo;
    }

    public Investimento aplicar(Long contaId, Investimento investimento) {
        Conta conta = contaRepository.findById(contaId).orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));

        if (investimento.getValorAplicado() == null || investimento.getValorAplicado() <= 0) {
            throw new IllegalArgumentException("Valor aplicado deve ser maior que zero.");
        }

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        if (conta.getSaldo() < investimento.getValorAplicado()) {
            throw new IllegalArgumentException("Saldo insuficiente para investir.");
        }

        if (investimento.getProduto() == null) {
            throw new IllegalArgumentException("Produto do investimento obrigatorio.");
        }

        if (investimento.getTipo() == null) {
            throw new IllegalArgumentException("Tipo do investimento obrigatorio.");
        }

        if (investimento.getPerfilInvestidor() == null) {
            throw new IllegalArgumentException("Perfil do investidor obrigatorio.");
        }

        if (investimento.getPrazoMeses() == null || investimento.getPrazoMeses() <= 0) {
            investimento.setPrazoMeses(12);
        }

        conta.setSaldo(conta.getSaldo() - investimento.getValorAplicado());
        
        investimento.setRendimentoEstimado(calcularRendimentoEstimado(investimento));
        investimento.setDataAplicacao(LocalDateTime.now());
        investimento.setStatus(StatusInvestimento.ATIVO);
        investimento.setConta(conta);

        contaRepository.save(conta);
        return investimentoRepository.save(investimento);
    }

    public Investimento resgatar(Long investimentoId) {
        Investimento investimento = investimentoRepository.findById(investimentoId).orElseThrow(() -> new IllegalArgumentException("Investimento não encontrado."));

        if (investimento.getStatus() == StatusInvestimento.RESGATADO) {
            throw new IllegalArgumentException("Investimento ja foi resgatado.");
        }

        Conta conta = investimento.getConta();

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        Double valorResgate = investimento.getValorAplicado() + investimento.getRendimentoEstimado();

        conta.setSaldo(conta.getSaldo() + valorResgate);
        investimento.setStatus(StatusInvestimento.RESGATADO);

        contaRepository.save(conta);
        return investimentoRepository.save(investimento);
    }

}
