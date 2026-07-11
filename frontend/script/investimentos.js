const saldoInvestimentos = document.getElementById("saldo-investimentos");
const mensagemInvestimentos = document.getElementById("mensagem-investimentos");

const totalInvestido = document.getElementById("total-investido");
const rendimentoEstimado = document.getElementById("rendimento-estimado");
const quantidadeInvestimentos = document.getElementById("quantidade-investimentos");
const perfilInvestidorResumo = document.getElementById("perfil-investidor-resumo");

const formInvestimento = document.getElementById("form-investimento");
const listaInvestimento = document.getElementById("lista-investimentos");
const inputValorAplicado = document.getElementById("valorAplicado");

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

async function carregarConta() {
    try {
        contaAtual = await buscarContaDoUsuario(usuarioLogado.id);

        saldoInvestimentos.textContent = formatarMoeda(contaAtual.saldo);
        mensagemInvestimentos.textContent = "Carteira de investimentos carregada.";

        await carregarInvestimentos();
    } catch (erro) {
        mensagemInvestimentos.textContent = "Não foi possivel carregar sua conta.";
    }
}

async function carregarInvestimentos() {
    try {
        const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/investimentos`);

        if (!resposta.ok) {
            mensagemInvestimentos.textContent = "Não foi possivel carregar investimentos.";
            listaInvestimento.innerHTML = `
                <tr>
                    <td colspan="6">Nao foi possivel carregar investimentos.</td>
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
                <td colspan="6">Erro ao conectar com o servidor.</td>
            </tr>
        `;
    }
}

function renderizarInvestimentos(investimentos) {
    listaInvestimento.innerHTML = "";

    if (investimentos.length === 0) {
        listaInvestimento.innerHTML = `
            <tr>
                <td colspan="6">Nenhum investimento encontrado.</td>
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

    investimentos.forEach((investimento) => {
        somaInvestido += investimento.valorAplicado || 0;
        somaRendimento += investimento.rendimentoEstimado || 0;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${formatarDataHora(investimento.dataAplicacao)}</td>
            <td>${investimento.produto}</td>
            <td>${investimento.tipo}</td>
            <td>${investimento.perfilInvestidor}</td>
            <td>${formatarMoeda(investimento.valorAplicado)}</td>
            <td>${formatarMoeda(investimento.rendimentoEstimado)}</td>
        `;

        listaInvestimento.appendChild(linha);
    });

    totalInvestido.textContent = formatarMoeda(somaInvestido);
    rendimentoEstimado.textContent = formatarMoeda(somaRendimento);
    quantidadeInvestimentos.textContent = investimentos.length;
    perfilInvestidorResumo.textContent = investimentos[0].perfilInvestidor || "-";
}

inputValorAplicado.addEventListener("input", () => {
    inputValorAplicado.value = mascararDinheiro(inputValorAplicado.value);
});

formInvestimento.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!contaAtual) {
        mensagemInvestimentos.textContent = "Conta ainda não carregou.";
        return;
    }

    const investimento = {
        produto: document.getElementById("produtoInvestimento").value,
        tipo: document.getElementById("tipoInvestimento").value,
        perfilInvestidor: document.getElementById("perfilInvestidor").value,
        valorAplicado: converterDinheiroParaNumero(document.getElementById("valorAplicado").value)
    };

    const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/investimentos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(investimento)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemInvestimentos.textContent = erro.erro || "Erro ao investir";
        return;
    }

    mensagemInvestimentos.textContent = "Investimento feito com sucesso";
    formInvestimento.reset();
    await carregarConta();
});

if (!deveRedirecionar) {
    carregarConta();
}
