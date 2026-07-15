package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.enums.TipoTransacao;
import com.eclipsebank.backend.model.Transacao;
import com.eclipsebank.backend.repository.TransacaoRepository;
import com.eclipsebank.backend.model.Conta;
//guarda as regras
@Service
public class TransacaoService {
    
    private TransacaoRepository transacaoRepository;


    public TransacaoService(TransacaoRepository transacaoRepository) {
        this.transacaoRepository = transacaoRepository;
    }

    public List<Transacao> listar() {
        return transacaoRepository.findAll();
    }

    public List<Transacao> listarPorTipo(TipoTransacao tipo) {
        return transacaoRepository.findByTipo(tipo);
    }

    public List<Transacao> listarPorCategoria(String categoria) {
        return transacaoRepository.findByCategoriaIgnoreCase(categoria);
    }

    public List<Transacao> listarPorConta(Long contaId) {
        return transacaoRepository.findByContaId(contaId);
    }

    public List<Transacao> listarPorContaETipo(Long contaId, TipoTransacao tipo) {
        return transacaoRepository.findByContaIdAndTipo(contaId, tipo);
    }

    public List<Transacao> listarPorContaECategoria(Long contaId, String categoria) {
        return transacaoRepository.findByContaIdAndCategoriaIgnoreCase(contaId, categoria);
    }

    public List<Transacao> listarPorContaEPeriodo(Long contaId, LocalDateTime inicio, LocalDateTime fim) {
        return transacaoRepository.findByContaIdAndDataHoraBetween(contaId, inicio, fim);
    }

    public List<Transacao> filtrarTransacoes(
        Long contaId,
        TipoTransacao tipo,
        String categoria, 
        LocalDateTime inicio,
        LocalDateTime fim) {
            return listarPorConta(contaId).stream().filter(transacao -> tipo == null || transacao.getTipo() == tipo)
                .filter(transacao -> categoria == null || (transacao.getCategoria() != null && transacao.getCategoria().equalsIgnoreCase(categoria)))
                .filter(transacao -> inicio == null || fim == null || (transacao.getDataHora() != null && !transacao.getDataHora().isBefore(inicio) && !transacao.getDataHora().isAfter(fim))).toList();
        }

    public Transacao cadastrar(Transacao transacao) {
        if (transacao.getValor() <= 0) {
            //para a operação
            throw new IllegalArgumentException("O valor da transação deve ser maior que zero.");
        }

        if (ehSaida(transacao.getTipo()) && transacao.getValor() > calcularSaldo()) {
            throw new IllegalArgumentException("Saldo insuficiente para realizar a transação.");
        }

        if (transacao.getDataHora() == null) {
            transacao.setDataHora(LocalDateTime.now());
        }

        return transacaoRepository.save(transacao);
    }

    public Transacao registrar(Conta conta, TipoTransacao tipo, double valor, String descricao, String categoria) {
        Transacao transacao = new Transacao();

        transacao.setConta(conta);
        transacao.setTipo(tipo);
        transacao.setValor(valor);
        transacao.setDescricao(descricao);
        transacao.setCategoria(categoria);
        transacao.setDataHora(LocalDateTime.now());

        return transacaoRepository.save(transacao);
    }

    public double calcularEntradas() {
        return listar().stream().filter(transacao -> transacao.getTipo() == TipoTransacao.RECEITA || transacao.getTipo() == TipoTransacao.DEPOSITO || transacao.getTipo() == TipoTransacao.VENDA_ATIVO || transacao.getTipo() == TipoTransacao.RESGATE_INVESTIMENTO || transacao.getTipo() == TipoTransacao.RESGATE_META).mapToDouble(
            Transacao::getValor).sum();
    }

    public double calcularSaidas() {
        return listar().stream().filter(transacao -> transacao.getTipo() == TipoTransacao.DESPESA
            || transacao.getTipo() == TipoTransacao.SAQUE
            || transacao.getTipo() == TipoTransacao.PAGAMENTO
            || transacao.getTipo() == TipoTransacao.PIX
            || transacao.getTipo() == TipoTransacao.TRANSFERENCIA
            || transacao.getTipo() == TipoTransacao.COMPRA_ATIVO
            || transacao.getTipo() == TipoTransacao.APLICACAO_INVESTIMENTO
            || transacao.getTipo() == TipoTransacao.APORTE_META).mapToDouble(Transacao::getValor).sum();
    }

    public double calcularSaldo() {
        return calcularEntradas() - calcularSaidas();
    }

    private boolean ehSaida(TipoTransacao tipo) {
        return tipo == TipoTransacao.DESPESA
            || tipo == TipoTransacao.SAQUE
            || tipo == TipoTransacao.PAGAMENTO
            || tipo == TipoTransacao.PIX
            || tipo == TipoTransacao.TRANSFERENCIA
            || tipo == TipoTransacao.COMPRA_ATIVO
            || tipo == TipoTransacao.APLICACAO_INVESTIMENTO
            || tipo == TipoTransacao.APORTE_META;
    }

}
