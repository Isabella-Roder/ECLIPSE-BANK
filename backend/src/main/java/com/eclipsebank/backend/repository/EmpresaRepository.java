package com.eclipsebank.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    
    boolean existsByCnpj(String cnpj);
    boolean existsByEmail(String email);

    Optional<Empresa> findByEmail(String email);

}
