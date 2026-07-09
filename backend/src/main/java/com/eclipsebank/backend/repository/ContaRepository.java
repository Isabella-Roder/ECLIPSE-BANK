package com.eclipsebank.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.Conta;

public interface ContaRepository extends JpaRepository<Conta, Long> {
    boolean existsByUsuarioId(Long usuarioId);
    boolean existsByEmpresaId(Long empresaId);
    boolean existsByNumero(Integer numero);
    boolean existsByChavePix(String chavePix);

    Optional<Conta> findByUsuarioId(Long usuarioId);
    Optional<Conta> findByEmpresaId(Long empresaId);
    Optional<Conta> findByNumero(Integer numero);
    Optional<Conta> findByChavePix(String chavePix);

}
