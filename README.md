# Eclipse Bank

Eclipse Bank e um sistema bancario ficticio com foco em controle financeiro, dashboard e operacoes bancarias simuladas.

O projeto esta sendo desenvolvido como uma aplicacao web, usando Java Spring Boot no backend e HTML, CSS e JavaScript no frontend. Futuramente, Python sera usado para relatorios, graficos e analises financeiras.

## Tecnologias

- Java
- Spring Boot
- Spring Data JPA
- H2 Database
- HTML
- CSS
- JavaScript
- Python futuramente para relatorios e graficos

## O Que Ja Existe

### Backend

- API REST com Spring Boot.
- Banco H2 configurado.
- Persistencia com JPA.
- Cadastro e listagem de usuarios.
- Busca de usuario por ID.
- Campo de nome social no usuario.
- CPF salvo como texto.
- Validacao de CPF unico.
- Validacao de email unico.
- Validacao de campos obrigatorios do usuario.
- Login simples com email e senha.
- Cadastro e listagem de contas.
- Busca de conta por ID.
- Conta vinculada a usuario.
- Saldo, limite, numero da conta e chave Pix.
- Validacao para usuario ter apenas uma conta.
- Validacao de numero de conta unico.
- Validacao de chave Pix unica.
- Deposito em conta.
- Saque em conta.
- Transferencia entre contas.
- Validacao de saldo para saque e transferencia.
- Registro automatico de deposito, saque e transferencia no extrato.
- Transacoes vinculadas a conta.
- Extrato por conta.
- Dashboard com saldo total, total de contas e total de usuarios.
- Tratamento de erros com `ErroController`.
- Categorias fixas.

### Frontend

- Layout escuro inspirado na identidade visual do Eclipse Bank.
- Sidebar reutilizavel com `layout.js`.
- Dashboard principal.
- Tela de usuarios.
- Cadastro de usuarios pelo HTML.
- Listagem de usuarios pelo HTML.
- Tela de contas.
- Cadastro de contas pelo HTML.
- Listagem de contas pelo HTML.
- Deposito e saque pelo HTML.
- Tela de transferencias.
- Transferencia entre contas pelo HTML.
- Tela de extrato.
- Consulta de extrato por conta pelo HTML.
- Tela `minha-conta`.
- Consulta de dados da conta pelo HTML.
- Tela `dados`.
- Consulta de dados do usuario pelo HTML.
- Tela de login.
- Login pelo HTML usando a rota `/login`.
- Usuario logado salvo no `localStorage`.

## Telas Atuais

- `index.html`: dashboard geral.
- `usuarios.html`: cadastro e listagem de usuarios.
- `contas.html`: cadastro, listagem, deposito e saque de contas.
- `transferencias.html`: transferencia entre contas.
- `extrato.html`: consulta de extrato por conta.
- `minha-conta.html`: dados bancarios de uma conta.
- `dados.html`: dados pessoais de um usuario.
- `login.html`: entrada do usuario no sistema.

## Estrutura Geral

```text
backend/
  src/main/java/com/eclipsebank/backend/
    controller/
    dto/
    model/
    repository/
    service/

frontend/
  html/
  css/
  script/
```

## Funcionalidades Pendentes

- Proteger telas usando o usuario logado.
- Usar o usuario logado para preencher dados automaticamente, sem digitar ID.
- Login com conta Google futuramente.
- Separacao real entre cliente e administracao.
- Cartoes.
- Faturas.
- Metas financeiras.
- Relatorios com Python.
- Graficos.
- Investimentos ficticios.
- Integracao futura com API da B3 para modulo de investimentos.
- Exportacao de relatorios.
- Filtros avancados no extrato por data, tipo e categoria.

## Observacao

Este projeto ainda esta em desenvolvimento. O login simples ja existe, mas algumas telas ainda usam IDs digitados manualmente. Futuramente, o sistema deve identificar automaticamente o usuario logado, proteger as paginas e separar melhor a experiencia do cliente e da administracao.
