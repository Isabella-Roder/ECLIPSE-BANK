package com.eclipsebank.backend.dto;

import com.eclipsebank.backend.enums.MetodoPagamento;

public class PagamentoRequest {
    private Long contaOrigem;
    private String destino;
    private Double valor;
    private MetodoPagamento metodo;

    public PagamentoRequest() {

    }

    public PagamentoRequest(Long contaOrigem, String destino, Double valor, MetodoPagamento metodo) {
        this.contaOrigem = contaOrigem;
        this.destino = destino;
        this.valor = valor;
        this.metodo = metodo;
    }

    public Long getContaOrigem() {
        return contaOrigem;
    }

    public String getDestino() {
        return destino;
    }

    public Double getValor() {
        return valor;
    }

    public MetodoPagamento getMetodo() {
        return metodo;
    }

    public void setContaOrigem(Long contaOrigem) {
        this.contaOrigem = contaOrigem;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public void setMetodo(MetodoPagamento metodo) {
        this.metodo = metodo;
    }
}
