const usuarioLayout = JSON.parse(localStorage.getItem("usuarioLogado"));

function verificarLogin() {
    if (usuarioLayout) {
        criarSidebarUsuario();
        return;
    }else {
        criarSidebar();
        return;
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
            <a href="dados.html">Meus dados</a>
            <a href="transferencias.html">Transferencias</a>
            <a href="extrato.html">Extrato</a>
            <a href="#">Relatorios</a>
            <button id="btn-logout" type="button">Sair</button>
        </nav>
    `;
    document.body.prepend(sidebar);

    const botaoLogout = document.getElementById("btn-logout");

    botaoLogout.addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "login.html";
    });
}

function criarSidebar() {
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";

    sidebar.innerHTML = `
        <h1>Eclipse</h1>

        <nav>
            <a href="index.html">Dashboard</a>
            <a href="usuarios.html">Usuarios</a>
            <a href="contas.html">Contas</a>
            <a href="dados.html">Meus dados</a>
            <a href="minha-conta.html">Minha conta</a>
            <a href="transferencias.html">Transferencias</a>
            <a href="extrato.html">Extrato</a>
            <a href="#">Relatorios</a>
            <a href="login.html">Login</a>
        </nav>
    `;

    document.body.prepend(sidebar);
}

verificarLogin();