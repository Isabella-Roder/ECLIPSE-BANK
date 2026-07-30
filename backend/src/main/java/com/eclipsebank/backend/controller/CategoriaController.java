package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.model.CategoriaFinanceira;
import com.eclipsebank.backend.service.CategoriaFinanceiraService;


@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaFinanceiraService categoriaFinanceiraService;

    public CategoriaController(CategoriaFinanceiraService categoriaFinanceiraService) {
        this.categoriaFinanceiraService = categoriaFinanceiraService;
    }
    
    @GetMapping
    public List<CategoriaFinanceira> listar() {
        return categoriaFinanceiraService.listar();
    }

    @GetMapping("/ativas")
    public List<CategoriaFinanceira> listarAtivas() {
        return categoriaFinanceiraService.listarAtivas();
    }

    @GetMapping("/tipo/{tipo}")
    public List<CategoriaFinanceira> listarPorTipo(@PathVariable String tipo) {
        return categoriaFinanceiraService.listarPorTipo(tipo);
    }

    @GetMapping("/{id}")
    public CategoriaFinanceira buscarPorId(@PathVariable Long id) {
        return categoriaFinanceiraService.buscarPorId(id);
    }

    @PostMapping
    public CategoriaFinanceira cadastrar(@RequestBody CategoriaFinanceira categoriaFinanceira) {
        return categoriaFinanceiraService.cadastrar(categoriaFinanceira);
    }

    @PutMapping("/{id}")
    public CategoriaFinanceira atualizar(@PathVariable Long id, @RequestBody CategoriaFinanceira categoriaFinanceira) {
        return categoriaFinanceiraService.atualizar(id, categoriaFinanceira);
    }

    @PatchMapping("/{id}/desativar")
    public CategoriaFinanceira desativar(@PathVariable Long id) {
        return categoriaFinanceiraService.desativar(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        categoriaFinanceiraService.deletar(id);
    }

}
