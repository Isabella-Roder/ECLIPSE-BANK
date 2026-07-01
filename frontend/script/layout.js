function criarSidebar() {
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";

    sidebar.innerHTML = `
        <h1>Eclipse</h1>

        <nav>
            <a href="index.html">Dashboard</a>
            <a href="usuarios.html">Usuários</a>
            <a href="contas.html">Contas</a>
            <a href="extrato.html">Extrato</a>
            <a href="#">Relatórios</a>
        </nav>
    `;

    document.body.prepend(sidebar);
}

criarSidebar();
