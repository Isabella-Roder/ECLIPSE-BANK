const saldoInvestimentos = document.getElementById("saldo-investimentos");
const mensagemInvestimentos = document.getElementById("mensagem-investimentos");

const totalInvestido = document.getElementById("total-investido");
const rendimentoEstimado = document.getElementById("rendimento-estimado");
const quantidadeInvestimentos = document.getElementById("quantidade-investimentos");
const perfilInvestidorResumo = document.getElementById("perfil-investidor-resumo");

const listaInvestimento = document.getElementById("lista-investimentos");

const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

let contaAtual = null;

function mascararDinheiro(valor) {
    const somenteNumeros = valor.replace(/\D/g, "");
    const numero = Number(somenteNumeros) / 100;

    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function converterDinheiroParaNumero(valor) {
    const somenteNumeros = valor.replace(/\D/g, "");
    return Number(somenteNumeros) / 100;
}

function abrirDetalheInvestimento(botao) {
    const produtoSelecionado = {
        produto: botao.dataset.produto,
        tipo: botao.dataset.tipo,
        perfilInvestidor: botao.dataset.perfil,
        nome: botao.dataset.nome,
        rentabilidade: botao.dataset.rentabilidade,
        risco: botao.dataset.risco,
        descricao: botao.dataset.descricao
    };

    localStorage.setItem("produtoInvestimentoSelecionado", JSON.stringify(produtoSelecionado));
    window.location.href = "investimento-detalhe.html";
}

async function carregarConta() {
    try {
        contaAtual = await buscarContaDoUsuario(usuarioLogado.id);

        saldoInvestimentos.textContent = formatarMoeda(contaAtual.saldo);
        mensagemInvestimentos.textContent = "Carteira de investimentos carregada.";

        await carregarInvestimentos();
    } catch (erro) {
        mensagemInvestimentos.textContent = "Nao foi possivel carregar sua conta.";
    }
}

async function carregarInvestimentos() {
    try {
        const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/investimentos`);

        if (!resposta.ok) {
            mensagemInvestimentos.textContent = "Nao foi possivel carregar investimentos.";
            listaInvestimento.innerHTML = `
                <tr>
                    <td colspan="8">Nao foi possivel carregar investimentos.</td>
                </tr>
            `;
            return;
        }

        const investimentos = await resposta.json();
        renderizarInvestimentos(investimentos);
    } catch (erro) {
        mensagemInvestimentos.textContent = "Erro ao conectar com o servidor";
        listaInvestimento.innerHTML = `
            <tr>
                <td colspan="8">Erro ao conectar com o servidor.</td>
            </tr>
        `;
    }
}

async function carregarProdutosInvestimento() {
    const resposta = await fetch(`${API_URL}/produtos-investimento`);
    const produtos = await resposta.json();

    renderizarProdutosInvestimento(produtos);
}

function renderizarProdutosInvestimento(produtos) {
    const listaProdutos = document.getElementById("lista-produtos-investimento");
    listaProdutos.innerHTML = "";

    produtos.forEach((produto) => {
        const card = document.createElement("article");
        card.className = "card produto-investimento";

        card.innerHTML = `
            <div>
                <span class="selo-status">${produto.risco} risco</span>
                <h4>${produto.nome}</h4>
                <p>${produto.descricao}</p>
            </div>

            <div class="produto-investimento-info">
                <span>Rendimento estimado</span>
                <strong>${produto.rentabilidade}</strong>
            </div>

            <button type="button" class="botao-investir-produto">
                Investir
            </button>
        `;

        const botao = card.querySelector("button");

        botao.addEventListener("click", () => {
            localStorage.setItem("produtoInvestimentoSelecionado", JSON.stringify(produto));
            window.location.href = "investimento-detalhe.html";
        });

        listaProdutos.appendChild(card);
    })
}

function renderizarInvestimentos(investimentos) {
    listaInvestimento.innerHTML = "";

    if (investimentos.length === 0) {
        listaInvestimento.innerHTML = `
            <tr>
                <td colspan="8">Nenhum investimento encontrado.</td>
            </tr>
        `;

        totalInvestido.textContent = formatarMoeda(0);
        rendimentoEstimado.textContent = formatarMoeda(0);
        quantidadeInvestimentos.textContent = "0";
        perfilInvestidorResumo.textContent = "-";
        return;
    }

    let somaInvestido = 0;
    let somaRendimento = 0;
    let quantidadeAtivos = 0;

    investimentos.forEach((investimento) => {
        if (investimento.status !== "RESGATADO") {
            somaInvestido += investimento.valorAplicado || 0;
            somaRendimento += investimento.rendimentoEstimado || 0;
            quantidadeAtivos++;
        }

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${formatarDataHora(investimento.dataAplicacao)}</td>
            <td>${investimento.produto}</td>
            <td>${investimento.tipo}</td>
            <td>${investimento.perfilInvestidor}</td>
            <td>${formatarMoeda(investimento.valorAplicado)}</td>
            <td>${formatarMoeda(investimento.rendimentoEstimado)}</td>
            <td>${investimento.status || "ATIVO"}</td>
            <td>
                ${
                    investimento.status === "RESGATADO"
                        ? "Ja resgatado"
                        : `<button type="button" onclick="resgatarInvestimento(${investimento.id})">Resgatar</button>`
                }
            </td>
        `;

        listaInvestimento.appendChild(linha);
    });

    totalInvestido.textContent = formatarMoeda(somaInvestido);
    rendimentoEstimado.textContent = formatarMoeda(somaRendimento);
    quantidadeInvestimentos.textContent = quantidadeAtivos;
    perfilInvestidorResumo.textContent = investimentos[0].perfilInvestidor || "-";
}

async function resgatarInvestimento(investimentoId) {
    try {
        const resposta = await fetch(`${API_URL}/investimentos/${investimentoId}/resgatar`, {
            method: "POST"
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            mensagemInvestimentos.textContent = erro.erro || "Erro ao resgatar investimento.";
            return;
        }

        mensagemInvestimentos.textContent = "Investimento resgatado com sucesso";
        await carregarConta();
    } catch (erro) {
        mensagemInvestimentos.textContent = "Erro ao conectar com o servidor";
    }
}

document.querySelectorAll(".botao-investir-produto").forEach((botao) => {
    botao.addEventListener("click", () => {
        abrirDetalheInvestimento(botao);
    });
});

if (!deveRedirecionar) {
    carregarConta();
    carregarProdutosInvestimento();
}
