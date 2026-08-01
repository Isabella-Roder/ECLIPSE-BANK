package com.eclipsebank.backend.model;

import java.time.LocalDateTime;

import com.eclipsebank.backend.enums.StatusEmprestimo;
import com.eclipsebank.backend.enums.TipoEmprestimo;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Emprestimo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TipoEmprestimo tipo;

    private Double valorSolicitado;
    private Double taxaJurosMensal;
    private Integer quantidadeParcelas;
    private Double valorParcela;
    private Double valorTotal;
    private Double parcelasPagas;
    private Double saldoDevedor;
    
    @Enumerated(EnumType.STRING)
    private StatusEmprestimo status;

    private LocalDateTime dataSolicitacao;

    @ManyToOne
    @JoinColumn(name = "conta_id")
    private Conta conta;

    public Emprestimo() {

    }

    public Emprestimo(
        TipoEmprestimo tipo,
        Double valorSolicitado,
        Double taxaJurosMensal,
        Integer quantidadeParcelas,
        Double valorParcela,
        Double valorTotal,
        Double parcelasPagas,
        Double saldoDevedor,
        StatusEmprestimo status,
        LocalDateTime dataSolicitacao,
        Conta conta
    ) {
        this.tipo = tipo;
        this.valorSolicitado = valorSolicitado;
        this.taxaJurosMensal = taxaJurosMensal;
        this.quantidadeParcelas = quantidadeParcelas;
        this.valorParcela = valorParcela;
        this.valorTotal = valorTotal;
        this.parcelasPagas = parcelasPagas;
        this.saldoDevedor = saldoDevedor;
        this.status = status;
        this.dataSolicitacao = dataSolicitacao;
        this.conta = conta;
    }

    public Long getId() {
        return id;
    }

    public TipoEmprestimo getTipo() {
        return tipo;
    }

    public Double getValorSolicitado() {
        return valorSolicitado;
    }

    public Double getTaxaJurosMensal() {
        return taxaJurosMensal;
    }

    public Integer getQuantidadeParcelas() {
        return quantidadeParcelas;
    }

    public Double getValorParcela() {
        return valorParcela;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public Double getParcelasPagas() {
        return parcelasPagas;
    }

    public Double getSaldoDevedor() {
        return saldoDevedor;
    }

    public StatusEmprestimo getStatus() {
        return status;
    }

    public LocalDateTime getDataSolicitacao() {
        return dataSolicitacao;
    }

    public Conta getConta() {
        return conta;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTipo(TipoEmprestimo tipo) {
        this.tipo = tipo;
    }

    public void setValorSolicitado(Double valorSolicitado) {
        this.valorSolicitado = valorSolicitado;
    }

    public void setTaxaJurosMensal(Double taxaJurosMensal) {
        this.taxaJurosMensal = taxaJurosMensal;
    }

    public void setQuantidadeParcelas(Integer quantidadeParcelas) {
        this.quantidadeParcelas = quantidadeParcelas;
    }

    public void setValorParcela(Double valorParcela) {
        this.valorParcela = valorParcela;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public void setParcelasPagas(Double parcelasPagas) {
        this.parcelasPagas = parcelasPagas;
    }

    public void setSaldoDevedor(Double saldoDevedor) {
        this.saldoDevedor = saldoDevedor;
    }

    public void setStatus(StatusEmprestimo status) {
        this.status = status;
    }

    public void setDataSolicitacao(LocalDateTime dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }

}
