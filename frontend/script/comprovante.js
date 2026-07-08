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

const params = new URLSearchParams(window.location.search);
const comprovanteId = params.get("id");

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

function preencherComprovante(comprovante) {
    valor.textContent = formatarMoeda(comprovante.valor);
    DataHora.textContent = formatarDataHora(comprovante.dataHora);
    contaOrigem.textContent = comprovante.contaOrigem?.numero || comprovante.contaOrigem || "-";
    contaDestino.textContent = comprovante.destino || comprovante.contaDestino || "-";
    pagador.textContent = comprovante.pagador || "-";
    metodo.textContent = comprovante.metodo;
    statusComprovante.textContent = comprovante.status;
    codigoComprovante.textContent = comprovante.codigo || comprovante.codigoAutenticacao || gerarCodigoAutenticacao(comprovante);

    if (comprovante.labelDestino) {
        labelDestino.textContent = comprovante.labelDestino;
    } else if (comprovante.metodo === "Pix" || comprovante.metodo === "PIX") {
        labelDestino.textContent = "Chave Pix destino";
    } else if (comprovante.metodo === "BOLETO" || comprovante.metodo === "Pagamento de boleto") {
        labelDestino.textContent = "Codigo de boleto";
    } else {
        labelDestino.textContent = "Conta destino";
    }

    tituloComprovante.textContent =
        comprovante.metodo === "PIX" ? "Pix realizado" :
        comprovante.metodo === "BOLETO" ? "Boleto pago" :
        "Transferencia realizada";
}

async function carregarComprovante() {
    if (comprovanteId) {
        const resposta = await fetch(`${API_URL}/comprovantes/${comprovanteId}`);

        if (!resposta.ok) {
            mensagemComprovante.textContent = "Comprovante não encontrado.";
            return;
        }

        const comprovante = await resposta.json();
        preencherComprovante(comprovante);
        return;
    }

    const comprovante = JSON.parse(localStorage.getItem("ultimoComprovante"));

    if (!comprovante) {
        mensagemComprovante.textContent = "Nenhum comprovante encontrado";
        return;
    }

    preencherComprovante(comprovante);
}

function gerarCodigoAutenticacao(comprovante) {
    const origem = comprovante.contaOrigem?.numero || comprovante.contaOrigem || "";
    const destino = comprovante.destino || comprovante.contaDestino || "";
    const base = `${origem}-${destino}-${comprovante.valor}-${comprovante.dataHora}`;
    let codigo = 0;

    for (let i = 0; i < base.length; i++) {
        codigo += base.charCodeAt(i) * (i + 1);
    }

    return `EB-${String(codigo).padStart(8, "0")}`;
}

botaoImprimir.addEventListener("click", () => {
    window.print();
});

carregarComprovante();
