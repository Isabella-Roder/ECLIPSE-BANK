package com.eclipsebank.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.eclipsebank.backend.enums.StatusMeta;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class MetaFinanceira {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private Double valorAlvo;
    private Double valorAtual;
    private LocalDate dataLimite;
    private LocalDateTime dataCriacao;

    @Enumerated(EnumType.STRING)
    private StatusMeta status;

    @ManyToOne
    private Conta conta;

    public MetaFinanceira() {

    }

    public MetaFinanceira(
        String nome,
        String descricao,
        Double valorAlvo,
        Double valorAtual,
        LocalDate dataLimite,
        LocalDateTime dataCriacao,
        Conta conta
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.valorAlvo = valorAlvo;
        this.valorAtual = valorAtual;
        this.dataLimite = dataLimite;
        this.dataCriacao = dataCriacao;
        this.conta = conta;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Double getValorAlvo() {
        return valorAlvo;
    }

    public Double getValorAtual() {
        return valorAtual;
    }

    public LocalDate getDataLimite() {
        return dataLimite;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public Conta getConta() {
        return conta;
    }

    public StatusMeta getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setValorAlvo(Double valorAlvo) {
        this.valorAlvo = valorAlvo;
    }

    public void setValorAtual(Double valorAtual) {
        this.valorAtual = valorAtual;
    }

    public void setDataLimite(LocalDate dataLimite) {
        this.dataLimite = dataLimite;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }

    public void setStatus(StatusMeta status) {
        this.status = status;
    }

}
