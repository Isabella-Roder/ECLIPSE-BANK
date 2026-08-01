package com.eclipsebank.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.Emprestimo;
import com.eclipsebank.backend.enums.TipoEmprestimo;
import com.eclipsebank.backend.enums.StatusEmprestimo;



public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    
    List<Emprestimo> findByContaId(Long contaId);

    List<Emprestimo> findByTipo(TipoEmprestimo tipo);

    List<Emprestimo> findByStatus(StatusEmprestimo status);

    boolean existsByIdAndContaId(Long id, Long contaId);

}
