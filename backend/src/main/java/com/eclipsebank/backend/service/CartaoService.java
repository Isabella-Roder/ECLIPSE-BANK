package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.Cartao;
import com.eclipsebank.backend.repository.CartaoRepository;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.model.Conta;

@Service
public class CartaoService {
    
    private CartaoRepository cartaoRepository;
    private ContaRepository contaRepository;

    public CartaoService(CartaoRepository cartaoRepository, ContaRepository contaRepository) {
        this.cartaoRepository = cartaoRepository;
        this.contaRepository = contaRepository;
    }

    public List<Cartao> listar() {
        return cartaoRepository.findAll();
    }

    public Cartao buscarPorConta(Long contaId) {
        return cartaoRepository.findByContaId(contaId).orElseThrow(() -> new IllegalArgumentException("Cartão não encontrado."));
    }

    public Cartao criarParaConta(Long contaId, Cartao cartao) {
        Conta conta = contaRepository.findById(contaId).orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));

        if (cartaoRepository.existsByContaId(contaId)) {
            throw new IllegalArgumentException("Essa conta já possui cartão.");
        }

        if (cartao.getNumero() == null || cartao.getNumero().isBlank()) {
            cartao.setNumero(gerarNumeroCartao());
        }

        if (cartaoRepository.existsByNumero(cartao.getNumero())) {
            throw new IllegalArgumentException("Numero de cartão já existe");
        }

        if (cartao.getLimiteTotal() == null || cartao.getLimiteTotal() <= 0) {
            throw new IllegalArgumentException("Limite do cartão deve ser maior que zero.");
        }

        if (cartao.getLimiteDisponivel() == null) {
            cartao.setLimiteDisponivel(cartao.getLimiteTotal());
        }

        if (cartao.getStatus() == null || cartao.getStatus().isBlank()) {
            cartao.setStatus("ATIVO");
        }

        cartao.setConta(conta);
        return cartaoRepository.save(cartao);
    }

    private String gerarNumeroCartao() {
        return "4539" + System.currentTimeMillis();
    }

}
