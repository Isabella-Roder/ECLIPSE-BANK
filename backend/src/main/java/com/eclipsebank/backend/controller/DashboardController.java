package com.eclipsebank.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.service.TransacaoService;



@RestController
public class DashboardController {
    
    private TransacaoService transacaoService;

    public DashboardController(TransacaoService transacaoService) {
        this.transacaoService = transacaoService;
    }

    @GetMapping("/dashboard")
    public Map<String, Double> resumo() {
        return Map.of(
            "saldoAtual", transacaoService.calcularSaldo(),
            "entradasMes", transacaoService.calcularEntradas(),
            "saidasMes", transacaoService.calcularSaidas(),
            "economia", transacaoService.calcularSaldo()
        );
    }

}
