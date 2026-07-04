package com.eclipsebank.backend.model;

import java.time.LocalDateTime;

import com.eclipsebank.backend.enums.MetodoPagamento;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private MetodoPagamento metodo;
    private Double valor;
    private String destino;
    private LocalDateTime dataHora;
    private String status;
    @ManyToOne
    @JoinColumn(name= "conta_id")
    private Conta conta;
    private String codigoAutenticacao;

    public Pagamento() {

    }

    public Pagamento(MetodoPagamento metodo, Double valor, String destino, LocalDateTime dataHora, String status, Conta conta, String codigoAutenticacao) {
        this.metodo = metodo;
        this.valor = valor;
        this.destino = destino;
        this.dataHora = dataHora;
        this.status = status;
        this.conta = conta;
        this.codigoAutenticacao = codigoAutenticacao;
    }

    public Long getId() {
        return id;
    }

    public MetodoPagamento getMetodo() {
        return metodo;
    }

    public Double getValor() {
        return valor;
    }

    public String getDestino() {
        return destino;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public String getStatus() {
        return status;
    }

    public Conta getConta() {
        return conta;
    }

    public String getCodigoAutenticacao() {
        return codigoAutenticacao;
    }

    public void setMetodo(MetodoPagamento metodo) {
        this.metodo = metodo;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }

    public void setCodigoAutenticacao(String codigoAutenticacao) {
        this.codigoAutenticacao = codigoAutenticacao;
    }
}
