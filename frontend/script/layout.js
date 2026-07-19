const usuarioLayout = JSON.parse(localStorage.getItem("usuarioLogado"));
const empresaLayout = JSON.parse(localStorage.getItem("empresaLogada"));
const API_URL_LAYOUT = "http://localhost:8080";

function verificarLogin() {
    if (usuarioLayout) {
        criarSidebarUsuario();
    } else if (empresaLayout) {
        criarSidebarEmpresa();
    } else {
        criarSidebarAdmin();
    }
}

function criarSidebarUsuario() {
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";

    sidebar.innerHTML = `
        <h1>Eclipse</h1>

        <nav>
            <a href="index.html">Dashboard</a>
            <a href="minha-conta.html">Minha conta</a>
            <a href="cartoes.html">Cartões</a>
            <a href="dados.html">Meus dados</a>
            <a href="transferencias.html">Transferencias</a>
            <a href="pagamentos.html">Pagamentos</a>
            <a href="extrato.html">Extrato</a>
            <a href="comprovantes.html">Comprovantes</a>
            <a href="investimentos-dashboard.html">Dashboard investimentos</a>
            <a href="investimentos.html">Investimentos</a>
            <a href="mercado.html">Mercado B3</a>
            <a href="carteira-ativos.html">Carteira de ativos</a>
            <a href="metas.html">Metas financeiras</a>
            <a href="relatorios.html">Relatorios</a>
            <button id="btn-logout" type="button">Sair</button>
        </nav>
    `;
    document.body.prepend(sidebar);
    configurarLogout("usuarioLogado");
}

function criarSidebarEmpresa() {
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";

    sidebar.innerHTML = `
        <h1>Eclipse</h1>

        <nav>
            <a href="empresa-dashboard.html">Dashboard PJ</a>
            <a href="empresa-conta.html">Conta empresarial</a>
            <a href="empresa-pagamentos.html">Pagamentos PJ</a>
            <a href="extrato-empresa.html">Extrato PJ</a>
            <a href="empresa-cartoes.html">Cartões PJ</a>
            <a href="comprovantes.html">Comprovantes</a>
            <button id="btn-logout" type="button">Sair</button>
        </nav>
    `;

    document.body.prepend(sidebar);
    configurarLogout("empresaLogada");
}

function configurarLogout(chaveLocalStorage) {
    const botaoLogout = document.getElementById("btn-logout");

    botaoLogout.addEventListener("click", () => {
        localStorage.removeItem(chaveLocalStorage);
        window.location.href = "login.html";
    });
}

function criarSidebarAdmin() {
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";

    sidebar.innerHTML = `
        <h1>Eclipse</h1>

        <nav>
            <a href="index.html">Dashboard</a>
            <a href="usuarios.html">Usuarios</a>
            <a href="contas.html">Contas</a>
            <a href="empresas.html">Empresas</a>
            <a href="dados.html">Meus dados</a>
            <a href="minha-conta.html">Minha conta</a>
            <a href="cartoes.html">Cartões</a>
            <a href="transferencias.html">Transferencias</a>
            <a href="pagamentos.html">Pagamentos</a>
            <a href="extrato.html">Extrato</a>
            <a href="comprovantes.html">Comprovantes</a>
            <a href="investimentos-dashboard.html">Dashboard investimentos</a>
            <a href="investimentos.html">Investimentos</a>
            <a href="mercado.html">Mercado B3</a>
            <a href="carteira-ativos.html">Carteira de ativos</a>
            <a href="metas.html">Metas financeiras</a>
            <a href="relatorios.html">Relatorios</a>
            <a href="login.html">Login</a>
        </nav>
    `;

    document.body.prepend(sidebar);
}

function criarBotaoMenuMobile() {
    const botao = document.createElement("button");
    botao.className = "menu-mobile";
    botao.type = "button";
    botao.textContent = "Menu";

    const overlay = document.createElement("div");
    overlay.className = "menu-overlay";

    document.body.prepend(overlay);
    document.body.prepend(botao);

    botao.addEventListener("click", () => {
        document.body.classList.toggle("menu-aberto");
    });

    overlay.addEventListener("click", () => {
        document.body.classList.remove("menu-aberto");
    });

    const linksSidebar = document.querySelectorAll(".sidebar a");

    linksSidebar.forEach((link) => {
        link.addEventListener("click", () => {
            document.body.classList.remove("menu-aberto");
        });
    });
}

async function criarResumoContaTopo() {
    const conteudo = document.querySelector(".conteudo");

    if (!conteudo || (!usuarioLayout && !empresaLayout)) {
        return;
    }

    const dadosLogin = usuarioLayout || empresaLayout;
    const tipoConta = usuarioLayout ? "Conta PF" : "Conta PJ";
    const nome = usuarioLayout
        ? usuarioLayout.nomeSocial || usuarioLayout.nome || "Cliente"
        : empresaLayout.nomeFantasia || empresaLayout.razaoSocial || "Empresa";

    const endpoint = usuarioLayout
        ? `${API_URL_LAYOUT}/usuarios/${dadosLogin.id}/conta`
        : `${API_URL_LAYOUT}/empresas/${dadosLogin.id}/conta`;

    try {
        const resposta = await fetch(endpoint);

        if (!resposta.ok) {
            return;
        }

        const conta = await resposta.json();
        const saldo = Number(conta.saldo || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        const resumo = document.createElement("section");
        resumo.className = "resumo-conta-topo";
        resumo.setAttribute("aria-label", "Resumo da conta");

        const identidade = document.createElement("div");
        identidade.className = "resumo-conta-identidade";

        const tipo = document.createElement("span");
        tipo.textContent = tipoConta;

        const saudacao = document.createElement("strong");
        saudacao.textContent = `Olá, ${nome}`;

        identidade.append(tipo, saudacao);

        const dados = document.createElement("div");
        dados.className = "resumo-conta-dados";

        const numeroConta = document.createElement("span");
        numeroConta.textContent = `Conta ${conta.numero || "-"}`;

        const saldoConta = document.createElement("strong");
        saldoConta.className = "resumo-conta-saldo";
        saldoConta.textContent = saldo;

        dados.append(numeroConta, saldoConta);
        resumo.append(identidade, dados);
        conteudo.prepend(resumo);
    } catch (erro) {
        console.warn("Nao foi possivel carregar o resumo da conta.", erro);
    }
}

verificarLogin();
criarBotaoMenuMobile();
criarResumoContaTopo();

