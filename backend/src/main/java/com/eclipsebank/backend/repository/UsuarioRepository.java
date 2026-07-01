package com.eclipsebank.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
    
}
