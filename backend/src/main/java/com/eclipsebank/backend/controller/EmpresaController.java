package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.model.Empresa;
import com.eclipsebank.backend.service.EmpresaService;
import com.eclipsebank.backend.dto.LoginRequest;

@RestController
public class EmpresaController {
    
    private EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @GetMapping("/empresas")
    public List<Empresa> listar() {
        return empresaService.listar();
    }

    @GetMapping("/empresas/{empresaId}")
    public Empresa buscarPorId(@PathVariable Long empresaId) {
        return empresaService.buscarPorId(empresaId);
    }

    @PostMapping("/empresas")
    public Empresa cadastrar(@RequestBody Empresa empresa) {
        return empresaService.cadastrar(empresa);
    }

    @PostMapping("/login/empresa")
    public Empresa login(@RequestBody LoginRequest request) {
        return empresaService.login(request);
    }

}
