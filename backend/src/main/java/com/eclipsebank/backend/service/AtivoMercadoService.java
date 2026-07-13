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

        AtivoMercadoInfo ativoFallback = buscarAtivoFallback(tickerFormatado);

        if (ativoFallback != null && tickerFormatado.endsWith("11")) {
            return ativoFallback;
        }

        String url = "https://brapi.dev/api/quote/" + tickerFormatado;

        try {

        

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
        } catch (Exception erro) {
            if (ativoFallback != null) {
                return ativoFallback;
            }

            throw new IllegalArgumentException("Nao foi possivel buscar o ativo agora.");
        }
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

    private AtivoMercadoInfo buscarAtivoFallback(String ticker) {
        if (ticker.equals("MXRF11")) {
            return new AtivoMercadoInfo(
                "MXRF11",
                "Maxi renda",
                "FII",
                10.15,
                0.42,
                12.30
            );
        }

        if (ticker.equals("BTLG11")) {
            return new AtivoMercadoInfo(
                "BTLG11",
                "BTG Pactual Logistica",
                "FII",
                103.50,
                -0.18,
                8.90
            );
        }

        if (ticker.equals("PETR4")) {
            return new AtivoMercadoInfo(
                "PETR4",
                "Petrobras PN",
                "ACAO",
                38.70,
                -0.85,
                7.20
            );
        }

        if (ticker.equals("VALE3")) {
            return new AtivoMercadoInfo(
                "VALE3",
                "Vale ON",
                "ACAO",
                62.40,
                0.35,
                8.10
            );
        }

        if (ticker.equals("ITUB4")) {
            return new AtivoMercadoInfo(
                "ITUB4",
                "Itau Unibanco PN",
                "ACAO",
                33.20,
                0.18,
                6.40
            );
        }

        if (ticker.equals("BBDC4")) {
            return new AtivoMercadoInfo(
                "BBDC4",
                "Bradesco PN",
                "ACAO",
                14.80,
                -0.22,
                5.90
            );
        }

        return null;
    }

}
