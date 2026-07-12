package com.eclipsebank.backend.dto;

import com.eclipsebank.backend.enums.PerfilInvestidor;
import com.eclipsebank.backend.enums.ProdutoInvestimento;
import com.eclipsebank.backend.enums.TipoInvestimento;

public class ProdutoInvestimentoInfo {
    
    private String nome;
    private ProdutoInvestimento produto;
    private TipoInvestimento tipo;
    private PerfilInvestidor perfilInvestidor;
    private String risco;
    private String rentabilidade;
    private String descricao;
    private Double taxaAnual;

    public ProdutoInvestimentoInfo() {

    }

    public ProdutoInvestimentoInfo(
        String nome,
        ProdutoInvestimento produto,
        TipoInvestimento tipo,
        PerfilInvestidor perfilInvestidor,
        String risco,
        String rentabilidade,
        String descricao,
        Double taxaAnual
    ) {
        this.nome = nome;
        this.produto = produto;
        this.tipo = tipo;
        this.perfilInvestidor = perfilInvestidor;
        this.risco = risco;
        this.rentabilidade = rentabilidade;
        this.descricao = descricao;
        this.taxaAnual = taxaAnual;
    }

    public String getNome() {
        return nome;
    }

    public ProdutoInvestimento getProduto() {
        return produto;
    }

    public TipoInvestimento getTipo() {
        return tipo;
    }

    public PerfilInvestidor getPerfilInvestidor() {
        return perfilInvestidor;
    }

    public String getRisco() {
        return risco;
    }

    public String getRentabilidade() {
        return rentabilidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public Double getTaxaAnual() {
        return taxaAnual;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setProduto(ProdutoInvestimento produto) {
        this.produto = produto;
    }

    public void setTipo(TipoInvestimento tipo) {
        this.tipo = tipo;
    }

    public void setPerfilInvestidor(PerfilInvestidor perfilInvestidor) {
        this.perfilInvestidor = perfilInvestidor;
    }

    public void setRisco(String risco) {
        this.risco = risco;
    }

    public void setRentabilidade(String rentabilidade) {
        this.rentabilidade = rentabilidade;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setTaxaAnual(Double taxaAnual) {
        this.taxaAnual = taxaAnual;
    }

}
