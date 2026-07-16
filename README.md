# Eclipse Bank

Eclipse Bank e um sistema bancario ficticio desenvolvido como projeto de portfolio. A proposta e simular um banco digital com conta de cliente, conta empresarial, pagamentos, extrato, cartoes, metas, investimentos e relatorios financeiros.

O projeto combina:

- **Java + Spring Boot** para API, regras bancarias, persistencia e operacoes principais.
- **HTML, CSS e JavaScript** para a interface web.
- **Python** para a primeira versao da camada de analytics e relatorios.

## Status

**MVP v1 em fase de fechamento.**

As principais funcionalidades bancarias ja foram implementadas. Algumas melhorias foram deixadas como roadmap para uma futura versao, como PDF de comprovantes, QR Code, camera no celular, responsividade completa e integracao mais profunda entre Java e Python.

## Tecnologias

- Java
- Spring Boot
- Spring Data JPA
- H2 Database
- HTML
- CSS
- JavaScript
- Python

## Funcionalidades Principais

### Conta e Autenticacao

- Cadastro de usuario.
- Login simples com email e senha.
- Criacao de usuario e conta pela tela de login.
- Conta corrente vinculada ao usuario.
- Saldo, limite, numero da conta e chave Pix.
- Chave Pix aleatoria.
- Logout pelo menu lateral.

### Operacoes Bancarias

- Deposito.
- Saque.
- Transferencia por numero da conta.
- Pix por chave Pix.
- Pix por telefone.
- Pagamento de boleto ficticio.
- Validacao de saldo.
- Registro automatico no extrato.

### Extrato

- Listagem de movimentacoes por conta.
- Data e horario nas movimentacoes.
- Filtro por periodo, tipo e categoria.
- Destaque visual de entradas e saidas.
- Filtros no backend e no frontend.

### Pagamentos e Comprovantes

- Central de pagamentos.
- Pagamento por transferencia, Pix e boleto.
- Historico real de comprovantes.
- Comprovante individual por ID.
- Comprovante com pagador, destino dinamico e metodo usado.
- Botao para imprimir comprovante.

### Cartoes

- Criacao de cartao por conta.
- Numero ficticio de cartao.
- Limite total e limite disponivel.
- Registro de compras.
- Fatura atual.
- Pagamento de fatura com desconto do saldo.
- Registro do pagamento de fatura no extrato.

### Metas Financeiras

- Criacao de metas.
- Valor alvo e valor guardado.
- Adicao de valor em meta.
- Cancelamento de meta.
- Devolucao do valor ao saldo no cancelamento.
- Transacoes de aporte e resgate no extrato.
- Progresso visual no frontend.

### Conta Empresa

- Cadastro de empresa com CNPJ.
- Conta empresarial criada automaticamente.
- Login empresarial.
- Dashboard PJ.
- Dados da conta empresarial.
- Pagamentos PJ.
- Extrato PJ.
- Cartoes PJ.
- Comprovantes PJ.

### Investimentos

- Produtos de renda fixa e tesouro ficticio.
- Produtos carregados pelo backend.
- Simulacao por valor e prazo.
- Aplicacao de investimento com desconto do saldo.
- Resgate com rendimento estimado.
- Indicadores financeiros via API do Banco Central.
- Mercado B3 mockado por ticker.
- Compra e venda de ativos de renda variavel.
- Carteira de ativos com preco medio, preco atual e resultado estimado.
- Dashboard de investimentos.

### Relatorios

- Tela de relatorios financeiros.
- Cards de entradas, saidas, resultado, saldo e metas.
- Resumo por categoria.
- Ultimas movimentacoes.
- Insight financeiro automatico.
- Filtros por periodo e tipo.
- Graficos no frontend usando canvas.
- Primeira camada Python em `analytics/` com:
  - leitura de JSON;
  - resumo por categoria;
  - resumo mensal;
  - leitura de metas;
  - insight automatico;
  - geracao de JSON de saida.

## Telas

- `index.html`: dashboard geral.
- `login.html`: login e abertura de conta.
- `minha-conta.html`: painel da conta do cliente.
- `dados.html`: dados cadastrais do cliente.
- `transferencias.html`: transferencias.
- `pagamentos.html`: central de pagamentos.
- `extrato.html`: extrato da conta.
- `cartoes.html`: cartao, compras e fatura.
- `metas.html`: metas financeiras.
- `comprovantes.html`: historico de comprovantes.
- `comprovante.html`: comprovante individual.
- `relatorios.html`: relatorios e graficos.
- `empresas.html`: cadastro/listagem de empresas.
- `empresa-dashboard.html`: dashboard PJ.
- `empresa-conta.html`: conta PJ.
- `empresa-pagamentos.html`: pagamentos PJ.
- `extrato-empresa.html`: extrato PJ.
- `empresa-cartoes.html`: cartoes PJ.
- `investimentos.html`: produtos e carteira de renda fixa.
- `investimento-detalhe.html`: detalhe e simulacao de produto.
- `investimentos-dashboard.html`: dashboard de investimentos.
- `mercado.html`: consulta de ativos.
- `ativo-detalhe.html`: simulacao e compra de ativo.
- `carteira-ativos.html`: carteira de renda variavel.

## Estrutura

```text
backend/
  src/main/java/com/eclipsebank/backend/
    controller/
    dto/
    enums/
    model/
    repository/
    service/

frontend/
  html/
  css/
  script/

analytics/
  dados_relatorios.json
  relatorio_saida.json
  relatorios_financeiros.py
```

## Como Rodar

### Backend

Use o script:

```powershell
.\rodar-backend.bat
```

Ou rode o Spring Boot pela IDE.

### Frontend

Abra os arquivos da pasta `frontend/html/` no navegador, com o backend rodando em `http://localhost:8080`.

### Analytics Python

Rode:

```powershell
python analytics/relatorios_financeiros.py
```

O script le `analytics/dados_relatorios.json` e gera `analytics/relatorio_saida.json`.

## Roadmap

As proximas melhorias estao documentadas em `ROADMAP.md`.

## Observacao

Este projeto e ficticio e foi criado para estudo e portfolio. As operacoes financeiras sao simuladas.
