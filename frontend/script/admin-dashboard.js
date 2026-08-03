const adminSaldoTotal = document.getElementById("admin-saldo-total");
const adminMensagem = document.getElementById("admin-mensagem");
const adminTotalContas = document.getElementById("admin-total-contas");
const adminTotalUsuarios = document.getElementById("admin-total-usuarios");
const adminTotalEmpresas = document.getElementById("admin-total-empresas");
const adminTotalCategorias = document.getElementById("admin-total-categorias");
const adminEntradas = document.getElementById("admin-entradas");
const adminSaidas = document.getElementById("admin-saidas");
const adminTransacoes = document.getElementById("admin-transacoes");

const adminResumoUsuarios = document.getElementById("admin-resumo-usuarios");
const adminResumoContas = document.getElementById("admin-resumo-contas");
const adminResumoEmpresas = document.getElementById("admin-resumo-empresas");
const adminResumoCategorias = document.getElementById("admin-resumo-categorias");
const adminContasBloqueadas = document.getElementById("admin-contas-bloqueadas");
const adminUsuariosInativos = document.getElementById("admin-usuarios-inativos");
const adminEmpresasInativas = document.getElementById("admin-empresas-inativas");
const adminTotalTransacoes = document.getElementById("admin-total-transacoes");

function ehEntradaAdmin(tipo) {
    return tipo === "RECEITA"
        || tipo === "DEPOSITO"
        || tipo === "VENDA_ATIVO"
        || tipo === "RESGATE_INVESTIMENTO"
        || tipo === "RESGATE_META"
        || tipo === "VENDA_CAMBIO"
        || tipo === "EMPRESTIMO_CONTRATADO";
}

function classeValorAdmin(tipo) {
    return ehEntradaAdmin(tipo) ? "valor-entrada" : "valor-saida";
}

async function buscarListaAdmin(endpoint) {
    const resposta = await fetch(`${API_URL}${endpoint}`);

    if (!resposta.ok) {
        return [];
    }

    return await resposta.json();
}

async function carregarResumoAdmin() {
    const resposta = await fetch(`${API_URL}/dashboard`);

    if (!resposta.ok) {
        adminMensagem.textContent = "Nao foi possivel carregar o dashboard admin.";
        return;
    }

    const dados = await resposta.json();

    adminSaldoTotal.textContent = formatarMoeda(dados.saldoAtual || 0);
    adminTotalContas.textContent = dados.totalContas || 0;
    adminTotalUsuarios.textContent = dados.totalUsuarios || 0;
    adminEntradas.textContent = formatarMoeda(dados.entradasMes || 0);
    adminSaidas.textContent = formatarMoeda(dados.saidasMes || 0);

    adminResumoUsuarios.textContent = `${dados.totalUsuarios || 0} usuario(s) cadastrados`;
    adminResumoContas.textContent = `${dados.totalContas || 0} conta(s) no sistema`;
}

async function carregarIndicadoresExtrasAdmin() {
    const empresas = await buscarListaAdmin("/empresas");
    const categorias = await buscarListaAdmin("/categorias");

    adminTotalEmpresas.textContent = empresas.length;
    adminTotalCategorias.textContent = categorias.length;

    adminResumoEmpresas.textContent = empresas.length > 0
        ? `${empresas.length} empresa(s) cadastrada(s)`
        : "Nenhuma empresa cadastrada";

    adminResumoCategorias.textContent = categorias.length > 0
        ? `${categorias.length} categoria(s) cadastrada(s)`
        : "Nenhuma categoria cadastrada";
}

async function carregarTransacoesAdmin() {
    const transacoes = await buscarListaAdmin("/transacoes");

    adminTotalTransacoes.textContent = transacoes.length;
    renderizarTransacoesAdmin(transacoes);
}

function renderizarTransacoesAdmin(transacoes) {
    adminTransacoes.innerHTML = "";

    if (!transacoes || transacoes.length === 0) {
        adminTransacoes.innerHTML = `<p class="texto-vazio">Nenhuma transacao registrada.</p>`;
        return;
    }

    const ultimas = transacoes
        .sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora))
        .slice(0, 6);

    ultimas.forEach((transacao) => {
        adminTransacoes.innerHTML += `
            <div class="item-resumo">
                <div>
                    <strong>${transacao.descricao || transacao.tipo}</strong>
                    <span>${formatarDataHora(transacao.dataHora)} - ${transacao.categoria || "-"}</span>
                </div>

                <strong class="${classeValorAdmin(transacao.tipo)}">
                    ${formatarMoeda(transacao.valor || 0)}
                </strong>
            </div>
        `;
    });
}

function atualizarAlertasAdmin(contas, usuarios, empresas, transacoes) {
    const contasBloqueadas = contas.filter((conta) => conta.bloqueada === true);
    const usuariosInativos = usuarios.filter((usuario) => usuario.ativo === false);
    const empresasInativas = empresas.filter((empresa) => empresa.ativada === false);

    adminContasBloqueadas.textContent = contasBloqueadas.length;
    adminUsuariosInativos.textContent = usuariosInativos.length;
    adminEmpresasInativas.textContent = empresasInativas.length;
    adminTotalTransacoes.textContent = transacoes.length;
}

async function carregarAlertasAdmin() {
    const contas = await buscarListaAdmin("/contas");
    const usuarios = await buscarListaAdmin("/usuarios");
    const empresas = await buscarListaAdmin("/empresas");
    const transacoes = await buscarListaAdmin("/transacoes");

    atualizarAlertasAdmin(contas, usuarios, empresas, transacoes);
}

async function iniciarAdminDashboard() {
    try {
        await carregarResumoAdmin();
        await carregarIndicadoresExtrasAdmin();
        await carregarAlertasAdmin();
        await carregarTransacoesAdmin();

        adminMensagem.textContent = "Dashboard admin carregado.";
    } catch (erro) {
        console.error(erro);
        adminMensagem.textContent = "Erro ao carregar dashboard admin.";
    }
}

iniciarAdminDashboard();
