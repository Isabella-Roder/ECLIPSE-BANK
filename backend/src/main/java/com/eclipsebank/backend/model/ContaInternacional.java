package com.eclipsebank.backend.model;

import com.eclipsebank.backend.enums.Moeda;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ContaInternacional {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Moeda moeda;

    private Double saldo;
    private String numero;
    private String status;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public ContaInternacional() {

    }

    public ContaInternacional(Moeda moeda, Double saldo, String numero, String status, Usuario usuario) {
        this.moeda = moeda;
        this.saldo = saldo;
        this.numero = numero;
        this.status = status;
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public Moeda getMoeda() {
        return moeda;
    }

    public Double getSaldo() {
        return saldo;
    }

    public String getNumero() {
        return numero;
    }

    public String getStatus() {
        return status;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMoeda(Moeda moeda) {
        this.moeda = moeda;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

}
