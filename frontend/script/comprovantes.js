const API_URL = "http://localhost:8080";

const mensagemComprovante = document.getElementById("mensagem-comprovantes");
const tabelaComprovantes = document.getElementById("tabela-comprovantes");

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "index.html";
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

async function carregarContaUsuario() {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/conta`);

    if (!resposta.ok) {
        mensagemComprovante.textContent = "Conta não encontrada para esse usuario";
        return;
    }

    const conta = await resposta.json();
    carregarConta(conta.id);
}

async function carregarConta(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/comprovantes`);

    if (!resposta.ok) {
        mensagemComprovante.textContent = "Erro ao buscar o comprovante";
        return;
    }

    const comprovante = await resposta.json();
    carregarComprovantes(comprovante);
}

async function carregarComprovantes(comprovantes) {
    tabelaComprovantes.innerHTML = "";

    if (comprovantes.length === 0) {
        mensagemComprovante.textContent = "Essa conta ainda não possui comprovantes";
        return
    }

    mensagemComprovante.textContent = `${comprovantes.length} comprovante(s) encontrado(s).`;

    comprovantes.forEach(comprovante => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
        <td>${formatarDataHora(comprovante.dataHora)}</td>
        <td><span class="selo-tipo">${comprovante.metodo}</span></td>
        <td>${comprovante.destino}</td>
        <td>${comprovante.status}</td>
        <td>${formatarMoeda(comprovante.valor)}</td>
        <td>
            <a class="botao-secundario" href="comprovante.html?id=${comprovante.id}">
                Ver
            </a>
        </td>
        `;

        tabelaComprovantes.appendChild(linha);
    });
}

carregarContaUsuario();