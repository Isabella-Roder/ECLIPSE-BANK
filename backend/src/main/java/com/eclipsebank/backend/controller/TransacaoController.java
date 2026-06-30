package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.model.TipoTransacao;
import com.eclipsebank.backend.model.Transacao;
import com.eclipsebank.backend.service.TransacaoService;

//diz que a classe vai criar rotas
@RestController
public class TransacaoController {
    
    private TransacaoService transacaoService;
    //injeção de dependencia
    public TransacaoController(TransacaoService transacaoService) {
        this.transacaoService = transacaoService;
    }

    //rota com metodo get
    @GetMapping("/transacoes")
    public List<Transacao> listar() {
        return transacaoService.listar();
    }

    @GetMapping("/transacoes/tipo/{tipo}")
    public List<Transacao> listarPorTipo(@PathVariable TipoTransacao tipo) {
        return transacaoService.listarPorTipo(tipo);
    }

    @GetMapping("/transacoes/categoria/{categoria}")
    public List<Transacao> listarPorCategoria(@PathVariable String categoria) {
        return transacaoService.listarPorCategoria(categoria);
    }

    //rota com metodo post
    @PostMapping("/transacoes")
    public Transacao cadastrar(@RequestBody Transacao transacao) {
        return transacaoService.cadastrar(transacao);
    }
}
