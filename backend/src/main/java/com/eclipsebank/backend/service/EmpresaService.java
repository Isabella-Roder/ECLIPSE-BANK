package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eclipsebank.backend.enums.TipoChavePix;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.model.Empresa;
import com.eclipsebank.backend.repository.EmpresaRepository;

@Service
public class EmpresaService {
    
    private EmpresaRepository empresaRepository;
    private ContaService contaService;

    public EmpresaService(EmpresaRepository empresaRepository, ContaService contaService) {
        this.empresaRepository = empresaRepository;
        this.contaService = contaService;
    }

    public List<Empresa> listar() {
        return empresaRepository.findAll();
    }

    public Empresa buscarPorId(Long empresaId) {
        return empresaRepository.findById(empresaId).orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada."));
    }

    private void validarEmpresa(Empresa empresa) {
        if (empresa.getRazaoSocial() == null || empresa.getRazaoSocial().isBlank()) {
            throw new IllegalArgumentException("Razão social não pode ser vazio.");
        } else if (empresa.getNomeFantasia() == null || empresa.getNomeFantasia().isBlank()) {
            throw new IllegalArgumentException("Nome fantasia não pode ser vazio.");
        } else if (empresa.getCnpj() == null || empresa.getCnpj().isBlank()) {
            throw new IllegalArgumentException("CNPJ não pode ser vazio.");
        } else if (empresa.getTelefone() ==  null || empresa.getTelefone().isBlank()) {
            throw new IllegalArgumentException("Telefone não pode ser vazio.");
        } else if (empresa.getEmail() == null || empresa.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email não pode ser vazio.");
        } else if (empresa.getSenha() == null || empresa.getSenha().isBlank()) {
            throw new IllegalArgumentException("Senha não pode ser vazio.");
        }

        if (empresaRepository.existsByCnpj(empresa.getCnpj())) {
            throw new IllegalArgumentException("CNPJ já cadastrado.");
        }

        if (empresaRepository.existsByEmail(empresa.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
    }

    @Transactional
    public Empresa cadastrar(Empresa empresa) {
        validarEmpresa(empresa);

        Empresa empresaSalva = empresaRepository.save(empresa);

        Conta conta = new Conta();
        conta.setTitular(empresaSalva.getRazaoSocial());
        conta.setChavePix(empresaSalva.getEmail());
        conta.setTipoChavePix(TipoChavePix.EMAIL);
        conta.setLimite(5000.0);

        contaService.cadastrarParaEmpresa(empresaSalva.getId(), conta);

        return empresaSalva;
    }

}
