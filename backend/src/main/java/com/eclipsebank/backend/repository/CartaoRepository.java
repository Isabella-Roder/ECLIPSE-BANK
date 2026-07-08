package com.eclipsebank.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.Cartao;

public interface CartaoRepository extends JpaRepository<Cartao, Long> {
    
    Optional<Cartao> findByContaId(Long contaId);

    boolean existsByContaId(Long contaId);

    boolean existsByNumero(String numero);

}
