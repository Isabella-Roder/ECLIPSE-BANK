package com.eclipsebank.backend.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class AtivoCarteira {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticker;
    private String nome;
    private String tipo;
    private Integer quantidade;
    private Double precoMedio;
    private Double valorTotal;
    private LocalDateTime dataCompra;

    @JsonIgnoreProperties({"usuario", "empresa", "transacoes"})
    @ManyToOne
    private Conta conta;

    public AtivoCarteira() {

    }

    public AtivoCarteira(
        String ticker,
        String nome,
        String tipo,
        Integer quantidade,
        Double precoMedio,
        Double valorTotal,
        LocalDateTime dataCompra,
        Conta conta
    ) {
        this.ticker = ticker;
        this.nome = nome;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.precoMedio = precoMedio;
        this.valorTotal = valorTotal;
        this.dataCompra = dataCompra;
        this.conta = conta;
    }

    public Long getId() {
        return id;
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

    public Integer getQuantidade() {
        return quantidade;
    }

    public Double getPrecoMedio() {
        return precoMedio;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public LocalDateTime getDataCompra() {
        return dataCompra;
    }

    public Conta getConta() {
        return conta;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public void setPrecoMedio(Double precoMedio) {
        this.precoMedio = precoMedio;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public void setDataCompra(LocalDateTime dataCompra) {
        this.dataCompra = dataCompra;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }
}
