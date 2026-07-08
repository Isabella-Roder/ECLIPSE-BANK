package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.model.Comprovante;
import com.eclipsebank.backend.service.ComprovanteService;

@RestController
public class ComprovanteController {
    
    private ComprovanteService comprovanteService;

    public ComprovanteController(ComprovanteService comprovanteService) {
        this.comprovanteService = comprovanteService;
    }

    @GetMapping("/comprovantes")
    public List<Comprovante> listar() {
        return comprovanteService.listar();
    }

    @GetMapping("/contas/{contaId}/comprovantes")
    public List<Comprovante> listarPorConta(@PathVariable Long contaId) {
        return comprovanteService.listarPorConta(contaId);
    }

    @GetMapping("/comprovantes/{id}")
    public Comprovante buscarPorId(@PathVariable Long id) {
        return comprovanteService.buscarPorId(id);
    }
}
