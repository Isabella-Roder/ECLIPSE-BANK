const API_URL = "http://localhost:8080";

const formTransferencia = document.getElementById("form-transferencia");
const mensagemTransferencia = document.getElementById("mensagem-transferencia");

formTransferencia.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const transferencia = {
        contaOrigemId: Number(document.getElementById("contaOrigemId").value),
        contaDestinoId: Number(document.getElementById("contaDestinoId").value),
        valor: Number(document.getElementById("valorTransferencia").value)
    };

    const resposta = await fetch(`${API_URL}/contas/transferir`, {
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