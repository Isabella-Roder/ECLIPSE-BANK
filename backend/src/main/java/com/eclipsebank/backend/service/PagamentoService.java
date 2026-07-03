package com.eclipsebank.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eclipsebank.backend.dto.PagamentoRequest;
import com.eclipsebank.backend.dto.TransferenciaPorNumeroRequest;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.model.MetodoPagamento;
import com.eclipsebank.backend.model.Pagamento;
import com.eclipsebank.backend.repository.PagamentoRepository;
import com.eclipsebank.backend.repository.ContaRepository;

@Service
public class PagamentoService {
    
    private PagamentoRepository pagamentoRepository;
    private ContaRepository contaRepository;
    private ContaService contaService;

    public PagamentoService(PagamentoRepository pagamentoRepository, ContaRepository contaRepository, ContaService contaService) {
        this.pagamentoRepository = pagamentoRepository;
        this.contaRepository = contaRepository;
        this.contaService = contaService;
    }

    public List<Pagamento> listar() {
        return pagamentoRepository.findAll();
    }

    public Pagamento pagar(PagamentoRequest request) {

        if (request.getValor() == null || request.getValor() <= 0) {
            throw new IllegalArgumentException("Valor de pagamento deve ser maior que zero.");
        }

        if (request.getContaOrigem() == null) {
            throw new IllegalArgumentException("Conta origem obrigatória");
        }

        if (request.getMetodo() == null) {
            throw new IllegalArgumentException("Metodo de pagamento obrigatório");
        }

        Conta contaOrigem = contaRepository.findById(request.getContaOrigem()).orElseThrow(() -> new IllegalArgumentException("Conta de origem não encontrada"));

        if (contaOrigem.getSaldo() == null) {
            contaOrigem.setSaldo(0.0);
        }

        if (request.getDestino() == null || request.getDestino().isBlank()) {
            throw new IllegalArgumentException("Destino do pagamento obrigatório");
        }

        if (request.getMetodo() == MetodoPagamento.TRANSFERENCIA) {

            TransferenciaPorNumeroRequest transferencia = new TransferenciaPorNumeroRequest(
                request.getContaOrigem(),
                Integer.valueOf(request.getDestino()),
                request.getValor()
            );

            contaService.TransferirPorNumero(transferencia);

            Pagamento pagamento = new Pagamento(
                request.getMetodo(),
                request.getValor(),
                request.getDestino(),
                LocalDateTime.now(),
                "CONCLUIDO",
                contaOrigem,
                "EB-" + System.currentTimeMillis()
            );

            return pagamentoRepository.save(pagamento);
        
        } else{ 
            throw new IllegalArgumentException("Metodo de pagamento ainda não implementado.");
        }

    }

}
