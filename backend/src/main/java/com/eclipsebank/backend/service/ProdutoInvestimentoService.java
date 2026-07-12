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
            ),

            new ProdutoInvestimentoInfo(
                "CDB Eclipse Prefixado", 
                ProdutoInvestimento.CDB_PREFIXADO,
                TipoInvestimento.RENDA_FIXA,
                PerfilInvestidor.CONSERVADOR,
                "Baixo",
                "Taxa fixa anual",
                "Opção para quem quer previsibilidade de rendimento ate o vencimento",
                taxaCdi + 0.01
            ),

            new ProdutoInvestimentoInfo(
                "Tesouro Eclipse Selic",
                ProdutoInvestimento.TESOURO_SELIC,
                TipoInvestimento.TESOURO,
                PerfilInvestidor.CONSERVADOR,
                "Baixo",
                "Baseado na Selic",
                "Produto conservador para acompanhar a taxa basica de juros.",
                taxaSelic
            ),

            new ProdutoInvestimentoInfo(
                "Tesouro Eclipse IPCA+",
                ProdutoInvestimento.TESOURO_IPCA,
                TipoInvestimento.TESOURO,
                PerfilInvestidor.MODERADO,
                "Medio",
                "IPCA + taxa fixa",
                "Pensando para objetivos de longo prazo com proteção contra a inflação.",
                taxaIpca + 0.055
            ),

            new ProdutoInvestimentoInfo(
                "Fundo Eclipse Renda Fixa",
                ProdutoInvestimento.FUNDO_RENDA_FIXA,
                TipoInvestimento.FUNDO,
                PerfilInvestidor.CONSERVADOR,
                "Baixo", 
                "Carteira de renda fixa",
                "Fundo ficticio com foco em estabilidade e diversificação conservadora.",
                taxaCdi * 0.95
            ),

            new ProdutoInvestimentoInfo(
                "Fundo Eclipse Multimercado",
                ProdutoInvestimento.FUNDO_MULTIMERCADO,
                TipoInvestimento.FUNDO,
                PerfilInvestidor.MODERADO,
                "Medio",
                "Rentabilidade variavel",
                "Fundo ficticio com estrategias variadas e maior oscilação.",
                taxaCdi + 0.025
            ), 

            new ProdutoInvestimentoInfo(
                "ETF Eclipse",
                ProdutoInvestimento.ETF_ECLIPSE,
                TipoInvestimento.ETF,
                PerfilInvestidor.ARROJADO,
                "Alto",
                "Exposição a mercado",
                "Produto ficticio inspirado em carteiras de indice e renda variavel.",
                0.12
            ),

            new ProdutoInvestimentoInfo(
                "Cripto Eclipse",
                ProdutoInvestimento.CRIPTO_ECLIPSE,
                TipoInvestimento.CRIPTO,
                PerfilInvestidor.ARROJADO,
                "Alto",
                "Alta volatilidade",
                "Produto ficticio para simular exposição a criptoativos.",
                0.18
            )
        );
    }
}
