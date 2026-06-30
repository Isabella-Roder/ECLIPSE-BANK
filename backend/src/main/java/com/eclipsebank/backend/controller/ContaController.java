package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.service.ContaService;

@RestController
public class ContaController {
    
    private ContaService contaService;

    public ContaController (ContaService contaService) {
        this.contaService = contaService;
    }

    @GetMapping("/contas")
    public List<Conta> listar() {
        return contaService.listar();
    }

    @PostMapping("/contas")
    public Conta cadastrar(@RequestBody Conta conta) {
        return contaService.cadastrar(conta);
    }
}
