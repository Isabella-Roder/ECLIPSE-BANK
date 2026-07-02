package com.eclipsebank.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eclipsebank.backend.dto.TransferenciaPorNumeroRequest;
import com.eclipsebank.backend.dto.TransferenciaRequest;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.service.ContaService;

@RestController
public class ContaController {
    
    private ContaService contaService;

    public ContaController (ContaService contaService) {
        this.contaService = contaService;
    }

    @GetMapping("/contas")
    public List<Conta> listar() {
        return contaService.listar();
    }

    @PostMapping("/contas")
    public Conta cadastrar(@RequestBody Conta conta) {
        return contaService.cadastrar(conta);
    }

    @GetMapping("/contas/{contaId}")
    public Conta buscarPorId(@PathVariable Long contaId) {
        return contaService.buscarPorId(contaId);
    }

    @GetMapping("/usuarios/{usuarioId}/conta")
    public Conta buscarContaPorUsuario(@PathVariable Long usuarioId) {
        return contaService.buscarPorUsuario(usuarioId);
    }

    @PostMapping("/contas/usuario/{usuarioId}")
    public Conta cadastrarParaUsuario(@PathVariable Long usuarioId, @RequestBody Conta conta) {
        return contaService.cadastrarParaUsuario(usuarioId, conta);
    }

    @PostMapping("/contas/{contaId}/depositar")
    public Conta depositar(@PathVariable Long contaId, @RequestParam Double valor) {
        return contaService.depositar(contaId, valor);
    }

    @PostMapping("/contas/{contaId}/sacar")
    public Conta sacar(@PathVariable Long contaId, @RequestParam Double valor) {
        return contaService.sacar(contaId, valor);
    }

    @PostMapping("/contas/transferir")
    public Conta transferir(@RequestBody TransferenciaRequest request) {
        return contaService.transferir(request);
    }

    @PostMapping("/contas/transferir/numero")
    public Conta transferirPorNumero(@RequestBody TransferenciaPorNumeroRequest request) {
        return contaService.TransferirPorNumero(request);
    }
}
