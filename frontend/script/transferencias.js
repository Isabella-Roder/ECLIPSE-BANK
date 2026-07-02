const API_URL = "http://localhost:8080";

const formTransferencia = document.getElementById("form-transferencia");
const mensagemTransferencia = document.getElementById("mensagem-transferencia");

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
        valor: Number(document.getElementById("valorTransferencia").value)
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
    formTransferencia.reset();

});