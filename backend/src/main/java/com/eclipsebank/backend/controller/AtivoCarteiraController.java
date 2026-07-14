package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.dto.VendaAtivoRequest;
import com.eclipsebank.backend.model.AtivoCarteira;
import com.eclipsebank.backend.service.AtivoCarteiraService;

@RestController
public class AtivoCarteiraController {
    
    private AtivoCarteiraService ativoCarteiraService;

    public AtivoCarteiraController(AtivoCarteiraService ativoCarteiraService) {
        this.ativoCarteiraService = ativoCarteiraService;
    }

    @GetMapping("/contas/{contaId}/ativos")
    public List<AtivoCarteira> listarPorConta(@PathVariable Long contaId) {
        return ativoCarteiraService.listarPorConta(contaId);
    }

    @PostMapping("/contas/{contaId}/ativos")
    public AtivoCarteira comprar(@PathVariable Long contaId, @RequestBody AtivoCarteira ativoCarteira) {
        return ativoCarteiraService.comprar(contaId, ativoCarteira);
    }

    @PostMapping("/ativos/{ativoId}/vender")
    public AtivoCarteira vender(@PathVariable Long ativoId, @RequestBody VendaAtivoRequest request) {
        return ativoCarteiraService.vender(ativoId, request.getQuantidade());
    }

}
