package com.eclipsebank.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CategoriaFinanceira {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String tipo;
    private String cor;
    private String icone;
    private Boolean ativa;

    public CategoriaFinanceira() {

    }

    public CategoriaFinanceira(String nome, String tipo, String cor, String icone, Boolean ativa) {
        this.nome = nome;
        this.tipo = tipo;
        this.cor = cor;
        this.icone = icone;
        this.ativa = ativa;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getTipo() {
        return tipo;
    }

    public String getCor() {
        return cor;
    }

    public String getIcone() {
        return icone;
    }

    public Boolean getAtiva() {
        return ativa;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public void setIcone(String icone) {
        this.icone = icone;
    }

    public void setAtiva(Boolean ativa) {
        this.ativa = ativa;
    }

}
