package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.model.Cartao;
import com.eclipsebank.backend.service.CartaoService;

@RestController
public class CartaoController {
    
    private CartaoService cartaoService;

    public CartaoController(CartaoService cartaoService) {
        this.cartaoService = cartaoService;
    }

    @GetMapping("/cartoes")
    public List<Cartao> listar() {
        return cartaoService.listar();
    }

    @GetMapping("/contas/{contaId}/cartao")
    public Cartao buscarPorConta(@PathVariable Long contaId) {
        return cartaoService.buscarPorConta(contaId);
    }

    @PostMapping("/contas/{contaId}/cartao")
    public Cartao criarParaConta(@PathVariable Long contaId, @RequestBody Cartao cartao) {
        return cartaoService.criarParaConta(contaId, cartao);
    }

}
