package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.dto.AdicionarValorMetaRequest;
import com.eclipsebank.backend.model.MetaFinanceira;
import com.eclipsebank.backend.service.MetaFinanceiraService;

@RestController
public class MetaFinanceiraController {
    
    private MetaFinanceiraService metaFinanceiraService;

    public MetaFinanceiraController(MetaFinanceiraService metaFinanceiraService) {
        this.metaFinanceiraService = metaFinanceiraService;
    }

    @GetMapping("/contas/{contaId}/metas")
    public List<MetaFinanceira> listarPorConta(@PathVariable Long contaId) {
        return metaFinanceiraService.listarPorConta(contaId);
    }

    @PostMapping("/contas/{contaId}/metas")
    public MetaFinanceira criar(@PathVariable Long contaId, @RequestBody MetaFinanceira meta) {
        return metaFinanceiraService.criar(contaId, meta);
    }

    @PostMapping("/metas/{metaId}/adicionar-valor")
    public MetaFinanceira adicionarValor(@PathVariable Long metaId, @RequestBody AdicionarValorMetaRequest request) {
        return metaFinanceiraService.adicionarValor(metaId, request.getValor());
    }

    @PostMapping("/metas/{metaId}/cancelar")
    public MetaFinanceira cancelar(@PathVariable Long metaId) {
        return metaFinanceiraService.cancelar(metaId);
    }

}
