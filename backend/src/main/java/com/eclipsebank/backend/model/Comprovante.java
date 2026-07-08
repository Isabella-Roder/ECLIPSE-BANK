package com.eclipsebank.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;



@Entity
public class Comprovante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String metodo;
    private String pagador;
    private String destino;
    private String labelDestino;
    private double valor;
    private LocalDateTime dataHora;
    private String status;
    private String codigo;

    @ManyToOne
    private Conta contaOrigem;

    public Comprovante() {

    }

    public Comprovante(String metodo, String pagador, String destino, String labelDestino, double valor, LocalDateTime dataHora, String status, String codigo) {
        this.metodo = metodo;
        this.pagador = pagador;
        this.destino = destino;
        this.labelDestino = labelDestino;
        this.valor = valor;
        this.dataHora = dataHora;
        this.status = status;
        this.codigo = codigo;
    }

    public Long getId() {
        return id;
    }

    public String getMetodo() {
        return metodo;
    }

    public String getPagador() {
        return pagador;
    }

    public String getDestino() {
        return destino;
    }

    public String getLabelDestino() {
        return labelDestino;
    }

    public double getValor() {
        return valor;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public String getStatus() {
        return status;
    }

    public String getCodigo() {
        return codigo;
    }

    public Conta getContaOrigem() {
        return contaOrigem;
    }

    public void setMetodo(String metodo) {
        this.metodo = metodo;
    }

    public void setPagador(String pagador) {
        this.pagador = pagador;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public void setLabelDestino(String labelDestino) {
        this.labelDestino = labelDestino;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setContaOrigem(Conta contaOrigem) {
        this.contaOrigem = contaOrigem;
    }
}
