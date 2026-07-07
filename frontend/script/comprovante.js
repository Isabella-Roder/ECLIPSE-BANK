const API_URL = "http://localhost:8080";

const valor = document.getElementById("comprovante-valor");
const DataHora = document.getElementById("comprovante-data");
const contaOrigem = document.getElementById("comprovante-origem");
const contaDestino = document.getElementById("comprovante-destino");
const metodo = document.getElementById("comprovante-metodo");
const pagador = document.getElementById("comprovante-pagador");
const statusComprovante = document.getElementById("comprovante-status");
const codigoComprovante = document.getElementById("comprovante-codigo");
const botaoImprimir = document.getElementById("botao-imprimir");
const mensagemComprovante = document.getElementById("mensagem-comprovante");
const tituloComprovante = document.getElementById("comprovante-titulo");

const labelDestino = document.getElementById("label-destino-comprovante");

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "index.html";
}

const comprovante = JSON.parse(localStorage.getItem("ultimoComprovante"));

if (!comprovante) {
    mensagemComprovante.textContent = "Nenhum comprovante encontrado.";
} else {
    valor.textContent = formatarMoeda(comprovante.valor);
    DataHora.textContent = formatarDataHora(comprovante.dataHora);
    contaOrigem.textContent = comprovante.contaOrigem;
    contaDestino.textContent = comprovante.contaDestino;
    pagador.textContent = comprovante.pagador || "-";
    metodo.textContent = comprovante.metodo;
    tituloComprovante.textContent = 
        comprovante.metodo === "Pix" ? "Pix realizado" :
        comprovante.metodo === "Pagamento de boleto" ? "Boleto pago"
        : "Transferencia realizada";
    statusComprovante.textContent = comprovante.status;
    codigoComprovante.textContent = comprovante.codigoAutenticacao || gerarCodigoAutenticacao(comprovante);

    if (comprovante.metodo === "Pix" || comprovante.metodo === "PIX") {
        labelDestino.textContent = "Chave Pix destino";
    } else if (comprovante.metodo === "Pagamento de boleto") {
        labelDestino.textContent = "Codigo de boleto";
    } else {
        labelDestino.textContent = "Conta destino";
    }
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "-";
    }
    return new Date(dataHora).toLocaleString("pt-BR");
}

function gerarCodigoAutenticacao(comprovante) {
    const base = `${comprovante.contaOrigem}-${comprovante.contaDestino}-${comprovante.valor}-${comprovante.dataHora}`;
    let codigo = 0;

    for (let i = 0; i < base.length; i++) {
        codigo += base.charCodeAt(i) * (i + 1);
    }

    return `EB-${String(codigo).padStart(8, "0")}`;
}

botaoImprimir.addEventListener("click", () => {
    window.print();
});
