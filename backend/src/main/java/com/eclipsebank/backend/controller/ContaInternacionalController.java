package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.dto.CambioRequest;
import com.eclipsebank.backend.enums.Moeda;
import com.eclipsebank.backend.model.ContaInternacional;
import com.eclipsebank.backend.service.ContaInternacionalService;

@RestController
public class ContaInternacionalController {
    
    private final ContaInternacionalService contaInternacionalService;

    public ContaInternacionalController(ContaInternacionalService contaInternacionalService) {
        this.contaInternacionalService = contaInternacionalService;
    }

    @GetMapping("/contas-internacionais")
    public List<ContaInternacional> listar() {
        return contaInternacionalService.listar();
    }

    @GetMapping("/contas-internacionais/{id}")
    public ContaInternacional buscarPorId(@PathVariable Long id) {
        return contaInternacionalService.buscarPorId(id);
    }

    @GetMapping("/usuarios/{usuarioId}/contas-internacionais")
    public List<ContaInternacional> listarPorUsuario(@PathVariable Long usuarioId) {
        return contaInternacionalService.listarPorUsuario(usuarioId);
    }

    @PostMapping("/usuarios/{usuarioId}/contas-internacionais")
    public ContaInternacional abrirConta(@PathVariable Long usuarioId, @RequestParam Moeda moeda) {
        return contaInternacionalService.abrirConta(usuarioId, moeda);
    }

    @PostMapping("/usuarios/{usuarioId}/contas-internacionais/comprar")
    public ContaInternacional comprarMoeda(@PathVariable Long usuarioId, @RequestBody CambioRequest request) {
        return contaInternacionalService.comprarMoeda(usuarioId, request.getMoeda(), request.getValor());
    }

    @PostMapping("/usuarios/{usuarioId}/contas-internacionais/vender")
    public ContaInternacional venderMoeda(@PathVariable Long usuarioId, @RequestBody CambioRequest request) {
        return contaInternacionalService.venderMoeda(usuarioId, request.getMoeda(), request.getValor());
    }

}
