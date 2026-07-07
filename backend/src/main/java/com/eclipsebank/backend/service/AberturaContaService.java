package com.eclipsebank.backend.service;

import org.springframework.transaction.annotation.Transactional;   

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.dto.AberturaContaRequest;
import com.eclipsebank.backend.model.Usuario;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.service.ContaService;
import com.eclipsebank.backend.service.UsuarioService;

@Service
public class AberturaContaService {
    
    private ContaService contaService;
    private UsuarioService usuarioService;

    public AberturaContaService(ContaService contaService, UsuarioService usuarioService) {
        this.contaService = contaService;
        this.usuarioService = usuarioService;
    }

    @Transactional
    public Conta abrirConta(AberturaContaRequest request) {
        Usuario usuario = new Usuario();

        usuario.setNome(request.getNome());
        usuario.setNomeSocial(request.getNomeSocial());
        usuario.setCpf(request.getCpf());
        usuario.setTelefone(request.getTelefone());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(request.getSenha());
        usuario.setDataNascimento(request.getDataNascimento());

        Usuario usuarioSalvo = usuarioService.cadastrar(usuario);

        Conta conta = new Conta();
        conta.setTitular(request.getTitular());
        conta.setChavePix(request.getChavePix());
        conta.setTipoChavePix(request.getTipoChavePix());
        conta.setLimite(request.getLimite());

        return contaService.cadastrarParaUsuario(usuarioSalvo.getId(), conta);

    }
}
