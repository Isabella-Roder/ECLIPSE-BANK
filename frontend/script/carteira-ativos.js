const totalCarteiraAtivo = document.getElementById("total-carteira-ativos");
const mensagemCarteiraAtivo = document.getElementById("mensagem-carteira-ativos");
const ativosTotalInvestidos = document.getElementById("ativos-total-investido");
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
        renderizarTabela(ativos);
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

function renderizarTabela(ativos) {
    listaCarteiraAtivos.innerHTML = "";

    if (ativos.length === 0) {
        listaCarteiraAtivos.innerHTML = `
            <tr>
                <td colspan="7">Nenhum ativo comprado ainda.</td>
            </tr>
        `;
        return;
    }

    ativos.forEach((ativo) => {
        const linha = document.createElement("tr");
            
        linha.innerHTML = `
            <td>${formatarDataHora(ativo.dataCompra)}</td>
            <td>${ativo.ticker}</td>
            <td>${ativo.nome}</td>
            <td><span class="selo-tipo">${ativo.tipo}</span></td>
            <td>${ativo.quantidade}</td>
            <td>${formatarMoeda(ativo.precoMedio)}</td>
            <td>${formatarMoeda(ativo.valorTotal)}</td>
        `;
        listaCarteiraAtivos.appendChild(linha);
    });
}

if (!deveRedirecionar) {
    carregarAtivos();
}