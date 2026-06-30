package com.eclipsebank.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.TipoTransacao;
import com.eclipsebank.backend.model.Transacao;
//guarda as regras
@Service
public class TransacaoService {
    
    private List<Transacao> transacoes = new ArrayList<>();

    public TransacaoService() {
    transacoes.add(new Transacao("Salário", 3200.00, TipoTransacao.RECEITA, "Trabalho", LocalDate.now()));
    transacoes.add(new Transacao("Mercado", 180.50, TipoTransacao.DESPESA, "Alimentação", LocalDate.now()));
    transacoes.add(new Transacao("Transporte", 75.00, TipoTransacao.DESPESA, "Transporte", LocalDate.now()));
    }

    public List<Transacao> listar() {
        return transacoes;
    }

    public List<Transacao> listarPorTipo(TipoTransacao tipo) {
        return transacoes.stream().filter(transacao -> transacao.getTipo() == tipo).toList();
    }

    public List<Transacao> listarPorCategoria(String categoria) {
        return transacoes.stream().filter(transacao -> transacao.getCategoria().equalsIgnoreCase(categoria)).toList();
    }

    public Transacao cadastrar(Transacao transacao) {
        if (transacao.getValor() <= 0) {
            //para a operação
            throw new IllegalArgumentException("O valor da transação deve ser maior que zero.");
        }

        if (ehSaida(transacao.getTipo()) && transacao.getValor() > calcularSaldo()) {
            throw new IllegalArgumentException("Saldo insuficiente para realizar a transação.");
        }

        transacoes.add(transacao);
        return transacao;
    }

    public double calcularEntradas() {
        return transacoes.stream().filter(transacao -> transacao.getTipo() == TipoTransacao.RECEITA || transacao.getTipo() == TipoTransacao.DEPOSITO).mapToDouble(
            Transacao::getValor).sum();
    }

    public double calcularSaidas() {
        return transacoes.stream().filter(transacao -> transacao.getTipo() == TipoTransacao.DESPESA
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
