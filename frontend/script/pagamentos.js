const API_URL = "http://localhost:8080";

const formPagamento = document.getElementById("form-pagamento");

const selectMetodoPagamento = document.getElementById("metodoPagamento");
const inputDestinoPagamento = document.getElementById("destinoPagamento");
const ajudaDestinoPagamento = document.getElementById("ajudaDestinoPagamento");

const mensagemPagamento = document.getElementById("mensagem-pagamento");

const listaPagamentos = document.getElementById("lista-pagamentos");

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


async function carregarPagamentos() {
    const resposta = await fetch(`${API_URL}/pagamentos`);

    if (!resposta.ok) {
        listaPagamentos.innerHTML = `<p class="texto-vazio">Erro ao carregar pagamentos.</p>`;
        return;
    }

    const pagamentos = await resposta.json();

    if (pagamentos.length === 0) {
        listaPagamentos.innerHTML = `<p class="texto-vazio">Nenhum pagamento encontrado.</p>`;
        return;
    }

    listaPagamentos.innerHTML = "";

    pagamentos.forEach((pagamento) => {
        const item = document.createElement("div");
        item.classList.add("item-pagamento");

        item.innerHTML = `
            <div class="pagamento-info">
                <strong>${formatarMetodo(pagamento.metodo)}</strong>
                <span>${pagamento.destino}</span>
            </div>

            <div class="pagamento-status">
                <span>${pagamento.status}</span>
            </div>

            <div class="pagamento-valor">
                <strong>${formatarMoeda(pagamento.valor)}</strong>
                <span>${formatarDataHora(pagamento.dataHora)}</span>
            </div>

            <button class="botao-comprovante" type="button">
                Ver comprovante
            </button>
            
        `;
        listaPagamentos.appendChild(item);
        
        const botaoComprovante = item.querySelector(".botao-comprovante");

        botaoComprovante.addEventListener("click", () => {
            const comprovante = {
                valor: pagamento.valor,
                contaOrigem: pagamento.conta.numero,
                contaDestino: pagamento.destino,
                pagador: usuarioLogado.nomeSocial || usuarioLogado.nome,
                metodo:
                    pagamento.metodo === "PIX" ? "Pix" :
                    pagamento.metodo === "BOLETO" ? "Pagamento de boleto" :
                    "Pagamento por transferencia",
                dataHora: pagamento.dataHora,
                status: pagamento.status,
                codigoAutenticacao: pagamento.codigoAutenticacao
            };

            localStorage.setItem("ultimoComprovante", JSON.stringify(comprovante));
            window.location.href = "comprovante.html";
        });
    }); 
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

function formatarMetodo(metodo) {
    if (metodo === "PIX") {
        return "Pix";
    }

    if (metodo === "BOLETO") {
        return "Boleto";
    }

    return "Transferencia";
}

function atualizarCampoDestino() {
    const metodo = selectMetodoPagamento.value;

    if (metodo === "TRANSFERENCIA") {
        inputDestinoPagamento.placeholder = "Digite o numero da conta destino";
        ajudaDestinoPagamento.textContent = "Use apenas o numero da conta de quem vai receber.";
    } else if (metodo === "PIX") {
        inputDestinoPagamento.placeholder = "Email, CPF, telefone ou chave aleatoria";
        ajudaDestinoPagamento.textContent = "Digite a chave Pix cadastrada pela pessoa: email, CPF, telefone ou chave aleatoria.";
    } else if (metodo === "BOLETO") {
        inputDestinoPagamento.placeholder = "Digite o codigo do boleto";
        ajudaDestinoPagamento.textContent = "Informe o codigo ficticio do boleto para registrar o pagamento.";
    }

    inputDestinoPagamento.value = "";
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
            pagador: usuarioLogado.nomeSocial || usuarioLogado.nome,
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

selectMetodoPagamento.addEventListener("change", atualizarCampoDestino);




carregarContaUsuario();
carregarPagamentos();
atualizarCampoDestino();
