# Roadmap - Eclipse Bank

Este arquivo guarda as ideias que ficaram para uma futura versao do Eclipse Bank. A v1/MVP concentra as principais funcionalidades bancarias e deixa estes pontos como evolucao.

## V2 - Melhorias Bancarias

- Baixar comprovante em PDF.
- Melhorar comprovantes com layout de impressao mais completo.
- Pix por QR Code ficticio.
- Leitura de QR Code pela camera no celular.
- Leitura de codigo de barras de boleto pela camera.
- Categorias editaveis pelo usuario.
- Edicao e exclusao de lancamentos.
- Separacao mais forte entre area de cliente e area administrativa.
- Login com Google.

## V2 - Frontend

- [~] Responsividade completa para celular.
- [x] Menu mobile.
- [~] Melhorar sidebar.
- Mostrar resumo da conta no topo.
- Revisar textos e mensagens de erro.
- Adicionar estados vazios mais bonitos nas tabelas.
- Adicionar telas de ajuda/onboarding.

## V2 - Python e Analytics

- Transformar `analytics/relatorios_financeiros.py` em uma API Flask ou FastAPI.
- Fazer o Spring Boot enviar dados reais para a API Python.
- Gerar graficos com Matplotlib, Plotly ou outra biblioteca.
- Exportar relatorios em PDF ou CSV.
- Criar indicadores financeiros mais avancados.
- Criar recomendacoes automaticas de economia.
- Criar relatorios especificos de investimentos.

## V2 - Investimentos

- Integrar API real para acoes e fundos imobiliarios.
- Buscar ativos como MXRF11, BTLG11 e PETR4 por API externa.
- Exibir historico de cotacoes.
- Grafico de evolucao da carteira.
- Rendimento do mes no dashboard de investimentos.
- Perfil de investidor com sugestoes de produtos.

## V2 - Infraestrutura

- Trocar H2 por PostgreSQL ou MySQL.
- Criar dados seed para demonstracao.
- Melhorar tratamento global de erros.
- Adicionar testes automatizados.
- Documentar endpoints principais.
- Preparar deploy.

## Proximo Projeto

Uma boa evolucao depois do Eclipse Bank e criar um sistema com:

- Spring Boot como backend principal.
- Flask como frontend/renderizador de dashboards ou camada web Python.
- Python para analytics, relatorios e graficos.

Sugestao: um SaaS de gestao financeira empresarial com contas a pagar, contas a receber, fluxo de caixa, dashboards e relatorios.
