package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.model.Investimento;
import com.eclipsebank.backend.service.InvestimentoService;

@RestController
public class InvestimentoController {
    
    private InvestimentoService investimentoService;

    public InvestimentoController(InvestimentoService investimentoService) {
        this.investimentoService = investimentoService;
    }

    @GetMapping("/investimentos")
    public List<Investimento> listar() {
        return investimentoService.listar();
    }

    @GetMapping("/contas/{contaId}/investimentos")
    public List<Investimento> listarPorConta(@PathVariable Long contaId) {
        return investimentoService.listarPorConta(contaId);
    }

    @PostMapping("/contas/{contaId}/investimentos")
    public Investimento aplicar(@PathVariable Long contaId, @RequestBody Investimento investimento) {
        return investimentoService.aplicar(contaId, investimento);
    }

    @PostMapping("/investimentos/{investimentoId}/resgatar")
    public Investimento resgatar(@PathVariable Long investimentoId) {
        return investimentoService.resgatar(investimentoId);
    }

}
