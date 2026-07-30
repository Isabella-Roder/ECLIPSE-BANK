package com.eclipsebank.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.CategoriaFinanceira;

public interface CategoriaFinanceiraRepository extends JpaRepository<CategoriaFinanceira, Long> {
    
    List<CategoriaFinanceira> findByAtivaTrue();

    List<CategoriaFinanceira> findByTipo(String tipo);

}
