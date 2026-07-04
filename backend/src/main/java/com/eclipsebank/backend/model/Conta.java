package com.eclipsebank.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import com.eclipsebank.backend.enums.TipoChavePix;

import jakarta.persistence.EnumType;

@Entity
public class Conta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titular;
    private Integer numero;
    private String chavePix;
    private Double limite;
    private Double saldo;

    @Enumerated(EnumType.STRING)
    private TipoChavePix tipoChavePix;

    @OneToOne // uma conta pertence ao usuario
    @JoinColumn(name = "usuario_id") // cria uma coluna usuario_id na tabela conta
    private Usuario usuario;

    public Usuario getUsuario() {
        return usuario;
    }

    public Conta() {

    }

    public Conta(String titular, Integer numero, String chavePix, Double limite, Double saldo, TipoChavePix tipoChavePix) {
        this.titular = titular;
        this.numero = numero;
        this.chavePix = chavePix;
        this.limite = limite;
        this.saldo = saldo;
        this.tipoChavePix = tipoChavePix;
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

    public Double getSaldo() {
        return saldo;
    }

    public TipoChavePix getTipoChavePix() {
        return tipoChavePix;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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

    public void setSaldo(Double saldo){
        this.saldo = saldo; 
    }

    public void setTipoChavePix(TipoChavePix tipoChavePix) {
        this.tipoChavePix = tipoChavePix;
    }

}
