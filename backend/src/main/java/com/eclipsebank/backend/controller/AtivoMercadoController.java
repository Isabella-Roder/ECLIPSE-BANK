package com.eclipsebank.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.dto.AtivoMercadoInfo;
import com.eclipsebank.backend.service.AtivoMercadoService;

@RestController
public class AtivoMercadoController {
    
    private AtivoMercadoService ativoMercadoService;

    public AtivoMercadoController(AtivoMercadoService ativoMercadoService) {
        this.ativoMercadoService = ativoMercadoService;
    }

    @GetMapping("/mercado/ativos/{ticker}")
    public AtivoMercadoInfo buscarAtivo(@PathVariable String ticker) {
        return ativoMercadoService.buscarPorTicker(ticker);
    }

}
