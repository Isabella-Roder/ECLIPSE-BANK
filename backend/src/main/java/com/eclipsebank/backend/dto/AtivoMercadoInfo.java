package com.eclipsebank.backend.dto;

public class AtivoMercadoInfo {
    
    private String ticker;
    private String nome;
    private String tipo;
    private Double precoAtual;
    private Double variacaoDia;
    private Double dividendYield;

    public AtivoMercadoInfo(String ticker, String nome, String tipo, Double precoAtual, Double variacaoDia, Double dividendYield) {
        this.ticker = ticker;
        this.nome = nome;
        this.tipo = tipo;
        this.precoAtual = precoAtual;
        this.variacaoDia = variacaoDia;
        this.dividendYield = dividendYield;
    }

    public String getTicker() {
        return ticker;
    }

    public String getNome() {
        return nome;
    }

    public String getTipo() {
        return tipo;
    }

    public Double getPrecoAtual() {
        return precoAtual;
    }

    public Double getVariacaoDia() {
        return variacaoDia;
    }

    public Double getDividendYield() {
        return dividendYield;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setPrecoAtual(Double precoAtual) {
        this.precoAtual = precoAtual;
    }

    public void setVariacaoDia(Double variacaoDia) {
        this.variacaoDia = variacaoDia;
    }

    public void setDividendYield(Double dividendYield) {
        this.dividendYield = dividendYield;
    }

}
