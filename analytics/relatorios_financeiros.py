import json
from datetime import datetime

TIPOS_ENTRADA = [
    "RECEITA",
    "DEPOSITO",
    "VENDA_ATIVO",
    "RESGATE_INVESTIMENTO",
    "RESGATE_META"
]

def eh_entrada(tipo) :
    return tipo in TIPOS_ENTRADA

def calcular_entradas(transacoes) :
    total = 0

    for transacao in transacoes :
        if eh_entrada(transacao["tipo"]) :
            total += transacao["valor"]

    return total

def calcular_saidas(transacoes) :
    total = 0

    for transacao in transacoes :
        if not eh_entrada(transacao["tipo"]) :
            total += transacao["valor"]

    return total

def calcular_resultado(transacoes) :
    entradas = calcular_entradas(transacoes)
    saidas = calcular_saidas(transacoes)

    return entradas - saidas

def resumir_por_categoria(transacoes) :
    categorias = {}

    for transacao in transacoes :
        categoria = transacao["categoria"]
        valor = transacao["valor"]
        tipo = transacao["tipo"]

        if categoria not in categorias :
            categorias[categoria] = {
                "quantidade": 0,
                "entradas": 0,
                "saidas": 0,
                "total": 0
            }

        categorias[categoria]["quantidade"] += 1
        categorias[categoria]["total"] += valor

        if eh_entrada(tipo) :
            categorias[categoria]["entradas"] += valor
        else :
            categorias[categoria]["saidas"] += valor

    return categorias

def ordenar_categoria(categorias) :
    categorias_ordenadas = sorted(
        categorias.items(),
        key=lambda item: item[1]["total"],
        reverse=True
    )

    return categorias_ordenadas

def pegar_mes(data_hora) :
    data = datetime.fromisoformat(data_hora)
    return data.strftime("%Y-%m")

def gerar_relatorios(transacoes, metas) :
    entradas = calcular_entradas(transacoes)
    saidas = calcular_saidas(transacoes)
    resultado = calcular_resultado(transacoes)

    total_metas = calcular_total_metas(metas)
    metas_ativas = contar_metas_ativas(metas)

    categorias = resumir_por_categoria(transacoes)
    categorias_ordenadas = ordenar_categoria(categorias)
    categorias_formatadas = formatar_categorias_para_json(categorias_ordenadas)

    resumo_mensal = resumir_por_mes(transacoes)

    if len(categorias_ordenadas) > 0 :
        categoria_principal = categorias_ordenadas[0][0]
    else :
        categoria_principal = "-"

    relatorio = {
        "entradas": entradas,
        "saidas": saidas,
        "resultado": resultado,
        "categoriaPrincipal": categoria_principal,
        "categorias": categorias_formatadas,
        "resumoMensal": resumo_mensal,
        "totalMetas": total_metas,
        "metasAtivas": metas_ativas
    }

    relatorio["insight"] = gerar_insight(relatorio)

    return relatorio

def gerar_insight(relatorio) :
    entradas = relatorio["entradas"]
    saidas = relatorio["saidas"]
    resultado = relatorio["resultado"]
    categoria_principal = relatorio["categoriaPrincipal"]

    if entradas == 0 and saidas == 0 :
        return "Ainda não existem movimentações suficientes para gerar uma analise."
    
    if resultado > 0 :
        return f"Suas entradas superaram suas saidas em R$ {resultado:.2f}."
    
    if resultado < 0 :
        return f"Suas saidas superaram suas entradas em R$ {abs(resultado):.2f}."
    
    return "Suas entradas e saidas ficaram equilibradas no periodo."

def ler_dados_json(caminho) :
    with open(caminho, "r", encoding="utf-8") as arquivo :
        dados = json.load(arquivo)

    return dados

def resumir_por_mes(transacoes) :
    meses = {}

    for transacao in transacoes :
        mes = pegar_mes(transacao["dataHora"])
        valor = transacao["valor"]
        tipo = transacao["tipo"]

        if mes not in meses :
            meses[mes] = {
                "entradas": 0,
                "saidas": 0,
                "resultado": 0,
                "quantidade": 0
            }
        meses[mes]["quantidade"] += 1

        if eh_entrada(tipo) :
            meses[mes]["entradas"] += valor
        else : 
            meses[mes]["saidas"] += valor
        
        meses[mes]["resultado"] = meses[mes]["entradas"] - meses[mes]["saidas"]

    return meses

def calcular_total_metas(metas) :
    total = 0

    for meta in metas :
        total += meta["valorAtual"]

    return total

def contar_metas_ativas(metas) :
    total = 0

    for meta in metas :
        if meta["status"] == "EM_ANDAMENTO" :
            total += 1
    
    return total

def salvar_relatorio_json(caminho, relatorio) :
    with open(caminho, "w", encoding="utf-8") as arquivo :
        json.dump(relatorio, arquivo, ensure_ascii=False, indent=4)

def formatar_categorias_para_json(categorias_ordenadas) :
    categorias_formatadas = []

    for nome, dados in categorias_ordenadas :
        categoria = {
            "nome": nome,
            "quantidade": dados["quantidade"],
            "entradas": dados["entradas"],
            "saidas": dados["saidas"],
            "total": dados["total"]
        }

        categorias_formatadas.append(categoria)

    return categorias_formatadas

dados = ler_dados_json("analytics/dados_relatorios.json")
transacoes = dados["transacoes"]
metas = dados["metas"]

relatorio = gerar_relatorios(transacoes, metas)

salvar_relatorio_json("analytics/relatorio_saida.json", relatorio)

print("Relatorio salvo com sucesso")

print("Insight:")
print(relatorio["insight"])

