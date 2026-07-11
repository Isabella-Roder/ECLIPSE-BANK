const tituloExtratoEmpresa = document.getElementById("titulo-extrato-empresa");
const saldoExtratoEmpresa = document.getElementById("saldo-extrato-empresa");
const mensagemExtratoEmpresa = document.getElementById("mensagem-extrato-empresa");
const nomeExtratoEmpresa = document.getElementById("nome-extrato-empresa");
const numeroExtratoEmpresa = document.getElementById("numero-extrato-empresa");
const pixExtratoEmpresa = document.getElementById("pix-extrato-empresa");
const totalExtratoEmpresa = document.getElementById("total-extrato-empresa");

const tabelaExtratoEmpresa = document.getElementById("tabela-extrato-empresa");
const filtroTipoEmpresa = document.getElementById("filtro-tipo-empresa");
const filtroCategoriaEmpresa = document.getElementById("filtro-categoria-empresa");
const filtroDataInicioEmpresa = document.getElementById("filtro-data-inicio-empresa");
const filtroDataFimEmpresa = document.getElementById("filtro-data-fim-empresa");
const botaoLimparFiltrosEmpresa = document.getElementById("limpar-filtros-empresa");

const empresaLogada = pegarEmpresaLogada();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(empresaLogada);

let contaEmpresaAtual = null;
let transacoesEmpresa = [];

function ehEntrada(tipo) {
    return tipo === "RECEITA" || tipo === "DEPOSITO";
}

function classeValor(tipo) {
    return ehEntrada(tipo) ? "valor-entrada" : "valor-saida";
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

    preencherFiltro(filtroTipoEmpresa, tipos, "Todos os tipos");
    preencherFiltro(filtroCategoriaEmpresa, categorias, "Todas as categorias");
}

function renderizarExtratoEmpresa(transacoesFiltradas) {
    tabelaExtratoEmpresa.innerHTML = "";

    if (transacoesEmpresa.length === 0) {
        mensagemExtratoEmpresa.textContent = "Essa conta empresarial ainda nao tem extrato.";
        totalExtratoEmpresa.textContent = "0";
        return;
    }

    if (transacoesFiltradas.length === 0) {
        mensagemExtratoEmpresa.textContent = "Nenhuma movimentacao encontrada com esses filtros.";
        totalExtratoEmpresa.textContent = "0";
        return;
    }

    mensagemExtratoEmpresa.textContent = `${transacoesFiltradas.length} movimentacao(oes) encontrada(s).`;
    totalExtratoEmpresa.textContent = transacoesFiltradas.length;

    transacoesFiltradas.forEach((transacao) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${formatarDataHora(transacao.dataHora)}</td>
            <td>${transacao.descricao || "-"}</td>
            <td>${transacao.categoria || "-"}</td>
            <td><span class="selo-tipo">${transacao.tipo || "-"}</span></td>
            <td class="${classeValor(transacao.tipo)}">${formatarMoeda(transacao.valor)}</td>
        `;

        tabelaExtratoEmpresa.appendChild(linha);
    });
}

async function carregarExtratoEmpresa(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/transacoes`);

    if (!resposta.ok) {
        mensagemExtratoEmpresa.textContent = "Nao foi possivel buscar o extrato empresarial.";
        return;
    }

    transacoesEmpresa = await resposta.json();

    preencherFiltros(transacoesEmpresa);
    renderizarExtratoEmpresa(transacoesEmpresa);
}

async function carregarContaEmpresaParaExtrato() {
    try {
        const conta = await buscarContaDaEmpresa(empresaLogada.id);

        contaEmpresaAtual = conta;

        tituloExtratoEmpresa.textContent = `Extrato PJ - ${empresaLogada.nomeFantasia}`;
        saldoExtratoEmpresa.textContent = formatarMoeda(conta.saldo);
        nomeExtratoEmpresa.textContent = empresaLogada.nomeFantasia || "-";
        numeroExtratoEmpresa.textContent = conta.numero || "-";
        pixExtratoEmpresa.textContent = conta.chavePix || "-";

        await carregarExtratoEmpresa(conta.id);
    } catch (erro) {
        mensagemExtratoEmpresa.textContent = "Nao foi possivel carregar a conta empresarial.";
    }
}

async function filtrarExtratoEmpresa() {
    if (!contaEmpresaAtual) {
        mensagemExtratoEmpresa.textContent = "Conta empresarial ainda nao carregou.";
        return;
    }

    let url = `${API_URL}/contas/${contaEmpresaAtual.id}/transacoes/filtro`;
    const params = new URLSearchParams();

    if (filtroTipoEmpresa.value) {
        params.append("tipo", filtroTipoEmpresa.value);
    }

    if (filtroCategoriaEmpresa.value) {
        params.append("categoria", filtroCategoriaEmpresa.value);
    }

    if (filtroDataInicioEmpresa.value && filtroDataFimEmpresa.value) {
        params.append("inicio", filtroDataInicioEmpresa.value);
        params.append("fim", filtroDataFimEmpresa.value);
    }

    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    const resposta = await fetch(url);

    if (!resposta.ok) {
        mensagemExtratoEmpresa.textContent = "Nao foi possivel filtrar o extrato.";
        return;
    }

    const transacoesFiltradas = await resposta.json();
    renderizarExtratoEmpresa(transacoesFiltradas);
}

filtroTipoEmpresa.addEventListener("change", filtrarExtratoEmpresa);
filtroCategoriaEmpresa.addEventListener("change", filtrarExtratoEmpresa);
filtroDataInicioEmpresa.addEventListener("change", filtrarExtratoEmpresa);
filtroDataFimEmpresa.addEventListener("change", filtrarExtratoEmpresa);

botaoLimparFiltrosEmpresa.addEventListener("click", () => {
    filtroTipoEmpresa.value = "";
    filtroCategoriaEmpresa.value = "";
    filtroDataInicioEmpresa.value = "";
    filtroDataFimEmpresa.value = "";

    renderizarExtratoEmpresa(transacoesEmpresa);
});

if (!deveRedirecionar) {
    carregarContaEmpresaParaExtrato();
}
