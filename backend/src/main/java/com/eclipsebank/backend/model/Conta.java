package com.eclipsebank.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Conta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titular;
    private Integer numero;
    private String chavePix;
    private Double limite;

    public Conta() {

    }

    public Conta(String titular, Integer numero, String chavePix, Double limite) {
        this.titular = titular;
        this.numero = numero;
        this.chavePix = chavePix;
        this.limite = limite;
    }

    public Long getId() {
        return id;
    }

    public String getTitular() {
        return titular;
    }

    public Integer getNumero() {
        return numero;
    }

    public String getChavePix() {
        return chavePix;
    }

    public Double getLimite() {
        return limite;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public void setChavePix(String chavePix) {
        this.chavePix = chavePix;
    }

    public void setLimite(Double limite) {
        this.limite = limite;
    }

}
