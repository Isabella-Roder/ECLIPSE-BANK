package com.eclipsebank.backend.dto;

public class TransferenciaPorNumeroRequest {
    private Long contaOrigem;
    private Integer contaNumeroDestino;
    private Double valor;

    public TransferenciaPorNumeroRequest() {

    }

    public TransferenciaPorNumeroRequest(Long contaOrigem, Integer contaNumeroDestino, Double valor) {
        this.contaOrigem = contaOrigem;
        this.contaNumeroDestino = contaNumeroDestino;
        this.valor = valor;
    }

    public Long getContaOrigem() {
        return contaOrigem;
    }

    public Integer getContaNumeroDestino() {
        return contaNumeroDestino;
    }

    public Double getValor() {
        return valor;
    }

    public void setContaOrigem(Long contaOrigem) {
        this.contaOrigem = contaOrigem;
    }

    public void setContaNumeroDestino(Integer contaNumeroDestino) {
        this.contaNumeroDestino = contaNumeroDestino;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }
}
