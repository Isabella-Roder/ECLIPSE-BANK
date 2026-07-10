const API_URL = "http://localhost:8080";

const tituloContaEmpresa = document.getElementById("titulo-conta-empresa");
const saldoContaEmpresa = document.getElementById("saldo-conta-empresa");
const titularContaEmpresa = document.getElementById("titular-conta-empresa");
const limiteContaEmpresa = document.getElementById("limite-conta-empresa");
const numeroContaEmpresa = document.getElementById("numero-conta-empresa");
const tipoContaEmpresa = document.getElementById("tipo-conta-empresa");
const chavePixContaEmpresa = document.getElementById("chave-pix-conta-empresa");
const tipoChavePixContaEmpresa = document.getElementById("tipo-chave-pix-conta-empresa");
const nomeEmpresaConta = document.getElementById("nome-empresa-conta");
const cnpjEmpresaConta = document.getElementById("cnpj-empresa-conta");
const emailEmpresaConta = document.getElementById("email-empresa-conta");
const telefoneEmpresaConta = document.getElementById("telefone-empresa-conta");

const mensagemContaEmpresa = document.getElementById("mensagem-conta-empresa");

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

async function carregarContaEmpresa(empresaId) {
    const resposta = await fetch(`${API_URL}/empresas/${empresaId}/conta`);

    if (!resposta.ok) {
        mensagemContaEmpresa.textContent = "Erro, essa conta não existe";
        return;
    }

    const contaEmpresa = await resposta.json();

    tituloContaEmpresa.textContent = `Olá ${empresaLogada.nomeFantasia}`;
    mensagemContaEmpresa.textContent = "Conta empresarial Eclipse Bank";

    titularContaEmpresa.textContent = contaEmpresa.titular;
    saldoContaEmpresa.textContent = formatarMoeda(contaEmpresa.saldo || 0);
    limiteContaEmpresa.textContent = formatarMoeda(contaEmpresa.limite || 0);
    numeroContaEmpresa.textContent = contaEmpresa.numero;
    chavePixContaEmpresa.textContent = contaEmpresa.chavePix;
    tipoContaEmpresa.textContent = contaEmpresa.tipoConta || "EMPRESA";

    tipoChavePixContaEmpresa.textContent = contaEmpresa.tipoChavePix || "-";
    
    nomeEmpresaConta.textContent = empresaLogada.nomeFantasia || "-";
    cnpjEmpresaConta.textContent = empresaLogada.cnpj || "-";
    emailEmpresaConta.textContent = empresaLogada.email || "-";
    telefoneEmpresaConta.textContent = empresaLogada.telefone || "-";
}

carregarContaEmpresa(empresaLogada.id);