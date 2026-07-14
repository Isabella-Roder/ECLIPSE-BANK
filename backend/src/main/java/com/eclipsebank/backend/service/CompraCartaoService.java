package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.model.CompraCartao;
import com.eclipsebank.backend.repository.CartaoRepository;
import com.eclipsebank.backend.repository.CompraCartaoRepository;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.enums.TipoTransacao;
import com.eclipsebank.backend.model.Cartao;
import com.eclipsebank.backend.model.Conta;

@Service
public class CompraCartaoService {
    
    private CompraCartaoRepository compraCartaoRepository;
    private CartaoRepository cartaoRepository;
    private TransacaoService transacaoService;
    private ContaRepository contaRepository;

    public CompraCartaoService(CompraCartaoRepository compraCartaoRepository, CartaoRepository cartaoRepository, ContaRepository contaRepository, TransacaoService transacaoService) {
        this.compraCartaoRepository = compraCartaoRepository;
        this.cartaoRepository = cartaoRepository;
        this.transacaoService = transacaoService;
        this.contaRepository = contaRepository;
    }

    public List<CompraCartao> listar() {
        return compraCartaoRepository.findAll();
    }

    public List<CompraCartao> listarPorCartao(Long cartaoId) {
        return compraCartaoRepository.findByCartaoId(cartaoId);
    }

    public CompraCartao comprar(Long cartaoId, CompraCartao compra) {
        Cartao cartao = cartaoRepository.findById(cartaoId).orElseThrow(() -> new IllegalArgumentException("Cartão não encontrado."));

        if (!"ATIVO".equalsIgnoreCase(cartao.getStatus())) {
            throw new IllegalArgumentException("Cartão nãp esta ativo.");
        }

        if (compra.getValor() == null || compra.getValor() <= 0) {
            throw new IllegalArgumentException("Valor de compra deve ser maior que zero.");
        }

        if (cartao.getLimiteDisponivel() == null) {
            cartao.setLimiteDisponivel(0.0);
        }

        if (compra.getValor() > cartao.getLimiteDisponivel()) {
            throw new IllegalArgumentException("Limite insuficiente no cartão.");
        }

        cartao.setLimiteDisponivel(cartao.getLimiteDisponivel() - compra.getValor());

        if (compra.getDataHora() == null) {
            compra.setDataHora(LocalDateTime.now());
        }

        if (compra.getStatus() == null || compra.getStatus().isBlank()) {
            compra.setStatus("APROVADA");
        }

        compra.setCartao(cartao);
        cartaoRepository.save(cartao);
        return compraCartaoRepository.save(compra);
    }

    public Double calcularFatura(Long cartaoId) {
        List<CompraCartao> compras = compraCartaoRepository.findByCartaoId(cartaoId);

        return compras.stream().filter(compra -> "APROVADA".equalsIgnoreCase(compra.getStatus()))
            .mapToDouble(CompraCartao::getValor).sum();
    }

    public Double pagarFatura(Long cartaoId) {
        Cartao cartao = cartaoRepository.findById(cartaoId).orElseThrow(() -> new IllegalArgumentException("Cartão não encontrado"));

        Double valorFatura = calcularFatura(cartaoId);

        if (valorFatura <= 0) {
            throw new IllegalArgumentException("Não ha fatura em aberto.");
        }

        Conta conta = cartao.getConta();

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        if (conta.getSaldo() < valorFatura) {
            throw new IllegalArgumentException("Saldo insuficienta para pagar fatura.");
        }

        if (cartao.getLimiteDisponivel() == null) {
            cartao.setLimiteDisponivel(0.0);
        }

        conta.setSaldo(conta.getSaldo() - valorFatura);
        cartao.setLimiteDisponivel(cartao.getLimiteDisponivel() + valorFatura);

        List<CompraCartao> compras = compraCartaoRepository.findByCartaoId(cartaoId);

        compras.forEach((compra) -> {
            if ("APROVADA".equalsIgnoreCase(compra.getStatus())) {
                compra.setStatus("PAGA");
            }
        });

        transacaoService.registrar(
            conta, 
            TipoTransacao.PAGAMENTO,
            valorFatura,
            "Pagamento de fatura do cartão",
            "Cartão"
        );

        contaRepository.save(conta);
        cartaoRepository.save(cartao);
        compraCartaoRepository.saveAll(compras);

        return valorFatura;
    }

}
