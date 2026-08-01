package com.eclipsebank.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eclipsebank.backend.model.ContaInternacional;
import com.eclipsebank.backend.enums.Moeda;


public interface ContaInternacionalRepository extends JpaRepository<ContaInternacional, Long> {
    
    List<ContaInternacional> findByUsuarioId(Long usuarioId);

    List<ContaInternacional> findByMoeda(Moeda moeda);

    Optional<ContaInternacional> findByUsuarioIdAndMoeda(Long usuarioId, Moeda moeda);

    boolean existsByUsuarioIdAndMoeda(Long usuarioId, Moeda moeda);

}
