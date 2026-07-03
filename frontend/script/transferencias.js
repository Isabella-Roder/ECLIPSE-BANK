const API_URL = "http://localhost:8080";

const formTransferencia = document.getElementById("form-transferencia");
const mensagemTransferencia = document.getElementById("mensagem-transferencia");
const inputValorTransferencia = document.getElementById("valorTransferencia");

function mascararDinheiro(valor) {
    valor = valor.replace(/\D/g, "");

    const numero = Number(valor) / 100;

    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function converterDinheiroParaNumero(valor) {
    valor = valor.replace(/\D/g, "");
    return Number(valor) / 100;
}

inputValorTransferencia.addEventListener("input", () => {
    inputValorTransferencia.value = mascararDinheiro(inputValorTransferencia.value);
});

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "login.html";
}

let contaOrigem = null;

async function carregarContaOrigem() {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/conta`);

    if (!resposta.ok) {
        mensagemTransferencia.textContent = "Conta de origem não encontrada.";
        return;
    }

    contaOrigem = await resposta.json();
}
carregarContaOrigem();

formTransferencia.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!contaOrigem) {
        mensagemTransferencia.textContent = "Conta de origem ainda não carregou.";
        return;
    }

    const transferencia = {
        contaOrigem: contaOrigem.id,
        contaNumeroDestino: Number(document.getElementById("contaDestinoId").value),
        valor: converterDinheiroParaNumero(document.getElementById("valorTransferencia").value)
    };

    const resposta = await fetch(`${API_URL}/contas/transferir/numero`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(transferencia)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemTransferencia.textContent = erro.erro;
        return;
    }

    mensagemTransferencia.textContent = "Transferencia realizada com sucesso";

    const comprovante = {
        valor: transferencia.valor,
        contaOrigem: contaOrigem.numero,
        contaDestino: transferencia.contaNumeroDestino,
        metodo: "Transferencia",
        dataHora: new Date().toISOString(),
        status: "Concluida",
        codigoAutenticacao: `EB-${Date.now()}`
    };

    localStorage.setItem("ultimoComprovante", JSON.stringify(comprovante));

    formTransferencia.reset();
    window.location.href = "comprovante.html"

});
