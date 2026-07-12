package com.eclipsebank.backend.dto;

public class IndicadoresFinanceiros {
    
    private Double selic;
    private Double ipca;
    private Double cdi;

    public IndicadoresFinanceiros() {

    }

    public IndicadoresFinanceiros(Double selic, Double ipca, Double cdi) {
        this.selic = selic;
        this.ipca = ipca;
        this.cdi = cdi;
    }

    public Double getSelic() {
        return selic;
    }

    public Double getIpca() {
        return ipca;
    }

    public Double getCdi() {
        return cdi;
    }

    public void setSelic(Double selic) {
        this.selic = selic;
    }

    public void setIpca(Double ipca) {
        this.ipca = ipca;
    }

    public void setCdi(Double cdi) {
        this.cdi = cdi;
    }

}
