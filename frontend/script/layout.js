const usuarioLayout = JSON.parse(localStorage.getItem("usuarioLogado"));
const empresaLayout = JSON.parse(localStorage.getItem("empresaLogada"));

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
            <a href="#">Relatorios</a>
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
            <a href="empresa-dados.html">Dados da empresa</a>
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
            <a href="#">Relatorios</a>
            <a href="login.html">Login</a>
        </nav>
    `;

    document.body.prepend(sidebar);
}

verificarLogin();
