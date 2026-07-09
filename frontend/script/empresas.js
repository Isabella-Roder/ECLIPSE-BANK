const API_URL = "http://localhost:8080";

const formEmpresa = document.getElementById("form-empresa");
const tabelaEmpresas = document.getElementById("tabela-empresas");
const cardsContasEmpresas = document.getElementById("cards-contas-empresas");
const mensagemEmpresa = document.getElementById("mensagem-empresa");
const inputCnpj = document.getElementById("cnpj");
const inputTelefoneEmpresa = document.getElementById("telefoneEmpresa");
const totalEmpresas = document.getElementById("total-empresas");
const totalContasEmpresas = document.getElementById("total-contas-empresas");
const saldoEmpresas = document.getElementById("saldo-empresas");

function mascararCnpj(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 14);
    valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

    return valor;
}

function mascararTelefone(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    return valor;
}

function formatarMoeda(valor) {
    return (valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function textoQuantidade(quantidade, singular, plural) {
    return quantidade === 1 ? `1 ${singular}` : `${quantidade} ${plural}`;
}

inputCnpj.addEventListener("input", () => {
    inputCnpj.value = mascararCnpj(inputCnpj.value);
});

inputTelefoneEmpresa.addEventListener("input", () => {
    inputTelefoneEmpresa.value = mascararTelefone(inputTelefoneEmpresa.value);
});

async function carregarEmpresas() {
    const resposta = await fetch(`${API_URL}/empresas`);

    if (!resposta.ok) {
        tabelaEmpresas.innerHTML = `
            <tr>
                <td colspan="6">Nao foi possivel carregar as empresas.</td>
            </tr>
        `;
        return;
    }

    const empresas = await resposta.json();

    tabelaEmpresas.innerHTML = "";
    cardsContasEmpresas.innerHTML = "";
    totalEmpresas.textContent = textoQuantidade(empresas.length, "empresa", "empresas");
    totalContasEmpresas.textContent = "0 contas";
    saldoEmpresas.textContent = formatarMoeda(0);

    if (empresas.length === 0) {
        tabelaEmpresas.innerHTML = `
            <tr>
                <td colspan="6">Nenhuma empresa cadastrada ainda.</td>
            </tr>
        `;
        cardsContasEmpresas.innerHTML = `<p class="texto-vazio">Nenhuma conta empresarial cadastrada ainda.</p>`;
        return;
    }

    const contas = [];

    for (const empresa of empresas) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${empresa.id}</td>
            <td>${empresa.razaoSocial}</td>
            <td>${empresa.nomeFantasia}</td>
            <td>${empresa.cnpj}</td>
            <td>${empresa.telefone}</td>
            <td>${empresa.email}</td>
        `;

        tabelaEmpresas.appendChild(linha);

        const conta = await buscarContaEmpresa(empresa.id);

        if (conta) {
            contas.push(conta);
            renderizarContaEmpresa(conta);
        }
    }

    const saldoTotal = contas.reduce((total, conta) => total + (conta.saldo || 0), 0);

    totalContasEmpresas.textContent = textoQuantidade(contas.length, "conta", "contas");
    saldoEmpresas.textContent = formatarMoeda(saldoTotal);

    if (contas.length === 0) {
        cardsContasEmpresas.innerHTML = `<p class="texto-vazio">Nenhuma conta empresarial encontrada.</p>`;
    }
}

async function buscarContaEmpresa(empresaId) {
    const resposta = await fetch(`${API_URL}/empresas/${empresaId}/conta`);

    if (!resposta.ok) {
        return null;
    }

    return await resposta.json();
}

function renderizarContaEmpresa(conta) {
    const card = document.createElement("article");
    card.classList.add("empresa-conta-card");

    const nomeEmpresa = conta.empresa ? conta.empresa.nomeFantasia : "Empresa";
    const tipoChavePix = conta.tipoChavePix || "PIX";

    card.innerHTML = `
        <div class="empresa-conta-topo">
            <div>
                <span>Conta PJ</span>
                <strong>${nomeEmpresa}</strong>
            </div>
            <span class="selo-tipo">${tipoChavePix}</span>
        </div>

        <div class="empresa-conta-saldo">
            <span>Saldo disponível</span>
            <strong>${formatarMoeda(conta.saldo)}</strong>
        </div>

        <div class="empresa-conta-info">
            <div>
                <span>Número</span>
                <strong>${conta.numero}</strong>
            </div>
            <div>
                <span>Limite</span>
                <strong>${formatarMoeda(conta.limite)}</strong>
            </div>
            <div>
                <span>Chave Pix</span>
                <strong>${conta.chavePix}</strong>
            </div>
            <div>
                <span>Titular</span>
                <strong>${conta.titular}</strong>
            </div>
        </div>
    `;

    cardsContasEmpresas.appendChild(card);
}

formEmpresa.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const empresa = {
        razaoSocial: document.getElementById("razaoSocial").value,
        nomeFantasia: document.getElementById("nomeFantasia").value,
        cnpj: document.getElementById("cnpj").value,
        telefone: document.getElementById("telefoneEmpresa").value,
        email: document.getElementById("emailEmpresa").value,
        senha: document.getElementById("senhaEmpresa").value
    };

    const resposta = await fetch(`${API_URL}/empresas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(empresa)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        mensagemEmpresa.textContent = erro.erro || "Erro ao cadastrar empresa.";
        return;
    }

    mensagemEmpresa.textContent = "Empresa e conta empresarial cadastradas com sucesso.";
    formEmpresa.reset();
    await carregarEmpresas();
});

carregarEmpresas();
