package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.dto.ProdutoInvestimentoInfo;
import com.eclipsebank.backend.service.ProdutoInvestimentoService;

@RestController
public class ProdutoInvestimentoController {
    
    private ProdutoInvestimentoService produtoInvestimentoService;

    public ProdutoInvestimentoController(ProdutoInvestimentoService produtoInvestimentoService) {
        this.produtoInvestimentoService = produtoInvestimentoService;
    }

    @GetMapping("/produtos-investimento")
    public List<ProdutoInvestimentoInfo> listar() {
        return produtoInvestimentoService.listar();
    }

}
