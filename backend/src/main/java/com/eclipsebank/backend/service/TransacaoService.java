package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.TipoTransacao;
import com.eclipsebank.backend.model.Transacao;
import com.eclipsebank.backend.repository.TransacaoRepository;
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

    public Transacao cadastrar(Transacao transacao) {
        if (transacao.getValor() <= 0) {
            //para a operação
            throw new IllegalArgumentException("O valor da transação deve ser maior que zero.");
        }

        if (ehSaida(transacao.getTipo()) && transacao.getValor() > calcularSaldo()) {
            throw new IllegalArgumentException("Saldo insuficiente para realizar a transação.");
        }

        return transacaoRepository.save(transacao);
    }

    public double calcularEntradas() {
        return listar().stream().filter(transacao -> transacao.getTipo() == TipoTransacao.RECEITA || transacao.getTipo() == TipoTransacao.DEPOSITO).mapToDouble(
            Transacao::getValor).sum();
    }

    public double calcularSaidas() {
        return listar().stream().filter(transacao -> transacao.getTipo() == TipoTransacao.DESPESA
            || transacao.getTipo() == TipoTransacao.SAQUE
            || transacao.getTipo() == TipoTransacao.PAGAMENTO
            || transacao.getTipo() == TipoTransacao.TRANSFERENCIA).mapToDouble(Transacao::getValor).sum();
    }

    public double calcularSaldo() {
        return calcularEntradas() - calcularSaidas();
    }

    private boolean ehSaida(TipoTransacao tipo) {
        return tipo == TipoTransacao.DESPESA
            || tipo == TipoTransacao.SAQUE
            || tipo == TipoTransacao.PAGAMENTO
            || tipo == TipoTransacao.TRANSFERENCIA;
    }

}
