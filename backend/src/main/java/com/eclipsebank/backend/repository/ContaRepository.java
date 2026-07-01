package com.eclipsebank.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.Conta;

public interface ContaRepository extends JpaRepository<Conta, Long> {
    boolean existsByUsuarioId(Long usuarioId);
    boolean existsByNumero(Integer numero);
    boolean existsByChavePix(String chavePix);

}
