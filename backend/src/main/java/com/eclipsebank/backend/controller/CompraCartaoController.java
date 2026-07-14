package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.service.CompraCartaoService;
import com.eclipsebank.backend.model.CompraCartao;

@RestController
public class CompraCartaoController {
    
    private CompraCartaoService compraCartaoService;

    public CompraCartaoController(CompraCartaoService compraCartaoService) {
        this.compraCartaoService = compraCartaoService;
    }

    @GetMapping("/compras-cartao")
    public List<CompraCartao> listar() {
        return compraCartaoService.listar();
    }

    @GetMapping("/cartoes/{cartaoId}/compras")
    public List<CompraCartao> listarPorCartao(@PathVariable Long cartaoId) {
        return compraCartaoService.listarPorCartao(cartaoId);
    }

    @PostMapping("/cartoes/{cartaoId}/compras")
    public CompraCartao comprar(@PathVariable Long cartaoId, @RequestBody CompraCartao compra) {
        return compraCartaoService.comprar(cartaoId, compra);
    }

    @GetMapping("/cartoes/{cartaoId}/fatura")
    public Double calcularFatura(@PathVariable Long cartaoId) {
        return compraCartaoService.calcularFatura(cartaoId);
    }

    @PostMapping("/cartoes/{cartaoId}/pagar-fatura")
    public Double pagarFatura(@PathVariable Long cartaoId) {
        return compraCartaoService.pagarFatura(cartaoId);
    }

}
