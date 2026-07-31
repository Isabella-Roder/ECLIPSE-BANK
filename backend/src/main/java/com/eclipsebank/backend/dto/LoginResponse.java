package com.eclipsebank.backend.dto;

import com.eclipsebank.backend.enums.PerfilTipo;

public class LoginResponse {
    
    private Long id;
    private String nome;
    private String email;
    private PerfilTipo tipo;

    public LoginResponse() {
        
    }

    public LoginResponse(Long id, String nome, String email, PerfilTipo tipo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.tipo = tipo;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public PerfilTipo getTipo() {
        return tipo;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTipo(PerfilTipo tipo) {
        this.tipo = tipo;
    }

}
