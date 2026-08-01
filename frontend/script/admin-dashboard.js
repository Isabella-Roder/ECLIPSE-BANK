const adminSaldoTotal = document.getElementById("admin-saldo-total");
const adminMensagem = document.getElementById("admin-mensagem");
const adminTotalContas = document.getElementById("admin-total-contas");
const adminTotalUsuario = document.getElementById("admin-total-usuario");
const adminEntradas = document.getElementById("admin-entradas");
const adminSaidas = document.getElementById("admin-saidas");

const adminResumoUsuarios = document.getElementById("admin-resumo-usuario");
const adminResumoContas = document.getElementById("admin-resumo-contas");

async function carregarResumoAdmin() {
    const resposta = await fetch(`${API_URL}/dashboard`);

    if (!resposta.ok) {
        adminMensagem.textContent = "Nao foi possivel carregar o dashboard admin.";
        return;
    }

    const dados = await resposta.json();

    adminSaldoTotal.textContent = formatarMoeda(dados.saldoAtual);
    adminTotalContas.textContent = dados.totalContas;
    adminTotalUsuario.textContent = dados.totalUsuarios;
    adminEntradas.textContent = formatarMoeda(dados.entradasMes);
    adminSaidas.textContent = formatarMoeda(dados.saidasMes);

    adminResumoUsuarios.textContent = `${dados.totalUsuarios} usuario(s) cadastrados`;
    adminResumoContas.textContent = `${dados.totalContas} conta(s) no sistema`;

    adminMensagem.textContent = "Dashboard admin carregado.";
}

carregarResumoAdmin();