package com.eclipsebank.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.Comprovante;

public interface ComprovanteRepository extends JpaRepository<Comprovante, Long> {

    List<Comprovante> findByContaOrigemId(Long contaId);
} 