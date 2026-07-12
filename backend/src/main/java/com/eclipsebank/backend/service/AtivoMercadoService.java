package com.eclipsebank.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.eclipsebank.backend.dto.AtivoMercadoInfo;

@Service
public class AtivoMercadoService {

    private RestTemplate restTemplate = new RestTemplate();

    public AtivoMercadoInfo buscarPorTicker(String ticker) {
        String tickerFormatado = ticker.toUpperCase();

        if (tickerFormatado.equals("MXRF11")) {
            return new AtivoMercadoInfo(
                "MXRF11",
                "Maxi renda",
                "FII",
                10.15,
                0.42,
                12.30
            );
        }

        if (tickerFormatado.equals("BTLG11")) {
            return new AtivoMercadoInfo(
                "BTLG11",
                "BTG Pactual Logistica",
                "FII",
                103.50,
                -0.18,
                8.90
            );
        }

        String url = "https://brapi.dev/api/quote/" + tickerFormatado;

        Map resposta = restTemplate.getForObject(url, Map.class);

        List results = (List) resposta.get("results");

        if (results == null || results.isEmpty()) {
            throw new IllegalArgumentException("Ativo não encontrado.");
        }

        Map ativo = (Map) results.get(0);

        String nome = (String) ativo.get("longName");
        Double precoAtual = converterParaDouble(ativo.get("regularMarketPrice"));
        Double variacaoDia = converterParaDouble(ativo.get("regularMarketChangePercent"));

        return new AtivoMercadoInfo(
            tickerFormatado,
            nome,
            descobrirTipo(tickerFormatado),
            precoAtual,
            variacaoDia,
            0.0
        );
    }

    private Double converterParaDouble(Object valor) {
        if (valor == null) {
            return 0.0;
        }

        return Double.valueOf(valor.toString());
    }

    private String descobrirTipo(String ticker) {
        if (ticker.endsWith("11")) {
            return "FII";
        }

        if (ticker.endsWith("34")) {
            return "BDR";
        }

        return "ACAO";
    }

}
