package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.dto.PagamentoRequest;
import com.eclipsebank.backend.model.Pagamento;
import com.eclipsebank.backend.service.PagamentoService;

@RestController
public class PagamentoController {
    
    private PagamentoService pagamentoService;

    public PagamentoController(PagamentoService pagamentoService) {
        this.pagamentoService = pagamentoService;
    }

    @GetMapping("/pagamentos")
    public List<Pagamento> listar() {
        return pagamentoService.listar();
    }

    @PostMapping("/pagamentos")
    public Pagamento pagar(@RequestBody PagamentoRequest request) {
        return pagamentoService.pagar(request);
    }

}
