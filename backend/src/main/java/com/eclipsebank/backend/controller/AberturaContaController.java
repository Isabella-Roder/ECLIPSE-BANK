package com.eclipsebank.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.service.AberturaContaService;
import com.eclipsebank.backend.dto.AberturaContaRequest;
import com.eclipsebank.backend.model.Conta;

@RestController
public class AberturaContaController {

    private AberturaContaService aberturaContaService;
    
    public AberturaContaController(AberturaContaService aberturaContaService) {
        this.aberturaContaService = aberturaContaService;
    }

    @PostMapping("/abertura-conta")
    public Conta abrirConta(@RequestBody AberturaContaRequest request) {
        return aberturaContaService.abrirConta(request);
    }

}
