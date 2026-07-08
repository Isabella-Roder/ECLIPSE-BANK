package com.eclipsebank.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Cartao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private String nomeImpresso;
    private Double limiteTotal;
    private Double limiteDisponivel;
    private String status;
    private LocalDate dataValidade;

    @OneToOne
    @JoinColumn(name = "conta_id")
    private Conta conta;

    public Cartao() {

    }

    public Cartao(String numero, String nomeImpresso, Double limiteTotal, Double limiteDisponivel, String status, LocalDate dataValidade) {
        this.numero = numero;
        this.nomeImpresso = nomeImpresso;
        this.limiteTotal = limiteTotal;
        this.limiteDisponivel = limiteDisponivel;
        this.status = status;
        this.dataValidade = dataValidade;
    }

    public Long getId() {
        return id;
    }

    public String getNumero() {
        return numero;
    }

    public String getNomeImpresso() {
        return nomeImpresso;
    }

    public Double getLimiteTotal() {
        return limiteTotal;
    }

    public Double getLimiteDisponivel() {
        return limiteDisponivel;
    }

    public String getStatus() {
        return status;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public Conta getConta() {
        return conta;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public void setNomeImpresso(String nomeImpresso) {
        this.nomeImpresso = nomeImpresso;
    }

    public void setLimiteTotal(Double limiteTotal) {
        this.limiteTotal = limiteTotal;
    }

    public void setLimiteDisponivel(Double limiteDisponivel) {
        this.limiteDisponivel = limiteDisponivel;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }

}
