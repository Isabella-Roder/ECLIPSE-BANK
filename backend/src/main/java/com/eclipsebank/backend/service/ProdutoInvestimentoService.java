package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.dto.IndicadoresFinanceiros;
import com.eclipsebank.backend.dto.ProdutoInvestimentoInfo;
import com.eclipsebank.backend.enums.PerfilInvestidor;
import com.eclipsebank.backend.enums.ProdutoInvestimento;
import com.eclipsebank.backend.enums.TipoInvestimento;

@Service
public class ProdutoInvestimentoService {

    private IndicadorFinanceiroService indicadorFinanceiroService;

    public ProdutoInvestimentoService(IndicadorFinanceiroService indicadorFinanceiroService) {
        this.indicadorFinanceiroService = indicadorFinanceiroService;
    }
    
    public List<ProdutoInvestimentoInfo> listar() {
        IndicadoresFinanceiros indicadores = indicadorFinanceiroService.buscarIndicadores();

        Double taxaSelic = indicadores.getSelic() / 100;
        Double taxaCdi = indicadores.getCdi() / 100;
        Double taxaIpca = indicadores.getIpca() / 100;

        return List.of(
            new ProdutoInvestimentoInfo(
                "CDB Eclipse Liquidez Diaria",
                ProdutoInvestimento.CDB_LIQUIDEZ_DIARIA,
                TipoInvestimento.RENDA_FIXA,
                PerfilInvestidor.CONSERVADOR,
                "Baixo",
                "100% do CDI",
                "Ideal para reserva de emergencia",
                taxaCdi
            )
        );
    }
}
