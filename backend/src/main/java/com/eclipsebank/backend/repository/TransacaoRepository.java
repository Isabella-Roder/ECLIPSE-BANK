package com.eclipsebank.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.TipoTransacao;
import com.eclipsebank.backend.model.Transacao;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    
    List<Transacao> findByTipo(TipoTransacao tipo);

    List<Transacao> findByCategoriaIgnoreCase(String categoria);

}
