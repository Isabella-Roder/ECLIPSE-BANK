const inicioSaudacao = document.getElementById("inicio-saudacao");
const inicioSaldo = document.getElementById("inicio-saldo");
const inicioMensagem = document.getElementById("inicio-mensagem");

const inicioNumeroConta = document.getElementById("inicio-numero-conta");
const inicioChavePix = document.getElementById("inicio-chave-pix");
const inicioLimite = document.getElementById("inicio-limite");
const inicioResultado = document.getElementById("inicio-resultado");

const inicioEntradas = document.getElementById("inicio-entradas");
const inicioSaidas = document.getElementById("inicio-saidas");
const inicioInvestimentos = document.getElementById("inicio-investimentos");
const inicioMetas = document.getElementById("inicio-metas");

const inicioTransacoes = document.getElementById("inicio-transacoes");
const inicioEmprestimos = document.getElementById("inicio-emprestimos");
const inicioMetasStatus = document.getElementById("inicio-metas-status");
const inicioInvestimentosStatus = document.getElementById("inicio-investimentos-status");
const inicioEmprestimosSaldo = document.getElementById("inicio-emprestimos-saldo");
const inicioCartoesStatus = document.getElementById("inicio-cartoes-status");

const usuarioLogado = pegarUsuarioLogado();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(usuarioLogado);

let contaAtual = null;

function ehEntradaInicio(tipo) {
    return tipo === "RECEITA"
        || tipo === "DEPOSITO"
        || tipo === "VENDA_ATIVO"
        || tipo === "RESGATE_INVESTIMENTO"
        || tipo === "RESGATE_META"
        || tipo === "VENDA_CAMBIO"
        || tipo === "EMPRESTIMO_CONTRATADO";
}

async function carregarContaInicio() {
    contaAtual = await buscarContaDoUsuario(usuarioLogado.id);

    inicioSaudacao.textContent = `Ola, ${usuarioLogado.nomeSocial || usuarioLogado.nome || "cliente"}`;
    inicioSaldo.textContent = formatarMoeda(contaAtual.saldo);
    inicioNumeroConta.textContent = contaAtual.numero || "-";
    inicioChavePix.textContent = contaAtual.chavePix || "-";
    inicioLimite.textContent = formatarMoeda(contaAtual.limite || 0);

    inicioMensagem.textContent = "Conta carregada com sucesso.";
}

async function carregarTransacoesInicio() {
    const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/transacoes`);

    if (!resposta.ok) {
        inicioTransacoes.innerHTML = `<p class="texto-vazio">Nao foi possivel carregar movimentacoes.</p>`;
        return;
    }

    const transacoes = await resposta.json();

    const entradas = transacoes
        .filter((transacao) => ehEntradaInicio(transacao.tipo))
        .reduce((total, transacao) => total + (transacao.valor || 0), 0);

    const saidas = transacoes
        .filter((transacao) => !ehEntradaInicio(transacao.tipo))
        .reduce((total, transacao) => total + (transacao.valor || 0), 0);

    inicioEntradas.textContent = formatarMoeda(entradas);
    inicioSaidas.textContent = formatarMoeda(saidas);
    inicioResultado.textContent = formatarMoeda(entradas - saidas);

    renderizarUltimasTransacoes(transacoes);
}

function renderizarUltimasTransacoes(transacoes) {
    inicioTransacoes.innerHTML = "";

    if (!transacoes || transacoes.length === 0) {
        inicioTransacoes.innerHTML = `<p class="texto-vazio">Nenhuma movimentacao ainda.</p>`;
        return;
    }

    const ultimas = transacoes
        .sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora))
        .slice(0, 5);

    ultimas.forEach((transacao) => {
        inicioTransacoes.innerHTML += `
            <div class="item-resumo">
                <div>
                    <strong>${transacao.descricao || transacao.tipo}</strong>
                    <span>${formatarDataHora(transacao.dataHora)} - ${transacao.categoria || "-"}</span>
                </div>

                <strong>${formatarMoeda(transacao.valor)}</strong>
            </div>
        `;
    });
}

async function carregarMetasInicio() {
    const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/metas`);

    if (!resposta.ok) {
        inicioMetasStatus.textContent = "Nao foi possivel carregar metas.";
        return;
    }

    const metas = await resposta.json();

    const metasAtivas = metas.filter((meta) => meta.status === "EM_ANDAMENTO");

    const totalGuardado = metas.reduce((total, meta) => {
        return total + (meta.valorAtual || 0);
    }, 0);

    inicioMetas.textContent = formatarMoeda(totalGuardado);

    inicioMetasStatus.textContent = metasAtivas.length > 0
        ? `${metasAtivas.length} meta(s) em andamento`
        : "Nenhuma meta em andamento";
}

async function carregarInvestimentosInicio() {
    const respostaInvestimentos = await fetch(`${API_URL}/contas/${contaAtual.id}/investimentos`);
    const respostaAtivos = await fetch(`${API_URL}/contas/${contaAtual.id}/ativos`);

    if (!respostaInvestimentos.ok || !respostaAtivos.ok) {
        inicioInvestimentosStatus.textContent = "Nao foi possivel carregar investimentos.";
        return;
    }

    const investimentos = await respostaInvestimentos.json();
    const ativos = await respostaAtivos.json();

    const investimentosAtivos = investimentos.filter((investimento) => {
        return investimento.status !== "RESGATADO";
    });

    const totalRendaFixa = investimentosAtivos.reduce((total, investimento) => {
        return total + (investimento.valorAplicado || 0);
    }, 0);

    const totalRendaVariavel = ativos.reduce((total, ativo) => {
        return total + (ativo.valorTotal || 0);
    }, 0);

    const totalInvestido = totalRendaFixa + totalRendaVariavel;
    const quatidadeProdutos = investimentosAtivos.length + ativos.length;

    inicioInvestimentos.textContent = formatarMoeda(totalInvestido);

    if (quatidadeProdutos === 0) {
        inicioInvestimentosStatus.textContent = "Nenhum investimento ativo";
        return;
    }

    inicioInvestimentosStatus.textContent = `${quatidadeProdutos} produto(s) ativo(s) - ${formatarMoeda(totalInvestido)}`;
}

async function carregarEmprestimosInicio() {
    const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/emprestimos`);

    if (!resposta.ok) {
        inicioEmprestimos.textContent = "Nao foi possivel carregar emprestimos.";
        inicioEmprestimosSaldo.textContent = "Saldo devedor indisponivel";
        return;
    }

    const emprestimos = await resposta.json();

    const emprestimosAtivos = emprestimos.filter((emprestimo) => {
        return emprestimo.status === "CONTRATADO";
    });

    const saldoDevedor = emprestimosAtivos.reduce((total, emprestimo) => {
        return total + (emprestimo.saldoDevedor || 0); 
    }, 0);

    if (emprestimosAtivos.length === 0) {
        inicioEmprestimos.textContent = "Nenhum contrato ativo";
        inicioEmprestimosSaldo.textContent = "Saldo devedor: R$ 0,00";
        return;
    }

    inicioEmprestimos.textContent = `${emprestimosAtivos.length} contrato(s) ativo(s)`
    inicioEmprestimosSaldo.textContent = `Saldo devedor: ${formatarMoeda(saldoDevedor)}`;
}

async function carregarCartoesInicio() {
    const resposta = await fetch(`${API_URL}/contas/${contaAtual.id}/cartoes`);

    if (!resposta.ok) {
        inicioCartoesStatus.textContent = "Nao foi possivel carregar cartoes.";
        return;
    }

    const cartoes = await resposta.json();

    if (!cartoes || cartoes.length === 0) {
        inicioCartoesStatus.textContent = "Nenhum cartao cadastrado.";
        return;
    }

    const limiteDisponivel = cartoes.reduce((total, cartao) => {
        return total + (cartao.limiteDisponivel || 0);
    }, 0);

    inicioCartoesStatus.textContent = `${cartoes.length} cartao(oes) - limite disponivel ${formatarMoeda(limiteDisponivel)}`;
}

async function iniciarPagina() {
    try {
        await carregarContaInicio();
        await carregarTransacoesInicio();
        await carregarMetasInicio();
        await carregarInvestimentosInicio();
        await carregarEmprestimosInicio();
        await carregarCartoesInicio();
    } catch (erro) {
        console.error(erro);
        inicioMensagem.textContent = "Nao foi possivel carregar pagina.";
    }
}

if (!deveRedirecionar) {
    iniciarPagina();
}
