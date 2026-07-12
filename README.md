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
- Telefone no cadastro de usuario.
- Login simples com email e senha.
- Logout pelo frontend.
- Rota unica `/abertura-conta` para criar usuario e conta juntos.
- Cadastro e listagem de contas.
- Busca de conta por ID.
- Busca de conta pelo usuario logado.
- Conta vinculada a usuario.
- Saldo, limite, numero da conta e chave Pix.
- Numero da conta gerado automaticamente pelo backend.
- Chave Pix aleatoria na abertura de conta.
- Validacao para usuario ter apenas uma conta.
- Validacao de numero de conta unico.
- Validacao de chave Pix unica.
- Deposito em conta.
- Saque em conta.
- Transferencia entre contas.
- Transferencia por numero da conta.
- Pix por chave Pix e telefone.
- Modulo de pagamentos implementado com transferencia, Pix e boleto ficticio.
- Entidade, repository, service e controller de pagamentos.
- Rota `POST /pagamentos`.
- Pagamentos por transferencia, Pix e boleto salvos no banco.
- Historico visual de pagamentos em `pagamentos.html`.
- Historico real de comprovantes salvo no banco.
- Entidade, repository, service e controller de comprovantes.
- Rotas `GET /comprovantes/{id}` e `GET /contas/{contaId}/comprovantes`.
- Botao para ver comprovante pelo historico de pagamentos.
- Validacao de saldo para saque e transferencia.
- Registro automatico de deposito, saque, transferencia, Pix e boleto no extrato.
- Data e horario nas movimentacoes do extrato.
- Transacoes vinculadas a conta.
- Extrato por conta.
- Filtros avancados do extrato no backend por tipo, categoria e periodo.
- Rota unica `/contas/{contaId}/transacoes/filtro` para consulta filtrada do extrato.
- Modulo inicial de cartoes implementado.
- Cartao vinculado a conta, com numero ficticio, limite total, limite disponivel e status.
- Criacao e consulta de cartao por conta.
- Modulo inicial de compras no cartao implementado.
- Compra no cartao valida limite disponivel e diminui o limite apos aprovacao.
- Modulo inicial de investimentos implementado.
- Investimentos vinculados a conta, com produto, tipo, perfil, valor aplicado e rendimento estimado.
- Aplicacao de investimento desconta saldo da conta.
- Resgate de investimento implementado, devolvendo valor aplicado + rendimento estimado ao saldo.
- Investimentos possuem status `ATIVO` e `RESGATADO`.
- Produtos de investimento fornecidos pelo backend e renderizados automaticamente no frontend.
- Integracao inicial com API do Banco Central para indicadores financeiros.
- Simulacao de investimento por valor e prazo na tela de detalhe do produto.
- Prazo da aplicacao salvo no investimento e exibido na carteira.
- Calculo de rendimento no backend usando taxa do produto e prazo informado.
- Indicadores Selic, CDI estimado e IPCA exibidos na tela de investimentos.
- Vitrine de produtos ampliada com CDB, Tesouro, fundos, ETF e cripto ficticia.
- Tela de cartoes implementada.
- Criacao de cartao pelo frontend.
- Registro de compras no cartao pelo frontend.
- Listagem de compras do cartao pelo frontend.
- Dashboard com saldo total, total de contas e total de usuarios.
- Cadastro de empresas com CNPJ.
- Conta empresarial criada automaticamente.
- Login empresarial.
- Pagamentos, extrato, comprovantes e cartoes PJ.
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
- Transferencia por numero da conta pelo HTML.
- Tela de pagamentos.
- Pagamentos por transferencia, Pix e boleto pelo HTML.
- Historico visual de pagamentos pelo HTML.
- Tela de historico real de comprovantes.
- Tela de cartoes.
- Criacao, consulta e compras no cartao pelo HTML.
- Tela de extrato.
- Consulta de extrato por conta pelo HTML.
- Filtros do extrato por tipo, categoria e periodo integrados com o backend.
- Extrato com destaque visual de entradas, saidas e tipo de movimentacao.
- Tela `minha-conta`.
- Consulta de dados da conta pelo HTML.
- `minha-conta.html` reorganizada como painel bancario do cliente.
- Ultimas movimentacoes e ultimos comprovantes exibidos na area da conta.
- Tela `dados`.
- Consulta de dados do usuario pelo HTML.
- `dados.html` reorganizada como perfil cadastral do cliente.
- Dados pessoais separados em identidade, contato e seguranca/cadastro.
- Tela de login.
- Login pelo HTML usando a rota `/login`.
- Tratamento de erro no login pelo frontend.
- Criacao de usuario e conta pela tela de login.
- Confirmacao de senha na abertura de conta.
- Botao mostrar/ocultar senha.
- Email preenchido automaticamente no login apos criar conta.
- Usuario logado salvo no `localStorage`.
- Logout pelo menu lateral.
- Telas `dados`, `minha-conta`, `extrato`, `transferencias`, `pagamentos` e `comprovantes` usando o usuario logado parcialmente.
- Mascaras de CPF, telefone e dinheiro/valor.
- Tela de comprovante da ultima operacao.
- Tela de historico de comprovantes.
- Comprovante acessivel pelo historico visual de pagamentos.
- Comprovante individual carregado pelo backend usando ID.
- Comprovante com pagador e destino dinamico conforme o metodo.
- Metodo do comprovante exibido como selo visual.
- Botao para imprimir comprovante.
- Area PJ com dashboard, conta empresarial, pagamentos, extrato, comprovantes e cartoes.
- Tela de investimentos com vitrine automatica de produtos, detalhe do produto, simulacao, aplicacao, resgate, resumo da carteira e listagem de investimentos.

## Telas Atuais

- `index.html`: dashboard geral.
- `usuarios.html`: cadastro e listagem de usuarios.
- `contas.html`: cadastro, listagem, deposito e saque de contas.
- `transferencias.html`: transferencia entre contas.
- `pagamentos.html`: central de pagamentos.
- `cartoes.html`: consulta do cartao, criacao de cartao e registro de compras.
- `comprovantes.html`: historico real de comprovantes.
- `extrato.html`: consulta de extrato por conta.
- `minha-conta.html`: painel bancario do cliente, com saldo, dados da conta, ultimas movimentacoes e comprovantes.
- `dados.html`: perfil cadastral do cliente, com identidade, contato e seguranca/cadastro.
- `login.html`: entrada do usuario no sistema.
- `comprovante.html`: comprovante visual da ultima operacao.
- `empresa-dashboard.html`: dashboard da empresa logada.
- `empresa-conta.html`: dados da conta empresarial.
- `empresa-pagamentos.html`: pagamentos por conta PJ.
- `extrato-empresa.html`: extrato da conta PJ.
- `empresa-cartoes.html`: cartao PJ e compras empresariais.
- `investimentos.html`: carteira de investimentos, vitrine automatica de produtos e resumo.
- `investimento-detalhe.html`: detalhe do produto, simulacao de rendimento e aplicacao.

## Funcionalidades Planejadas

- Mascara de data.
- Download de comprovante em PDF.
- Melhorias visuais na sidebar.
- Resumo da conta no canto superior direito.
- Reset do banco H2 para limpar dados de teste.

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
- Resetar banco H2 de desenvolvimento.
- Melhorar Pix e boleto ficticio.
- Baixar comprovante em PDF.
- Login com conta Google futuramente.
- Separacao real entre cliente e administracao.
- Cartoes com tela e compras implementados parcialmente.
- Faturas.
- Metas financeiras.
- Relatorios com Python.
- Graficos.
- Integracao futura com API da B3 para modulo de investimentos.
- Integracao futura com API de acoes e fundos imobiliarios, incluindo ativos como MXRF11 e BTLG11.
- Exportacao de relatorios.

## Observacao

Este projeto ainda esta em desenvolvimento. O login simples, logout, area do cliente, extrato com horario, mascaras principais, pagamentos por transferencia, Pix e boleto, historico real de comprovantes e comprovante visual ja existem. Ainda falta proteger melhor as paginas, separar cliente e administracao de forma mais completa, evoluir PDF e relatorios.
