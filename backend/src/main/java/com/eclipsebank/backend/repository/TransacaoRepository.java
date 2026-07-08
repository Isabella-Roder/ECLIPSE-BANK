package com.eclipsebank.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.enums.TipoTransacao;
import com.eclipsebank.backend.model.Transacao;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    
    List<Transacao> findByTipo(TipoTransacao tipo);

    List<Transacao> findByCategoriaIgnoreCase(String categoria);

    List<Transacao> findByContaId(Long contaId);

    List<Transacao> findByContaIdAndTipo(Long contaId, TipoTransacao tipo);

    List<Transacao> findByContaIdAndCategoriaIgnoreCase(Long contaId, String categoria);

    List<Transacao> findByContaIdAndDataHoraBetween(Long contaId, LocalDateTime inicio, LocalDateTime fim);
}
