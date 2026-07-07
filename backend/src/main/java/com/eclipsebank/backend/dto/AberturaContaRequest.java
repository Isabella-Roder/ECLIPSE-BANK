package com.eclipsebank.backend.dto;

import java.time.LocalDate;

import com.eclipsebank.backend.enums.TipoChavePix;

public class AberturaContaRequest {
    
    private String nome;
    private String nomeSocial;
    private String cpf;
    private String telefone;
    private String email;
    private String senha;
    private LocalDate dataNascimento;

    private String titular;
    private String chavePix;
    private TipoChavePix tipoChavePix;
    private Double limite;

    public AberturaContaRequest() {

    }

    public AberturaContaRequest(
        String nome,
        String nomeSocial,
        String cpf,
        String telefone,
        String email,
        String senha,
        LocalDate dataNascimento,
        String titular,
        String chavePix,
        TipoChavePix tipoChavePix,
        Double limite
    ) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.titular = titular;
        this.chavePix = chavePix;
        this.tipoChavePix = tipoChavePix;
        this.limite = limite;
    }

    public String getNome() {
        return nome;
    }

    public String getNomeSocial() {
        return nomeSocial;
    }

    public String getCpf() {
        return cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public String getTitular() {
        return titular;
    }

    public String getChavePix() {
        return chavePix;
    }

    public TipoChavePix getTipoChavePix() {
        return tipoChavePix;
    }

    public Double getLimite() {
        return limite;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setNomeSocial(String nomeSocial) {
        this.nomeSocial = nomeSocial;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public void setChavePix(String chavePix) {
        this.chavePix = chavePix;
    }

    public void setTipoChavePix(TipoChavePix tipoChavePix) {
        this.tipoChavePix = tipoChavePix;
    }

    public void setLimite(Double limite) {
        this.limite = limite;
    }

}
