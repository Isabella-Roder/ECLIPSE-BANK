package com.eclipsebank.backend.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.CompraCartao;

public interface CompraCartaoRepository extends JpaRepository<CompraCartao, Long> {
    
    List<CompraCartao> findByCartaoId(Long cartaoId);

    //List<CompraCartao> findByCartaoContaId(Long contaId);


}
