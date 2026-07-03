const API_URL = "http://localhost:8080";

const saldoAtual = document.getElementById("saldo-atual");
const economia = document.getElementById("economia");
const totalContas = document.getElementById("total-contas");
const totalUsuarios = document.getElementById("total-usuarios");
const tabelaTransacoes = document.getElementById("tabela-transacoes");
const formTransacao = document.getElementById("form-transacao");
const mensagem = document.getElementById("mensagem");
const categoriaSelect = document.getElementById("categoria");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroCategoria = document.getElementById("filtro-categoria");
const inputValor = document.getElementById("valor");

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

function mascararDinheiro(valor) {
    valor = valor.replace(/\D/g, "");

    const numero = Number(valor) / 100;

    return formatarMoeda(numero);
}

function converterDinheiroParaNumero(valor) {
    valor = valor.replace(/\D/g, "");
    return Number(valor) / 100;
}

inputValor.addEventListener("input", () => {
    inputValor.value = mascararDinheiro(inputValor.value);
});

async function carregarDashboard() {
    const resposta = await fetch(`${API_URL}/dashboard`);
    const dados = await resposta.json();

    saldoAtual.textContent = formatarMoeda(dados.saldoAtual);
    economia.textContent = formatarMoeda(dados.economia);
    totalContas.textContent = dados.totalContas;
    totalUsuarios.textContent = dados.totalUsuarios;
}

async function carregarTransacoes() {
    const tipoSelecionado = filtroTipo.value
    const categoriaSelecionada = filtroCategoria.value

    let url = `${API_URL}/transacoes`;

    if (categoriaSelecionada !== "TODAS") {
        url = `${API_URL}/transacoes/categoria/${categoriaSelecionada}`;
    } else if (tipoSelecionado !== "TODOS") {
        url = `${API_URL}/transacoes/tipo/${tipoSelecionado}`;
    }

    const resposta = await fetch(url)
    const transacoes = await resposta.json();

    tabelaTransacoes.innerHTML = "";

    transacoes.forEach((transacao) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${transacao.descricao}</td>
            <td>${transacao.categoria}</td>
            <td>${transacao.tipo}</td>
            <td>${formatarMoeda(transacao.valor)}</td>
        `;

        tabelaTransacoes.appendChild(linha);

        
    });

    
}

async function carregarCategorias() {
    const resposta = await fetch(`${API_URL}/categorias`);
    const categorias = await resposta.json();

    categorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        categoriaSelect.appendChild(option);
        
        const optionFiltro = document.createElement("option");
        optionFiltro.value = categoria;
        optionFiltro.textContent = categoria;
        filtroCategoria.appendChild(optionFiltro);
    });
}

formTransacao.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const transacao = {
        descricao: document.getElementById("descricao").value,
        valor: converterDinheiroParaNumero(document.getElementById("valor").value),
        tipo: document.getElementById("tipo").value,
        categoria: document.getElementById("categoria").value,
    };

    const resposta = await fetch(`${API_URL}/transacoes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transacao)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagem.textContent = erro.erro;
        return;
    }

    mensagem.textContent = "Transação cadastrada com sucesso!";
    formTransacao.reset();

    await carregarDashboard();
    await carregarTransacoes();
});

filtroTipo.addEventListener("change", carregarTransacoes);
filtroCategoria.addEventListener("change", carregarTransacoes);

carregarDashboard();
carregarTransacoes();
carregarCategorias();
