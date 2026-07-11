package com.eclipsebank.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.Investimento;

public interface InvestimentoRepository extends JpaRepository<Investimento, Long> {
    List<Investimento> findByContaId(Long contaId);
}
