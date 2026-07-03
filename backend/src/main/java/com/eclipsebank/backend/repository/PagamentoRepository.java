package com.eclipsebank.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long>{
    List<Pagamento> findByContaId(Long contaId);
}
