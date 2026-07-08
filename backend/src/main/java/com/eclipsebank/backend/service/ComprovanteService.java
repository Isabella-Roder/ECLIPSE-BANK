package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.Comprovante;
import com.eclipsebank.backend.repository.ComprovanteRepository;

@Service
public class ComprovanteService {
    
    private ComprovanteRepository comprovanteRepository;

    public ComprovanteService(ComprovanteRepository comprovanteRepository) {
        this.comprovanteRepository = comprovanteRepository;
    }

    public List<Comprovante> listar() {
        return comprovanteRepository.findAll();
    }

    public List<Comprovante> listarPorConta(Long contaId) {
        return comprovanteRepository.findByContaOrigemId(contaId);
    }

    public Comprovante buscarPorId(Long id) {
        return comprovanteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Comprovante não encontrado."));
    }

    public Comprovante salvar(Comprovante comprovante) {
        return comprovanteRepository.save(comprovante);
    }

}
