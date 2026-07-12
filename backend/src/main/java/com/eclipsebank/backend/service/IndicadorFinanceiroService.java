package com.eclipsebank.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.eclipsebank.backend.dto.IndicadoresFinanceiros;

@Service
public class IndicadorFinanceiroService {
    
    private final RestTemplate restTemplate = new RestTemplate();

    public IndicadoresFinanceiros buscarIndicadores() {
        Double selic = buscarUltimoValor("432");
        Double ipca = buscarUltimoValor("433");

        Double cdi = selic - 0.10;

        return new IndicadoresFinanceiros(selic, ipca, cdi);
    }

    private Double buscarUltimoValor(String codigoSerie) {
        String url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs."
            + codigoSerie
            + "/dados/ultimos/1?formato=json";

        List<Map<String, String>> resposta = restTemplate.getForObject(url, List.class);

        if (resposta == null || resposta.isEmpty()) {
            return 0.0;
        }

        String valorTexto = resposta.get(0).get("valor");
        return Double.parseDouble(valorTexto.replace(",", "."));
    }

}
