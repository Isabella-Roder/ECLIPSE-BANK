package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.model.Emprestimo;
import com.eclipsebank.backend.service.EmprestimoService;

@RestController
public class EmprestimoController {
    
    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @GetMapping("/emprestimos")
    public List<Emprestimo> listar() {
        return emprestimoService.listar();
    }

    @GetMapping("/contas/{contaId}/emprestimos")
    public List<Emprestimo> listarPorConta(@PathVariable Long contaId) {
        return emprestimoService.listarPorConta(contaId);
    }

    @GetMapping("/emprestimos/{id}")
    public Emprestimo buscarPorId(@PathVariable Long id) {
        return emprestimoService.buscarPorId(id);
    }

    @PostMapping("/contas/{contaId}/emprestimos/simular")
    public Emprestimo simular(@PathVariable Long contaId, @RequestBody Emprestimo emprestimo) {
        return emprestimoService.simular(contaId, emprestimo);
    }

    @PostMapping("/emprestimos/{emprestimoId}/contratar")
    public Emprestimo contratar(@PathVariable Long emprestimoId) {
        return emprestimoService.contratar(emprestimoId);
    }

    @PostMapping("/emprestimos/{emprestimoId}/pagar-parcela")
    public Emprestimo pagarParcela(@PathVariable Long emprestimoId) {
        return emprestimoService.pagarParcela(emprestimoId);
    }

}
