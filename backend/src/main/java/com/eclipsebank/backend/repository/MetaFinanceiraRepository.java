package com.eclipsebank.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.MetaFinanceira;

public interface MetaFinanceiraRepository extends JpaRepository<MetaFinanceira, Long> {
    
    List<MetaFinanceira> findByContaId(Long contaId);

}
