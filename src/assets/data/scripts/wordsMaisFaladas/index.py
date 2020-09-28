# array de palavras separadas
# tempo da legenda
import re
def catalogarSubtitle(caminhoFileSrt):
    # pattern = r"(?P<order>\d+)\n(?P<start>[\d:,]+)\s+-{2}\>\s+(?P<end>[\d:,]+)\n(?P<text>[\s\S]*?(?=\n{2}|$))"
    pattern = r"\d+\n(?P<start>[\d:,]+)\s+-{2}\>\s+(?P<end>[\d:,]+)\n(?P<text>[\s\S]*?(?=\n{2}|$))"
    retornar = []
    caminhoFileSrt = 'src/assets/data/scripts/wordsMaisFaladas/' + caminhoFileSrt
    
    with open(caminhoFileSrt, 'r', encoding='utf-8') as fileStr:
        fileStr = fileStr.read()
    listaDeCardBruto = re.findall(pattern, fileStr)
    
    timeStart = 0
    timeEnd = 1
    text = 2
    for card in listaDeCardBruto:
        textComReplace = re.sub(r"<[^>]*>", "", card[text]) #remove html
        textComReplace = textComReplace.replace("\n", "")
        if not '#' in textComReplace:
            retornar.append({textComReplace : {"timeStart" : card[timeStart], "timeEnd" : card[timeEnd]}})
    return retornar

resultado = catalogarSubtitle("teste.txt")

for frase in resultado:
    print(frase)


# catalogarSubtitle(file)['separadas']['tempo']

# retornar = {
#     "frase": {
#         "pontuação" : 200,
#     },
#     "word" : {
#         "tempo" : "00:40:60",
#         "vista" : 2645,
#     }
# }