const API_URL = "http://localhost:8080";

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

const empresaLogada = JSON.parse(localStorage.getItem("empresaLogada"));

if (!empresaLogada) {
    window.location.href = "login.html";
}

function formatarMoeda(valor) {
    return (valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

async function carregarDashboardEmpresa() {
    saudacaoEmpresa.textContent = `Olá, ${empresaLogada.nomeFantasia}`;
    nomeFantasiaEmpresa.textContent = empresaLogada.nomeFantasia || "-";
    razaoSocialEmpresa.textContent = empresaLogada.razaoSocial || "-";
    cnpjEmpresa.textContent = empresaLogada.cnpj || "-";
    emailEmpresa.textContent = empresaLogada.email || "-";
    telefoneEmpresa.textContent = empresaLogada.telefone || "-";

    const resposta = await fetch(`${API_URL}/empresas/${empresaLogada.id}/conta`);

    if (!resposta.ok) {
        mensagemEmpresaDashboard.textContent = "Nao foi possivel carregar a conta empresarial.";
        return;
    }

    const conta = await resposta.json();

    mensagemEmpresaDashboard.textContent = "Conta empresarial Eclipse Bank";
    saldoEmpresa.textContent = formatarMoeda(conta.saldo || 0);
    limiteEmpresa.textContent = formatarMoeda(conta.limite || 0);
    numeroContaEmpresa.textContent = conta.numero || "-";
    chavePixEmpresa.textContent = conta.chavePix || "-";
    tipoChavePixEmpresa.textContent = conta.tipoChavePix || "-";
}

carregarDashboardEmpresa();
