package com.eclipsebank.backend.dto;

public class TransferenciaRequest {
    private Long contaOrigemId;
    private Long contaDestinoId;
    private Double valor;

    public TransferenciaRequest(Long contaOrigemId, Long contaDestinoId, Double valor) {
        this.contaOrigemId = contaOrigemId;
        this.contaDestinoId = contaDestinoId;
        this.valor = valor;
    }

    public TransferenciaRequest() {
        
    }

    public Long getContaOrigemId() {
        return contaOrigemId;
    }

    public Long getContaDestinoId() {
        return contaDestinoId;
    }

    public Double getValor() {
        return valor;
    }

    public void setContaOrigemId(Long contaOrigemId) {
        this.contaOrigemId = contaOrigemId;
    }

    public void setContaDestinoId(Long contaDestinoId) {
        this.contaDestinoId = contaDestinoId;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }
}
