const saudacaoEmpresa = document.getElementById("saudacao-empresa");
const saldoEmpresa = document.getElementById("saldo-empresa");
const mensagemEmpresaDashboard = document.getElementById("mensagem-empresa-dashboard");
const nomeFantasiaEmpresa = document.getElementById("nome-fantasia-empresa");
const limiteEmpresa = document.getElementById("limite-empresa");
const numeroContaEmpresa = document.getElementById("numero-conta-empresa");
const razaoSocialEmpresa = document.getElementById("razao-social-empresa");
const cnpjEmpresa = document.getElementById("cnpj-empresa");
const emailEmpresa = document.getElementById("email-empresa");
const telefoneEmpresa = document.getElementById("telefone-empresa");
const chavePixEmpresa = document.getElementById("chave-pix-empresa");
const tipoChavePixEmpresa = document.getElementById("tipo-chave-pix-empresa");
const totalMovimentacoesEmpresa = document.getElementById("total-movimentacoes-empresa");
const ultimoPagamentoEmpresa = document.getElementById("ultimo-pagamento-empresa");
const statusCartaoDashboardEmpresa = document.getElementById("status-cartao-dashboard-empresa");
const faturaCartaoDashboardEmpresa = document.getElementById("fatura-cartao-dashboard-empresa");
const ultimasMovimentacoesEmpresa = document.getElementById("ultimas-movimentacoes-empresa");
const ultimosComprovantesEmpresa = document.getElementById("ultimos-comprovantes-empresa");

const empresaLogada = pegarEmpresaLogada();
const deveRedirecionar = redirecionarParaLoginSeNaoExistir(empresaLogada);

function classeValor(tipo) {
    return tipo === "RECEITA" || tipo === "DEPOSITO" ? "valor-entrada" : "valor-saida";
}

function renderizarMovimentacoes(transacoes) {
    totalMovimentacoesEmpresa.textContent = transacoes.length;

    if (transacoes.length === 0) {
        ultimasMovimentacoesEmpresa.innerHTML = `<p class="texto-vazio">Nenhuma movimentacao encontrada.</p>`;
        return;
    }

    ultimasMovimentacoesEmpresa.innerHTML = "";

    transacoes.slice().reverse().slice(0, 4).forEach((transacao) => {
        const item = document.createElement("div");
        item.classList.add("item-pagamento");

        item.innerHTML = `
            <div class="pagamento-info">
                <strong>${transacao.descricao || transacao.tipo || "Movimentacao"}</strong>
                <span>${transacao.categoria || "-"}</span>
            </div>

            <div class="pagamento-valor">
                <strong class="${classeValor(transacao.tipo)}">${formatarMoeda(transacao.valor)}</strong>
                <span>${formatarDataHora(transacao.dataHora)}</span>
            </div>
        `;

        ultimasMovimentacoesEmpresa.appendChild(item);
    });
}

function renderizarComprovantes(comprovantes) {
    if (comprovantes.length === 0) {
        ultimoPagamentoEmpresa.textContent = "-";
        ultimosComprovantesEmpresa.innerHTML = `<p class="texto-vazio">Nenhum comprovante encontrado.</p>`;
        return;
    }

    const ultimo = comprovantes[comprovantes.length - 1];
    ultimoPagamentoEmpresa.textContent = formatarMoeda(ultimo.valor);

    ultimosComprovantesEmpresa.innerHTML = "";

    comprovantes.slice().reverse().slice(0, 4).forEach((comprovante) => {
        const item = document.createElement("div");
        item.classList.add("item-pagamento");

        item.innerHTML = `
            <div class="pagamento-info">
                <strong>${comprovante.metodo || "Comprovante"}</strong>
                <span>${comprovante.destino || "-"}</span>
            </div>

            <div class="pagamento-valor">
                <strong>${formatarMoeda(comprovante.valor)}</strong>
                <span>${formatarDataHora(comprovante.dataHora)}</span>
            </div>

            <a class="botao-comprovante" href="comprovante.html?id=${comprovante.id}">Ver</a>
        `;

        ultimosComprovantesEmpresa.appendChild(item);
    });
}

async function carregarMovimentacoesEmpresa(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/transacoes`);

    if (!resposta.ok) {
        ultimasMovimentacoesEmpresa.innerHTML = `<p class="texto-vazio">Nao foi possivel carregar movimentacoes.</p>`;
        return;
    }

    const transacoes = await resposta.json();
    renderizarMovimentacoes(transacoes);
}

async function carregarComprovantesEmpresa(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/comprovantes`);

    if (!resposta.ok) {
        ultimosComprovantesEmpresa.innerHTML = `<p class="texto-vazio">Nao foi possivel carregar comprovantes.</p>`;
        return;
    }

    const comprovantes = await resposta.json();
    renderizarComprovantes(comprovantes);
}

async function carregarCartaoEmpresa(contaId) {
    const resposta = await fetch(`${API_URL}/contas/${contaId}/cartao`);

    if (!resposta.ok) {
        statusCartaoDashboardEmpresa.textContent = "Nao criado";
        faturaCartaoDashboardEmpresa.textContent = formatarMoeda(0);
        return;
    }

    const cartao = await resposta.json();
    statusCartaoDashboardEmpresa.textContent = cartao.status || "Ativo";

    const comprasResposta = await fetch(`${API_URL}/cartoes/${cartao.id}/compras`);

    if (!comprasResposta.ok) {
        faturaCartaoDashboardEmpresa.textContent = formatarMoeda(0);
        return;
    }

    const compras = await comprasResposta.json();
    const totalFatura = compras.reduce((soma, compra) => soma + (compra.valor || 0), 0);
    faturaCartaoDashboardEmpresa.textContent = formatarMoeda(totalFatura);
}

async function carregarDashboardEmpresa() {
    saudacaoEmpresa.textContent = `Ola, ${empresaLogada.nomeFantasia}`;
    nomeFantasiaEmpresa.textContent = empresaLogada.nomeFantasia || "-";
    razaoSocialEmpresa.textContent = empresaLogada.razaoSocial || "-";
    cnpjEmpresa.textContent = empresaLogada.cnpj || "-";
    emailEmpresa.textContent = empresaLogada.email || "-";
    telefoneEmpresa.textContent = empresaLogada.telefone || "-";

    try {
        const conta = await buscarContaDaEmpresa(empresaLogada.id);

        mensagemEmpresaDashboard.textContent = "Conta empresarial Eclipse Bank";
        saldoEmpresa.textContent = formatarMoeda(conta.saldo);
        limiteEmpresa.textContent = formatarMoeda(conta.limite);
        numeroContaEmpresa.textContent = conta.numero || "-";
        chavePixEmpresa.textContent = conta.chavePix || "-";
        tipoChavePixEmpresa.textContent = conta.tipoChavePix || "-";

        await carregarMovimentacoesEmpresa(conta.id);
        await carregarComprovantesEmpresa(conta.id);
        await carregarCartaoEmpresa(conta.id);
    } catch (erro) {
        mensagemEmpresaDashboard.textContent = "Nao foi possivel carregar a conta empresarial.";
    }
}

if (!deveRedirecionar) {
    carregarDashboardEmpresa();
}
