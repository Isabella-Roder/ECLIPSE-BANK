const nomeProdutoDetalhe = document.getElementById("nome-produto-detalhe");
const saldoInvestimentoDetalhe = document.getElementById("saldo-investimento-detalhe");
const mensagemInvestimentoDetalhe = document.getElementById("mensagem-investimento-detalhe");

const produtoDetalhe = document.getElementById("produto-detalhe");
const riscoDetalhe = document.getElementById("risco-detalhe");
const perfilDetalhe = document.getElementById("perfil-detalhe");
const rentabilidadeDetalhe = document.getElementById("rentabilidade-detalhe");
const descricaoDetalhe = document.getElementById("descricao-detalhe");
const tipoDetalhe = document.getElementById("tipo-detalhe");

const formInvestimentoDetalhe = document.getElementById("form-investimento-detalhe");
const inputValorAplicadoDetalhe = document.getElementById("valorAplicadoDetalhe");

const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);
const produtoSelecionado = JSON.parse(localStorage.getItem("produtoInvestimentoSelecionado"));

const inputPrazoMeses = document.getElementById("prazoMeses");
const simulacaoRendimento = document.getElementById("simulacao-rendimento");
const simulacaoTotal = document.getElementById("simulacao-total");

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

function carregarProdutoSelecionado() {
    if (!produtoSelecionado) {
        mensagemInvestimentoDetalhe.textContent = "Escolha um produto antes de aplicar.";
        formInvestimentoDetalhe.style.display = "none";
        return;
    }

    nomeProdutoDetalhe.textContent = produtoSelecionado.nome;
    produtoDetalhe.textContent = produtoSelecionado.nome;
    riscoDetalhe.textContent = produtoSelecionado.risco;
    perfilDetalhe.textContent = produtoSelecionado.perfilInvestidor;
    rentabilidadeDetalhe.textContent = produtoSelecionado.rentabilidade;
    descricaoDetalhe.textContent = produtoSelecionado.descricao;
    tipoDetalhe.textContent = produtoSelecionado.tipo;
}

async function carregarConta() {
    try {
        contaAtual = await buscarContaDoUsuario(usuarioLogado.id);
        saldoInvestimentoDetalhe.textContent = formatarMoeda(contaAtual.saldo);
    } catch (erro) {
        mensagemInvestimentoDetalhe.textContent = "Nao foi possivel carregar sua conta.";
    }
}

inputValorAplicadoDetalhe.addEventListener("input", () => {
    inputValorAplicadoDetalhe.value = mascararDinheiro(inputValorAplicadoDetalhe.value);
    simularInvestimento();
});

formInvestimentoDetalhe.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!contaAtual || !produtoSelecionado) {
        mensagemInvestimentoDetalhe.textContent = "Nao foi possivel aplicar agora.";
        return;
    }

    const investimento = {
        produto: produtoSelecionado.produto,
        tipo: produtoSelecionado.tipo,
        perfilInvestidor: produtoSelecionado.perfilInvestidor,
        valorAplicado: converterDinheiroParaNumero(inputValorAplicadoDetalhe.value)
    };

    try {
        const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/investimentos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(investimento)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            mensagemInvestimentoDetalhe.textContent = erro.erro || "Erro ao aplicar investimento.";
            return;
        }

        mensagemInvestimentoDetalhe.textContent = "Investimento aplicado com sucesso.";
        formInvestimentoDetalhe.reset();
        await carregarConta();
    } catch (erro) {
        mensagemInvestimentoDetalhe.textContent = "Erro ao conectar com o servidor.";
    }
});

function simularInvestimento() {
    if (!produtoSelecionado) {
        return;
    }

    const valorAplicado = converterDinheiroParaNumero(inputValorAplicadoDetalhe.value);
    const prazoMeses = Number(inputPrazoMeses.value);
    const taxaAnual = produtoSelecionado.taxaAnual || 0;

    if (valorAplicado <= 0 || prazoMeses <= 0) {
        simulacaoRendimento.textContent = formatarMoeda(0);
        simulacaoTotal.textContent = formatarMoeda(0);
        return;
    }

    const taxaPeriodo = taxaAnual * (prazoMeses / 12);
    const rendimento = valorAplicado * taxaPeriodo;
    const valorFinal = valorAplicado + rendimento;

    simulacaoRendimento.textContent = formatarMoeda(rendimento);
    simulacaoTotal.textContent = formatarMoeda(valorFinal);
}

inputPrazoMeses.addEventListener("input", () => {
    simularInvestimento();
});


if (!deveRedirecionar) {
    carregarProdutoSelecionado();
    carregarConta();
}
