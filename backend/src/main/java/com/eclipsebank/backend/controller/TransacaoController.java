package com.eclipsebank.backend.controller;

import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.enums.TipoTransacao;
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

    @GetMapping("/contas/{contaId}/transacoes")
    public List<Transacao> listarPorConta(@PathVariable Long contaId) {
        return transacaoService.listarPorConta(contaId);
    }

    @GetMapping("/contas/{contaId}/transacoes/filtro")
    public List<Transacao> filtrarTransacoes(
        @PathVariable Long contaId,
        @RequestParam(required = false) TipoTransacao tipo,
        @RequestParam(required = false) String categoria,
        @RequestParam(required = false) String inicio,
        @RequestParam(required = false) String fim) {
            LocalDateTime inicioDoDia = null;
            LocalDateTime fimDoDia = null;

            if (inicio != null && fim != null) {
                LocalDate dataInicio = LocalDate.parse(inicio);
                LocalDate dataFim = LocalDate.parse(fim);

                inicioDoDia = dataInicio.atStartOfDay();
                fimDoDia = dataFim.atTime(23, 59, 59);
            }

            return transacaoService.filtrarTransacoes(contaId, tipo, categoria, inicioDoDia, fimDoDia);
        }

    @GetMapping("/contas/{contaId}/transacoes/tipo/{tipo}")
    public List<Transacao> listarPorContaETipo(@PathVariable Long contaId, @PathVariable TipoTransacao tipo) {
        return transacaoService.listarPorContaETipo(contaId, tipo);
    }

    @GetMapping("/contas/{contaId}/transacoes/categoria/{categoria}")
    public List<Transacao> listarPorContaECategoria(@PathVariable Long contaId, @PathVariable String categoria) {
        return transacaoService.listarPorContaECategoria(contaId, categoria);
    }

    @GetMapping("/contas/{contaId}/transacoes/periodo")
    public List<Transacao> listarPorContaEPeriodo(@PathVariable Long contaId, @RequestParam String inicio, @RequestParam String fim) {
        LocalDate dataInicio = LocalDate.parse(inicio);
        LocalDate dataFim = LocalDate.parse(fim);

        LocalDateTime inicioDoDia = dataInicio.atStartOfDay();
        LocalDateTime fimDoDia = dataFim.atTime(23, 59, 59);

        return transacaoService.listarPorContaEPeriodo(contaId, inicioDoDia, fimDoDia);
    }

    //rota com metodo post
    @PostMapping("/transacoes")
    public Transacao cadastrar(@RequestBody Transacao transacao) {
        return transacaoService.cadastrar(transacao);
    }
}
