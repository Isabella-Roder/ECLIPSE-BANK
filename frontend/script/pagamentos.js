const API_URL = "http://localhost:8080";

const formPagamento = document.getElementById("form-pagamento");

const mensagemPagamento = document.getElementById("mensagem-pagamento");

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "index.html";
}

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

const inputValorPagamento = document.getElementById("valorPagamento");

inputValorPagamento.addEventListener("input", () => {
    inputValorPagamento.value = mascararDinheiro(inputValorPagamento.value);
});

let contaOrigem = null;

async function carregarContaUsuario() {
    const resposta = await fetch(`${API_URL}/usuarios/${usuarioLogado.id}/conta`);

    if (!resposta.ok) {
        mensagemPagamento.textContent = "Conta não encontrada.";
        return;
    }

    contaOrigem = await resposta.json();
}

formPagamento.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!contaOrigem) {
        mensagemPagamento.textContent = "Conta ainda não carregou.";
        return;
    }

    const metodo = document.getElementById("metodoPagamento").value;
    const destino = document.getElementById("destinoPagamento").value;
    const valor = document.getElementById("valorPagamento").value;

    if (metodo === "TRANSFERENCIA") {
        const pagamento = {
            contaOrigem: contaOrigem.id,
            contaNumeroDestino: Number(destino),
            valor: converterDinheiroParaNumero(valor)
        };

        const resposta = await fetch(`${API_URL}/contas/transferir/numero`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pagamento)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            mensagemPagamento.textContent = erro.erro;
            return;
        }

        mensagemPagamento.textContent = "Transferencia realizada com sucesso.";
    }else {
        mensagemPagamento.textContent = "Metodo ainda não implementado.";
    }

    
});

carregarContaUsuario();