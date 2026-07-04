package com.eclipsebank.backend.model;

import java.time.LocalDateTime;

import com.eclipsebank.backend.enums.TipoTransacao;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

// classe vira uma tabela do banco
@Entity
public class Transacao {
    
    @Id//chave principal
    @GeneratedValue(strategy = GenerationType.IDENTITY)//gera o id
    private Long id;
    
    //variaveis
    private String descricao;
    private double valor;

    //salva enum como texto
    @Enumerated(EnumType.STRING)
    private TipoTransacao tipo; //tipoTransacao, vem da classe do arquivo TipoTransacao
    private String categoria;
    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "conta_id")
    private Conta conta;

    public Transacao() {

    }

    public Transacao(String descricao, double valor, TipoTransacao tipo, String categoria, LocalDateTime dataHora) {
        this.descricao = descricao;
        this.valor = valor;
        this.tipo = tipo;
        this.categoria = categoria;
        this.dataHora = dataHora;
    }

    public Long getId() {
        return id;
    }

    public Conta getConta() {
        return conta;
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

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
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

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
}
