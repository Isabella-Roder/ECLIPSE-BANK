package com.eclipsebank.backend.model;

import java.time.LocalDate;

public class Transacao {
    
    //variaveis
    private String descricao;
    private double valor;
    private TipoTransacao tipo; //tipoTransacao, vem da classe do arquivo TipoTransacao
    private String categoria;
    private LocalDate data;

    public Transacao() {

    }

    public Transacao(String descricao, double valor, TipoTransacao tipo, String categoria, LocalDate data) {
        this.descricao = descricao;
        this.valor = valor;
        this.tipo = tipo;
        this.categoria = categoria;
        this.data = data;
    }

    public String getDescricao() {
        return descricao;
    }

    public double getValor() {
        return valor;
    }

    public TipoTransacao getTipo() {
        return tipo;
    }

    public String getCategoria() {
        return categoria;
    }

    public LocalDate getData() {
        return data;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public void setTipo(TipoTransacao tipo) {
        this.tipo = tipo;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}
