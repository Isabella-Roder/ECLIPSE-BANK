const totalCarteiraAtivo = document.getElementById("total-carteira-ativos");
const mensagemCarteiraAtivo = document.getElementById("mensagem-carteira-ativos");
const ativosTotalInvestidos = document.getElementById("ativos-total-investido");
const ativosResultadoTotal = document.getElementById("ativos-resultado-total");
const ativosQuantidade = document.getElementById("ativos-quantidade");
const ativosAcoes = document.getElementById("ativos-acoes");
const ativosFiis = document.getElementById("ativos-fiis");
const listaCarteiraAtivos = document.getElementById("lista-carteira-ativos");

const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

let contaAtual = null;

async function carregarConta() {
    contaAtual = await buscarContaDoUsuario(usuarioLogado.id);
}

async function carregarAtivos() {
    try {
        await carregarConta();

        const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/ativos`);

        if (!resposta.ok) {
            mensagemCarteiraAtivo.textContent = "Não foi possivel carregar sua carteira.";
            return;
        }

        const ativos = await resposta.json();

        renderizerResumo(ativos);
        await renderizarTabela(ativos);
        mensagemCarteiraAtivo.textContent = "Carteira carregada.";
    } catch (erro) {
        mensagemCarteiraAtivo.textContent = "Erro ao conectar com o servidor.";
    }
}

function renderizerResumo(ativos) {
    let total = 0;
    let acoes = 0;
    let fiis = 0;

    ativos.forEach((ativo) => {
        total += ativo.valorTotal || 0;

        if (ativo.tipo === "ACAO") {
            acoes ++;
        }

        if (ativo.tipo === "FII") {
            fiis ++;
        }
    });

    totalCarteiraAtivo.textContent = formatarMoeda(total);
    ativosTotalInvestidos.textContent = formatarMoeda(total);
    ativosQuantidade.textContent = ativos.length;
    ativosAcoes.textContent = acoes;
    ativosFiis.textContent = fiis;
}

async function renderizarTabela(ativos) {
    listaCarteiraAtivos.innerHTML = "";

    if (ativos.length === 0) {
        listaCarteiraAtivos.innerHTML = `
            <tr>
                <td colspan="10">Nenhum ativo comprado ainda.</td>
            </tr>
        `;
        return;
    }

    let resultadoTotal = 0;

    for (const ativo of ativos) {
        const cotacao = await buscarCotacaoAtual(ativo.ticker);

        const precoAtual = cotacao?.precoAtual || ativo.precoMedio;
        const valorAtual = precoAtual * ativo.quantidade;
        const resultado = valorAtual - ativo.valorTotal;
        resultadoTotal += resultado;
        const classeResultado = resultado >= 0 ? "valor-entrada" : "valor-saida";

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${formatarDataHora(ativo.dataCompra)}</td>
            <td>${ativo.ticker}</td>
            <td>${ativo.nome}</td>
            <td><span class="selo-tipo">${ativo.tipo}</span></td>
            <td>${ativo.quantidade}</td>
            <td>${formatarMoeda(ativo.precoMedio)}</td>
            <td>${formatarMoeda(ativo.valorTotal)}</td>
            <td>${formatarMoeda(precoAtual)}</td>
            <td class="${classeResultado}">${formatarMoeda(resultado)}</td>
            <td>
                <button class="btn-secundario" onclick="venderAtivo(${ativo.id}, ${ativo.quantidade})">Vender Ativo</button>
            </td>
        `;

        listaCarteiraAtivos.appendChild(linha);
    }

    ativosResultadoTotal.textContent = formatarMoeda(resultadoTotal);
    ativosResultadoTotal.className = resultadoTotal >= 0 ? "valor-entrada" : "valor-saida";
}

async function buscarCotacaoAtual(ticker) {
    try {
        const resposta = await fetch(`${API_URL}/mercado/ativos/${ticker}`);

        if (!resposta.ok) {
            return null;
        }

        return await resposta.json();
    } catch (erro) {
        return null;
    }
}

async function venderAtivo(ativoId, quantidadeDisponivel) {
    const quantidade = Number(prompt(`Quantidade para vender (max: ${quantidadeDisponivel})`));

    if (!quantidade || quantidade <= 0) {
        mensagemCarteiraAtivo.textContent = "Informe uma quantidade valida.";
        return;
    }

    if (quantidade > quantidadeDisponivel) {
        mensagemCarteiraAtivo.textContent = "Quantidade maior do que você possui.";
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/ativos/${ativoId}/vender`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quantidade })
        });

        if (!resposta.ok) {
            mensagemCarteiraAtivo.textContent = "Não foi possivel vender o ativo.";
            return;
        }

        mensagemCarteiraAtivo.textContent = "Venda realizada com sucesso.";
        await carregarAtivos();
    } catch (erro) {
        mensagemCarteiraAtivo.textContent = "Erro ao conectar ao servidor";
    }
}

if (!deveRedirecionar) {
    carregarAtivos();
}
