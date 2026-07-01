package com.eclipsebank.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.repository.UsuarioRepository;
import com.eclipsebank.backend.service.TransacaoService;

@RestController
public class DashboardController {
    
    private TransacaoService transacaoService;
    private ContaRepository contaRepository;
    private UsuarioRepository usuarioRepository;

    public DashboardController(TransacaoService transacaoService, ContaRepository contaRepository, UsuarioRepository usuarioRepository) {
        this.transacaoService = transacaoService;
        this.contaRepository = contaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> resumo() {
        double saldoTotal = contaRepository.findAll().stream().mapToDouble(conta -> conta.getSaldo() == null ? 0.0 : conta.getSaldo()).sum();

        long totalContas = contaRepository.count();
        long totalUsuarios = usuarioRepository.count();

        return Map.of(
            "saldoAtual", saldoTotal,
            "entradasMes", transacaoService.calcularEntradas(),
            "saidasMes", transacaoService.calcularSaidas(),
            "economia", saldoTotal,
            "totalContas", totalContas,
            "totalUsuarios", totalUsuarios
        );
    }

}
