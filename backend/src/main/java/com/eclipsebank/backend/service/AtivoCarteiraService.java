package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.dto.AtivoMercadoInfo;
import com.eclipsebank.backend.enums.TipoTransacao;
import com.eclipsebank.backend.model.AtivoCarteira;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.repository.AtivoCarteiraRepository;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.service.TransacaoService;

@Service
public class AtivoCarteiraService {

    private AtivoCarteiraRepository ativoCarteiraRepository;
    private AtivoMercadoService ativoMercadoService;
    private ContaRepository contaRepository;
    private TransacaoService transacaoService;

    public AtivoCarteiraService(AtivoCarteiraRepository ativoCarteiraRepository, AtivoMercadoService ativoMercadoService, ContaRepository contaRepository, TransacaoService transacaoService) {
        this.ativoCarteiraRepository = ativoCarteiraRepository;
        this.ativoMercadoService = ativoMercadoService;
        this.contaRepository = contaRepository;
        this.transacaoService = transacaoService;
    }

    public List<AtivoCarteira> listarPorConta(Long contaId) {
        return ativoCarteiraRepository.findByContaId(contaId);
    }
    
    public AtivoCarteira comprar(Long contaId, AtivoCarteira ativoCarteira) {
        Conta conta = contaRepository.findById(contaId).orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));

        if (ativoCarteira.getQuantidade() == null || ativoCarteira.getQuantidade() <= 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior que zero.");
        }

        if (ativoCarteira.getTicker() == null || ativoCarteira.getTicker().isBlank()) {
            throw new IllegalArgumentException("Ticker obrigatório.");
        }
        

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        var ativoMercado = ativoMercadoService.buscarPorTicker(ativoCarteira.getTicker());

        if (ativoMercado.getPrecoAtual() == null || ativoMercado.getPrecoAtual() <= 0) {
            throw new IllegalArgumentException("Preço do ativo indisponivel");
        }

        double precoAtual = ativoMercado.getPrecoAtual();
        double valorTotal = precoAtual * ativoCarteira.getQuantidade();

        if (conta.getSaldo() < valorTotal) {
            throw new IllegalArgumentException("Saldo insuficiente para comprar ativo.");
        }

        conta.setSaldo(conta.getSaldo() - valorTotal);

        transacaoService.registrar(
            conta,
            TipoTransacao.COMPRA_ATIVO,
            valorTotal,
            "Compra de " + ativoCarteira.getQuantidade() + " " + ativoMercado.getTicker(),
            "Investimentos"
        );

        ativoCarteira.setTicker(ativoMercado.getTicker());
        ativoCarteira.setNome(ativoMercado.getNome());
        ativoCarteira.setTipo(ativoMercado.getTipo());
        ativoCarteira.setPrecoMedio(precoAtual);
        ativoCarteira.setValorTotal(valorTotal);
        ativoCarteira.setDataCompra(LocalDateTime.now());
        ativoCarteira.setConta(conta);

        contaRepository.save(conta);
        return ativoCarteiraRepository.save(ativoCarteira);
    }

    public AtivoCarteira vender(Long ativoId, Integer quantidade) {
        AtivoCarteira ativo = ativoCarteiraRepository.findById(ativoId).orElseThrow(() -> new IllegalArgumentException("Ativo não encontrado."));

        if (quantidade == null || quantidade <= 0) {
            throw new IllegalArgumentException("Quantidade tem que ser maior que zero.");
        }

        if (quantidade > ativo.getQuantidade()) {
            throw new IllegalArgumentException("Quantidade vendida não pode ser maior doque a quantidade que possui.");
        }

        AtivoMercadoInfo cotacao = ativoMercadoService.buscarPorTicker(ativo.getTicker());

        if (cotacao.getPrecoAtual() == null || cotacao.getPrecoAtual() <= 0) {
            throw new IllegalArgumentException("Preço do ativo indisponivel.");
        }

        Double valorVenda = cotacao.getPrecoAtual() * quantidade;

        Conta conta = ativo.getConta();

        if (conta.getSaldo() == null) {
            conta.setSaldo(0.0);
        }

        conta.setSaldo(conta.getSaldo() + valorVenda);

        transacaoService.registrar(
            conta,
            TipoTransacao.VENDA_ATIVO,
            valorVenda,
            "Venda de " + quantidade + " " + ativo.getTicker(),
            "Investimentos"
        );

        Integer novaQuantidade = ativo.getQuantidade() - quantidade;

        contaRepository.save(conta);

        if (novaQuantidade == 0) {
            ativoCarteiraRepository.delete(ativo);
            return ativo;
        }

        ativo.setQuantidade(novaQuantidade);
        ativo.setValorTotal(ativo.getPrecoMedio() * novaQuantidade);

        return ativoCarteiraRepository.save(ativo);
    }
}
