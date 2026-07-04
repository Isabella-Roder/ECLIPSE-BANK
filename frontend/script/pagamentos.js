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

    if (metodo === "TRANSFERENCIA" || metodo === "PIX" || metodo === "BOLETO") {
        const pagamento = {
            contaOrigem: contaOrigem.id,
            destino: destino,
            valor: converterDinheiroParaNumero(valor),
            metodo: metodo
        };

        const resposta = await fetch(`${API_URL}/pagamentos`, {
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

        const pagamentoSalvo = await resposta.json();

        mensagemPagamento.textContent = 
            metodo === "PIX" ? "Pix realizado com sucesso." :
            metodo === "BOLETO" ? "Boleto pago com sucesso." :
            "Transferencia realizada com sucesso.";

        const comprovante = {
            valor: pagamentoSalvo.valor,
            contaOrigem: contaOrigem.numero,
            contaDestino: pagamentoSalvo.destino,
            metodo: 
                pagamentoSalvo.metodo === "PIX" ? "Pix" :
                pagamentoSalvo.metodo === "BOLETO" ? "Pagamento de boleto" :
                "Pagamento por transferencia",
            dataHora: pagamentoSalvo.dataHora,
            status: pagamentoSalvo.status,
            codigoAutenticacao: pagamentoSalvo.codigoAutenticacao
        };

        localStorage.setItem("ultimoComprovante", JSON.stringify(comprovante));
        formPagamento.reset();
        window.location.href = "comprovante.html";

    }else {
        mensagemPagamento.textContent = "Metodo ainda não implementado.";
    }

    
});

carregarContaUsuario();