package com.eclipsebank.backend.dto;

import com.eclipsebank.backend.enums.Moeda;

public class CambioRequest {
    
    private Moeda moeda;
    private Double valor;

    public Moeda getMoeda() {
        return moeda;
    }

    public Double getValor() {
        return valor;
    }

    public void setMoeda(Moeda moeda) {
        this.moeda = moeda;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    } 

}
