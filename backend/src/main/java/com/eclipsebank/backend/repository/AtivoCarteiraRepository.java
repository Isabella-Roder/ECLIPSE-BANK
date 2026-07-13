package com.eclipsebank.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.AtivoCarteira;

public interface AtivoCarteiraRepository extends JpaRepository<AtivoCarteira, Long> {
    
    List<AtivoCarteira> findByContaId(Long contaId);
}
