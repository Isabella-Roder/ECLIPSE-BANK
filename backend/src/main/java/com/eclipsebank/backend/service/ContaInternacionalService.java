package com.eclipsebank.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eclipsebank.backend.enums.Moeda;
import com.eclipsebank.backend.enums.TipoTransacao;
import com.eclipsebank.backend.model.Conta;
import com.eclipsebank.backend.model.ContaInternacional;
import com.eclipsebank.backend.model.Usuario;
import com.eclipsebank.backend.repository.ContaInternacionalRepository;
import com.eclipsebank.backend.repository.ContaRepository;
import com.eclipsebank.backend.repository.UsuarioRepository;

@Service
public class ContaInternacionalService {
    
    private final ContaInternacionalRepository contaInternacionalRepository;
    private final UsuarioRepository usuarioRepository;
    private final ContaRepository contaRepository;
    private final TransacaoService transacaoService;

    public ContaInternacionalService(ContaInternacionalRepository contaInternacionalRepository, UsuarioRepository usuarioRepository, ContaRepository contaRepository, TransacaoService transacaoService) {
        this.contaInternacionalRepository = contaInternacionalRepository;
        this.usuarioRepository = usuarioRepository;
        this.contaRepository = contaRepository;
        this.transacaoService = transacaoService;
    }

    public List<ContaInternacional> listar() {
        return contaInternacionalRepository.findAll();
    }

    public List<ContaInternacional> listarPorUsuario(Long usuarioId) {
        return contaInternacionalRepository.findByUsuarioId(usuarioId);
    }

    public ContaInternacional buscarPorId(Long id) {
        return contaInternacionalRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Conta internacional nao encontrada."));
    }

    public void validarContaInternacional(ContaInternacional conta) {
        if (conta.getMoeda() == null) {
            throw new IllegalArgumentException("Moeda nao pode ser vazia.");
        } else if (conta.getNumero() == null || conta.getNumero().isBlank()) {
            throw new IllegalArgumentException("Numero nao pode ser vazio.");
        } else if (conta.getUsuario() == null || conta.getUsuario().getId() == null) {
            throw new IllegalArgumentException("Usuario nao pode ser vazio.");
        }
        
    }

    public ContaInternacional abrirConta(Long usuarioId, Moeda moeda) {
        if (moeda == null) {
            throw new IllegalArgumentException("Moeda nao pode ser vazia.");
        }

        if (moeda == Moeda.BRL) {
            throw new IllegalArgumentException("BRL ja usado na conta nacional.");
        }

        if (contaInternacionalRepository.existsByUsuarioIdAndMoeda(usuarioId, moeda)) {
            throw new IllegalArgumentException("Usuario ja possui conta nessa moeda.");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new IllegalArgumentException("Usuario nao encontrado."));

        ContaInternacional conta = new ContaInternacional();

        conta.setUsuario(usuario);
        conta.setMoeda(moeda);
        conta.setSaldo(0.0);
        conta.setStatus("ATIVA");
        conta.setNumero(gerarNumeroInternacional(moeda));

        return contaInternacionalRepository.save(conta);
    }

    private String gerarNumeroInternacional(Moeda moeda) {
        return "INT-" + moeda.name() + "-" + System.currentTimeMillis();
    }

    private double buscarCotacao(Moeda moeda) {
        return switch (moeda) {
            case USD -> 5.50;
            case EUR -> 6.00;
            case GBP -> 7.00;
            case BRL -> 1.00;
        };
    }

    @Transactional
    public ContaInternacional comprarMoeda(Long usuarioId, Moeda moeda, Double valor) {
        if (moeda == null) {
            throw new IllegalArgumentException("Moeda nao pode ser vazia.");
        }

        if (moeda == Moeda.BRL) {
            throw new IllegalArgumentException("Use conta nacional para BRL");
        }

        if (valor == null || valor <= 0) {
            throw new IllegalArgumentException("Valor precisa ser maior que zero.");
        }

        Conta contaNacional = contaRepository.findByUsuarioId(usuarioId)
            .orElseThrow(() -> new IllegalArgumentException("Conta nacional nao encontrada."));

        ContaInternacional contaInternacional = contaInternacionalRepository.findByUsuarioIdAndMoeda(usuarioId, moeda)
            .orElseThrow(() -> new IllegalArgumentException("Conta internacional nao encontrada."));

        double cotacao = buscarCotacao(moeda);
        double valorEmReais = valor * cotacao;

        if (contaNacional.getSaldo() < valorEmReais) {
            throw new IllegalArgumentException("Saldo insuficiente para comprar moeda.");
        }

        contaNacional.setSaldo(contaNacional.getSaldo() - valorEmReais);
        contaInternacional.setSaldo(contaInternacional.getSaldo() + valor);

        contaRepository.save(contaNacional);
        transacaoService.registrar(
            contaNacional,
            TipoTransacao.COMPRA_CAMBIO,
            valorEmReais,
            "Compra de " + valor + " " + moeda.name(),
            "Cambio"
        );

        return contaInternacionalRepository.save(contaInternacional);
    }

    @Transactional
    public ContaInternacional venderMoeda(Long usuarioId, Moeda moeda, Double valor) {
        if (moeda == null) {
            throw new IllegalArgumentException("Moeda nao pode ser vazia.");
        }

        if (moeda == Moeda.BRL) {
            throw new IllegalArgumentException("Use conta nacional para BRL");
        }

        if (valor == null || valor <= 0) {
            throw new IllegalArgumentException("Valor precisa ser maior que zero.");
        }

        Conta contaNacional = contaRepository.findByUsuarioId(usuarioId)
            .orElseThrow(() -> new IllegalArgumentException("Conta nacional nao encontrada."));

        ContaInternacional contaInternacional = contaInternacionalRepository.findByUsuarioIdAndMoeda(usuarioId, moeda)
            .orElseThrow(() -> new IllegalArgumentException("Conta internacional nao encotrada."));

        if (contaInternacional.getSaldo() < valor) {
            throw new IllegalArgumentException("Saldo internacional insuficiente.");
        }

        double cotacao = buscarCotacao(moeda);
        double valorEmReais = valor * cotacao;

        contaInternacional.setSaldo(contaInternacional.getSaldo() - valor);
        contaNacional.setSaldo(contaNacional.getSaldo() + valorEmReais);

        transacaoService.registrar(
            contaNacional,
            TipoTransacao.VENDA_CAMBIO,
            valorEmReais,
            "Venda de " + valor + " " + moeda.name(),
            "Cambio"
        );

        contaRepository.save(contaNacional);
        return contaInternacionalRepository.save(contaInternacional);
    }

}
