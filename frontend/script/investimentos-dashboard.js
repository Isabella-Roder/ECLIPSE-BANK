const patrimonioInvestido = document.getElementById("patrimonio-investimentos");
const mensagemDashboardInvestimentos = document.getElementById("mensagem-dashboard-investimentos");

const totalRendaFixa = document.getElementById("total-renda-fixa");
const totalRendaVariavel = document.getElementById("total-renda-variavel");
const rendimentoEstimado = document.getElementById("rendimento-estimado-dashboard");
const resultadoAtivos = document.getElementById("resultado-ativos-dashboard");
const quantidadeProdutos = document.getElementById("quantidade-produtos-dashboard");
const percentualRendaFixa = document.getElementById("percentual-renda-fixa");
const percentualRendaVariavel = document.getElementById("percentual-renda-variavel");
const saldoDisponivel = document.getElementById("saldo-disponivel-investimentos");
const saudeCarteiraInvestimentos = document.getElementById("saude-carteira-investimentos");
const descricaoSaudeCarteira = document.getElementById("descricao-saude-carteira");

const resumoRendaFixa = document.getElementById("lista-resumo-renda-fixa");
const resumoRendaVariavel = document.getElementById("lista-resumo-renda-variavel");


const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

let contaAtual = null;
let investimentosAtuais = [];
let ativosAtuais = [];

async function carregarDashboardInvestimentos() {
    try {
        contaAtual = await buscarContaDoUsuario(usuarioLogado.id);

        saldoDisponivel.textContent = formatarMoeda(contaAtual.saldo);

        const respostaInvestimentos = await fetch(`${API_URL}/contas/${contaAtual.id}/investimentos`);
        const respostaAtivos = await fetch(`${API_URL}/contas/${contaAtual.id}/ativos`);

        if (!respostaInvestimentos.ok || !respostaAtivos.ok) {
            mensagemDashboardInvestimentos.textContent = "Não foi possivel carregar o dashboard";
            return;
        }

        investimentosAtuais = await respostaInvestimentos.json();
        ativosAtuais = await respostaAtivos.json();

        await calcularResumo();
        mensagemDashboardInvestimentos.textContent = "Dashboard de investimentos carregado.";
    } catch (erro) {
        mensagemDashboardInvestimentos.textContent = "Erro ao conectar com o servidor.";
    }
}

async function calcularResumo() {
    const investimentosAtivos = investimentosAtuais.filter((investimento) => {
        return investimento.status !== "RESGATADO";
    });

    const totalFixa = investimentosAtivos.reduce((soma, investimento) => {
        return soma + (investimento.valorAplicado || 0);
    }, 0);

    const rendimento = investimentosAtivos.reduce((soma, investimento) => {
        return soma + (investimento.rendimentoEstimado || 0);
    }, 0);

    const totalVariavel = ativosAtuais.reduce((soma, ativo) => {
        return soma + (ativo.valorTotal || 0);
    }, 0);

    const patrimonio = totalFixa + totalVariavel;
    const quantidade = investimentosAtivos.length + ativosAtuais.length;
    const resultadoTotalAtivos = await calcularResultadoAtivos();

    patrimonioInvestido.textContent = formatarMoeda(patrimonio);
    totalRendaFixa.textContent = formatarMoeda(totalFixa);
    totalRendaVariavel.textContent = formatarMoeda(totalVariavel);
    rendimentoEstimado.textContent = formatarMoeda(rendimento);
    resultadoAtivos.textContent = formatarMoeda(resultadoTotalAtivos);
    resultadoAtivos.className = resultadoTotalAtivos >= 0 ? "valor-entrada" : "valor-saida";
    quantidadeProdutos.textContent = quantidade;

    percentualRendaFixa.textContent = patrimonio > 0 ? `${((totalFixa / patrimonio) * 100).toFixed(1)}%` : "0%";
    percentualRendaVariavel.textContent = patrimonio > 0 ? `${((totalVariavel / patrimonio) * 100).toFixed(1)}%` : "0%";

    renderizarSaudeCarteira(totalFixa, totalVariavel, patrimonio, resultadoTotalAtivos);
    renderizarResumoRendaFixa(investimentosAtivos);
    renderizarResumoRendaVariavel(ativosAtuais);
}

function renderizarResumoRendaFixa(investimentosAtivos) {
    resumoRendaFixa.innerHTML = "";

    if (investimentosAtivos.length === 0) {
        resumoRendaFixa.innerHTML = "<p>Nenhuma aplicação ativa.</p>";
        return;
    }

    investimentosAtivos.forEach((investimento) => {
        resumoRendaFixa.innerHTML += `
            <p>
                <strong>${investimento.produto}</strong><br>
                ${formatarMoeda(investimento.valorAplicado)} investidos<br>
                ${formatarMoeda(investimento.rendimentoEstimado)} de rendimento estimado - ${investimento.prazoMeses} meses
            </p>
        `;
    });
}

function renderizarResumoRendaVariavel(ativos) {
    resumoRendaVariavel.innerHTML = "";

    if (ativos.length === 0) {
        resumoRendaVariavel.innerHTML = "<p>Nenhum ativo na carteira.</p>"
        return;
    }

    ativos.forEach((ativo) => {
        resumoRendaVariavel.innerHTML += `
            <p>
                <strong>${ativo.ticker}</strong><br>
                ${ativo.quantidade} cotas - ${formatarMoeda(ativo.valorTotal)} investidos
            </p>
        `;
    })
}

function renderizarSaudeCarteira(totalFixa, totalVariavel, patrimonio, resultadoTotalAtivos) {
    if (patrimonio === 0) {
        saudeCarteiraInvestimentos.textContent = "Sem carteira";
        descricaoSaudeCarteira.textContent = "Comece aplicando em renda fixa ou comprando um ativo.";
        return;
    }

    if (totalFixa > totalVariavel) {
        saudeCarteiraInvestimentos.textContent = "Mais conservadora";
        descricaoSaudeCarteira.textContent = "A maior parte do patrimonio esta em renda fixa.";
    } else if (totalVariavel > totalFixa) {
        saudeCarteiraInvestimentos.textContent = "Mais arrojada";
        descricaoSaudeCarteira.textContent = "A maior parte do patrimonio esta em renda variavel.";
    } else {
        saudeCarteiraInvestimentos.textContent = "Equilibrada";
        descricaoSaudeCarteira.textContent = "A carteira esta dividida entre renda fixa e variavel.";
    }

    if (resultadoTotalAtivos > 0) {
        descricaoSaudeCarteira.textContent += " Os ativos estao com resultado positivo.";
    } else if (resultadoTotalAtivos < 0) {
        descricaoSaudeCarteira.textContent += " Os ativos estao com resultado negativo.";
    }
}

async function calcularResultadoAtivos() {
    let resultadoTotal = 0;

    for (const ativo of ativosAtuais) {
        const cotacao = await buscarCotacaoAtual(ativo.ticker);

        const precoAtual = cotacao?.precoAtual || ativo.precoMedio;
        const valorAtual = precoAtual * ativo.quantidade;
        const resultado = valorAtual - ativo.valorTotal;

        resultadoTotal += resultado;
    }

    return resultadoTotal;
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

if (!deveRedirecionar) {
    carregarDashboardInvestimentos();
}
