const API_URL = "http://localhost:8080";

const saldoAtual = document.getElementById("saldo-atual");
const entradasMes = document.getElementById("entradas-mes");
const saidasMes = document.getElementById("saidas-mes");
const economia = document.getElementById("economia");
const tabelaTransacoes = document.getElementById("tabela-transacoes");
const formTransacao = document.getElementById("form-transacao");
const mensagem = document.getElementById("mensagem");
const categoriaSelect = document.getElementById("categoria");
const filtroTipo = document.getElementById("filtro-tipo");

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

async function carregarDashboard() {
    const resposta = await fetch(`${API_URL}/dashboard`);
    const dados = await resposta.json();

    saldoAtual.textContent = formatarMoeda(dados.saldoAtual);
    entradasMes.textContent = formatarMoeda(dados.entradasMes);
    saidasMes.textContent = formatarMoeda(dados.saidasMes);
    economia.textContent = formatarMoeda(dados.economia);
}

async function carregarTransacoes() {
    const tipoSelecionado = filtroTipo.value

    let url = `${API_URL}/transacoes`;

    if (tipoSelecionado !== "TODOS") {
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
    });
}

formTransacao.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const transacao = {
        descricao: document.getElementById("descricao").value,
        valor: Number(document.getElementById("valor").value),
        tipo: document.getElementById("tipo").value,
        categoria: document.getElementById("categoria").value,
        data: document.getElementById("data").value
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

carregarDashboard();
carregarTransacoes();
carregarCategorias();