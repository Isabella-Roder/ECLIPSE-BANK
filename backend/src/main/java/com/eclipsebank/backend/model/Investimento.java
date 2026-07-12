package com.eclipsebank.backend.model;

import java.time.LocalDateTime;

import com.eclipsebank.backend.enums.PerfilInvestidor;
import com.eclipsebank.backend.enums.ProdutoInvestimento;
import com.eclipsebank.backend.enums.StatusInvestimento;
import com.eclipsebank.backend.enums.TipoInvestimento;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Investimento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ProdutoInvestimento produto;
    @Enumerated(EnumType.STRING)
    private TipoInvestimento tipo;
    @Enumerated(EnumType.STRING)
    private PerfilInvestidor perfilInvestidor;
    @Enumerated(EnumType.STRING)
    private StatusInvestimento status;

    private Double valorAplicado;
    private Double rendimentoEstimado;
    private LocalDateTime dataAplicacao;

    @ManyToOne
    private Conta conta;

    public Investimento() {

    }

    public Investimento(ProdutoInvestimento produto, TipoInvestimento tipo,  PerfilInvestidor perfilInvestidor, StatusInvestimento status, Double valorAplicado, Double rendimentoEstimado, LocalDateTime dataAplicacao) {
        this.produto = produto;
        this.tipo = tipo;
        this.perfilInvestidor = perfilInvestidor;
        this.status = status;
        this.valorAplicado = valorAplicado;
        this.rendimentoEstimado = rendimentoEstimado;
        this.dataAplicacao = dataAplicacao;
    }

    public Long getId() {
        return id;
    }

    public ProdutoInvestimento getProduto() {
        return produto;
    }

    public TipoInvestimento getTipo() {
        return tipo;
    }

    public PerfilInvestidor getPerfilInvestidor() {
        return perfilInvestidor;
    }

    public StatusInvestimento getStatus() {
        return status;
    }

    public Double getValorAplicado() {
        return valorAplicado;
    }

    public Double getRendimentoEstimado() {
        return rendimentoEstimado;
    }

    public LocalDateTime getDataAplicacao() {
        return dataAplicacao;
    }

    public Conta getConta() {
        return conta;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProduto(ProdutoInvestimento produto) {
        this.produto = produto;
    }

    public void setTipo(TipoInvestimento tipo) {
        this.tipo = tipo;
    }

    public void setPerfilInvestidor(PerfilInvestidor perfilInvestidor) {
        this.perfilInvestidor = perfilInvestidor;
    }

    public void setStatus(StatusInvestimento status) {
        this.status = status;
    }

    public void setValorAplicado(Double valorAplicado) {
        this.valorAplicado = valorAplicado;
    }

    public void setRendimentoEstimado(Double rendimentoEstimado) {
        this.rendimentoEstimado = rendimentoEstimado;
    }

    public void setDataAplicacao(LocalDateTime dataAplicacao) {
        this.dataAplicacao = dataAplicacao;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }

}
