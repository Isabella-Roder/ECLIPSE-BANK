package com.eclipsebank.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.service.IndicadorFinanceiroService;
import com.eclipsebank.backend.dto.IndicadoresFinanceiros;

@RestController
public class IndicadorFinanceiroController {
    
    private IndicadorFinanceiroService indicadorFinanceiroService;

    public IndicadorFinanceiroController(IndicadorFinanceiroService indicadorFinanceiroService) {
        this.indicadorFinanceiroService = indicadorFinanceiroService;
    }

    @GetMapping("/indicadores-financeiros")
    public IndicadoresFinanceiros buscarIndicadores() {
        return indicadorFinanceiroService.buscarIndicadores();
    }

}
