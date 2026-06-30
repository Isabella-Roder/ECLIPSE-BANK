package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.repository.ContaRepository;

@Service
public class ContaService {
    
    private ContaRepository contaRepository;

    public ContaService (ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    public List<Conta> listar() {
        return contaRepository.findAll();
    }

    public Conta cadastrar(Conta conta) {
        return contaRepository.save(conta);
    }

}
