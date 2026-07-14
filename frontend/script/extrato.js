const API_URL = "http://localhost:8080";

const mensagemExtrato = document.getElementById("mensagem-extrato");
const tabelaExtrato = document.getElementById("tabela-extrato");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroDataInicio = document.getElementById("filtro-data-inicio");
const filtroDataFim = document.getElementById("filtro-data-fim");
const botaoLimparFiltros = document.getElementById("limpar-filtros");

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
let transacoesExtrato = [];

let contaIdAtual = null;

if (!usuarioLogado) {
    window.location.href = "login.html";
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "-";
    }

    return new Date(dataHora).toLocaleString("pt-BR");
}

function pegarData(dataHora) {
    if (!dataHora) {
        return "";
    }

    return dataHora.split("T")[0];
}

function preencherFiltro(select, valores, textoPadrao) {
    select.innerHTML = `<option value="">${textoPadrao}</option>`;

    valores.forEach((valor) => {
        const option = document.createElement("option");
        option.value = valor;
        option.textContent = valor;
        select.appendChild(option);
    });
}

function preencherFiltros(transacoes) {
    const tipos = [...new Set(transacoes.map((transacao) => transacao.tipo).filter(Boolean))];
    const categorias = [...new Set(transacoes.map((transacao) => transacao.categoria).filter(Boolean))];

    preencherFiltro(filtroTipo, tipos, "Todos os tipos");
    preencherFiltro(filtroCategoria, categorias, "Todas as categorias");
}

async function filtrarExtrato() {
    if (!contaIdAtual) {
        mensagemExtrato.textContent = "Conta ainda não carregada.";
        return;
    }

    const contaId = contaIdAtual;

    let url = `${API_URL}/contas/${contaId}/transacoes/filtro`;

    const params = new URLSearchParams();

    if (filtroTipo.value) params.append("tipo", filtroTipo.value);
    if (filtroCategoria.value) params.append("categoria", filtroCategoria.value);
    if (filtroDataInicio.value && filtroDataFim.value) {
        params.append("inicio", filtroDataInicio.value);
        params.append("fim", filtroDataFim.value);
    }

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    const resposta = await fetch(url);
    const transacoes = await resposta.json();
    renderizarExtrato(transacoes)
}

function ehEntrada(tipo) {
    return tipo === "RECEITA"
        || tipo === "DEPOSITO"
        || tipo === "VENDA_ATIVO"
        || tipo === "RESGATE_INVESTIMENTO";
}

function classeValor(tipo) {
    if (ehEntrada(tipo)) {
        return "valor-entrada";
    }

    return "valor-saida";
}

function renderizarExtrato(transacoesFiltradas) {

    tabelaExtrato.innerHTML = "";

    if (transacoesExtrato.length === 0) {
        mensagemExtrato.textContent = "Essa conta ainda nao tem extrato.";
        return;
    }

    if (transacoesFiltradas.length === 0) {
        mensagemExtrato.textContent = "Nenhuma transacao encontrada com esses filtros.";
        return;
    }

    mensagemExtrato.textContent = `${transacoesFiltradas.length} movimentacao(oes) encontrada(s).`;

    transacoesFiltradas.forEach((extrato) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${formatarDataHora(extrato.dataHora)}</td>
            <td>${extrato.descricao}</td>
            <td>${extrato.categoria}</td>
            <td><span class="selo-tipo">${extrato.tipo}</span></td>
            <td class="${classeValor(extrato.tipo)}">${formatarMoeda(extrato.valor)}</td>
        `;
        tabelaExtrato.appendChild(linha);
    });
}

async function carregarContaUsuario() {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/conta`);

    if (!resposta.ok) {
        mensagemExtrato.textContent = "Conta nao encontrada para esse usuario.";
        return;
    }

    const conta = await resposta.json();
    contaIdAtual = conta.id;
    carregarExtrato(conta.id);
}

async function carregarExtrato(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/transacoes`);

    if (!resposta.ok) {
        mensagemExtrato.textContent = "Erro ao buscar extrato.";
        return;
    }

    transacoesExtrato = await resposta.json();
    preencherFiltros(transacoesExtrato);
    renderizarExtrato(transacoesExtrato);
}

filtroTipo.addEventListener("change", filtrarExtrato);
filtroCategoria.addEventListener("change", filtrarExtrato);
filtroDataInicio.addEventListener("change", filtrarExtrato);
filtroDataFim.addEventListener("change", filtrarExtrato);

botaoLimparFiltros.addEventListener("click", () => {
    filtroTipo.value = "";
    filtroCategoria.value = "";
    filtroDataInicio.value = "";
    filtroDataFim.value = "";
    filtrarExtrato();
});

carregarContaUsuario();
