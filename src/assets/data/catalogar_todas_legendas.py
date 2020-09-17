from playsound import playsound
from os import system 
from time import sleep
nome_movie = input('Nome do Movie html: ')
movie = input('Nome do Movie yarn: ')
# nome_movie = "DIARIOS DE UM VAMPIRO"
# movie = "The Vampire Diaries"

destino = 'pyoutiput.js'
maximo = 1  #sessao
min = 25
max = 80 #words unicas

from linkDef import link

try:
    with open('words.txt', 'r', encoding="utf-8") as words:
        words = words.read().split('\n')
except Exception as e:
    input(e)

def word_unica(lista):
    unicas = []
    for frase in lista:
        for palavra in frase.lower().split():
            for char in "!?.,":
                palavra = palavra.replace(char, "")
            if palavra not in unicas:
                unicas.append(palavra)
    return unicas


def pontos_lista(lista):

    resultado = 0
    for palavra in word_unica(lista):
        for char in "!.?,":
            palavra = palavra.replace(char, "")
        if palavra in words:
            # total_de_w_importantes += 1
            resultado += len(words) - words.index(palavra)
        else:
            resultado -= 2000
    return resultado


def pegar_sessoes ():
    pasta = "todas legendas/"  # input
    # pasta = 'teste/'
    file_out = 'legendasnovas'  # output

    def e_da_sequencia(final_anterior, comeco_dessa, sessao):

        final_anterior = final_anterior[:-4]
        comeco_dessa = comeco_dessa[:-4]

        # segundos = int(x[-2:])
        # minutos = int(x[3:5])
        # hora = int(x[:2])
        comeco_dessa = int(comeco_dessa[-2:]) + (int(comeco_dessa[3:5]) * 60) + (int(comeco_dessa[:2]) * 3600)
        final_anterior = int(final_anterior[-2:]) + (int(final_anterior[3:5]) * 60) + (int(final_anterior[:2]) * 3600)
        # print(comeco_dessa - final_anterior)

        tempoPausaMaximo = 10

        if len(sessao) > 12:
            tempoPausaMaximo = 6

        if comeco_dessa - final_anterior < tempoPausaMaximo:
            return True
        return False

    def tirarPalavrasComNumeroeRepeticao(frase):
        from re import sub
        frase = sub(r'<[^>]*>', ' ', frase)
        # frase = frase.replace('<i>', '').replace('</i>','')
        for word in frase.split():
            if num_there(word):
                frase = frase.replace(word, '')
            if any(i == '<' or i == '>' for i in word):
                frase = frase.replace(word, '')
            # try:
            #     if word[0] == word[1]:
            #         frase = frase.replace(word, '')
            # except:
            #     pass
        frase = frase.replace('...', ' ').replace('-', ' ').replace('âª', '')
        return ' '.join(frase.split()).strip()  # remover espaço desnecessario

    def catalogar_arquivo(pastaArquivo):

        def alguns_filtros(frase):
            if 'ooh.' in linha:
                print("")
            chars = '"\/-?!.,:$'
            # print(frase)
            if len(frase) > 1:
                n_frase = ''
                for f in frase:
                    n_frase += ' ' + f
                    frase = n_frase
            else:
                try:
                    if type(frase) is list:
                        frase = frase[0]
                except:
                    return ''

            frase = frase.replace('<i>', '').strip()

            # if '...' in frase or '. . .' in frase:
            #     return ''

            for char in chars:
                frase = frase.replace(char, '')

                # print(frase)
            if 'subtitles by' in frase:
                frase = ''
            elif '[' in frase or ']' in frase or '*' in frase: #ignorar frases q tenham
                frase = ''
            return frase

        with open(pastaArquivo, 'r', encoding='latin-1') as file:
            file = file.readlines()
        contador = -1
        l = 0
        frases = []
        sessoes = []
        final_anterior = "00:00:00,000"
        pode_adicionar = False

        new_section_na_proxima = True

        for c, linha in enumerate(file):

            linha = linha.lower()

            if c == 0:  # antes de começar
                l = c
                contador += 1
                frases.append([])
            elif linha.replace('\n', '').isnumeric():  # se for numero
                l = c
                contador += 1
                frase = alguns_filtros(frases[-1])
                frases.pop()
                if frase != '': #and frase not in frases:  (mudou aq)
                    frases.append(frase.strip())
                elif frase == '' or frase in frases:
                    contador -= 1
                frases.append([])
                pode_adicionar = True

            elif l + 1 != c and linha != '\n' and len(linha) >= 1:
                if linha[0] == '-':  # quebrar loop de juntar
                    linha = tirarPalavrasComNumeroeRepeticao(linha)
                    frases.pop()
                    frases.append(linha.replace('\n', ''))
                    l = c
                    contador += 1
                    frases.append([])
                    pode_adicionar = True
                else:
                    # loop de juntar
                    linha = tirarPalavrasComNumeroeRepeticao(linha)
                    frases[contador] += [linha.replace('\n', '')]
                    l = 0
                    # print(frases[-3:])
            # if len(frases[-1]) >= 1 and pode_adicionar:
            if pode_adicionar:
                if new_section_na_proxima == True:
                    sessoes.append([frases[-2]])
                else:
                    try:
                        sessoes[-1].append(frases[-2])
                    except:
                        sessoes.append([frases[-2]])
                pode_adicionar = False

            #fazer sequencia
            try:
                if linha[0] == '0' and linha[2] == ':':

                    inicio = linha.split('-->')[0].strip()

                    if e_da_sequencia(final_anterior, inicio, sessoes[-1]):
                        new_section_na_proxima = False
                        # sessoes[-1].append(frases[-2])
                    else:
                        new_section_na_proxima = True
                        # sessoes.append([frases[-2]])

                    final_anterior = linha.split('-->')[1].strip()
            except:
                pass
        if type(frases[-1]) is list:
            frases.pop()
        sessoes.sort(key=pontos_lista, reverse=True)
        return sessoes

    from os import listdir, remove
    from caio_uteis import num_there
    arquivos = listdir(pasta)

    if len(arquivos) ==0:
        print("Está sem File Legenda")

    for arquivo in arquivos:
        result = catalogar_arquivo(pasta + arquivo)
        return result


def escolher_melhor_sessao (sessoes):


    def word_unica(lista):
        unicas = []
        for frase in lista:
            for palavra in frase.lower().split():
                for char in "!?.,":
                    palavra = palavra.replace(char, "")
                if palavra not in unicas:
                    # print("p",palavra,"lista",unicas)
                    unicas.append(palavra)
        return unicas

    import statistics
    result = []
    listaDeLen = []
    recusados = 0
    aceitos = 0
    for item in sessoes:
        # print("mS: item:", item)

        item = list(dict.fromkeys(item)) #remove duplicate
        tamanho = len(word_unica(item))
        listaDeLen.append(tamanho)
        if max > tamanho > min:
            # print(lenzinha)
            result.append(item)
            aceitos += 1
        else:
            recusados +=1
    if aceitos < 5:
        print(statistics.median(listaDeLen))
    print("recusados: ", recusados)
    print("aceitos: ", aceitos)
    return result

#def link

# try:
sessoes = pegar_sessoes()

melhores = escolher_melhor_sessao(sessoes)


for melhor in melhores:
    print(melhor, '\n')

# print(link("hello", movie="toy story 4", ate='You make me so happy'))

print("\n\n")

pack = []
for i, item in enumerate(melhores):
    print("\n\n\nPegando Sessao...")
    sessao = link(item[0], movie=movie, segundaFrase=item[1], ate=item[-1])

    if sessao == False:
        getIndex = 1
        while sessao == False:
            getIndex += 1
            sessao = link(item[0], movie=movie, segundaFrase=item[1], ate=item[-1], getIndex= getIndex)

    print("Sessão tamanho", sessao, '\n\n')

    if sessao == None:
        print(f"sessão deu NONE !!!!!!!!!!!!!!!!!!!!!!")
        maximo += 1
        continue
    else:
        print("Pegando Exemplos...")
        for card in sessao:
            tituloCard = card[0]
            exemplo = link(tituloCard, raw=True, getIndex=2)
            print("exemplo ok", exemplo[0])
            exemplo = {"url": exemplo[1], "subtitle": exemplo[0], "translation": "sem tradução"}
            card.append(exemplo)


    if i >= maximo:
        print("maior que maximo!!!!!!!!!!!")
        break #Não prestou


    pack.append(sessao)
    break


    # print("\n")

system('cls')

# from caio_uteis import load_pickle
# pack = load_pickle("pack")


quantidadeDeFrases = 0
quantidadeDeExemplos = 0
for sessao in pack:
    # print(sessoes)
    for card in sessao:
        quantidadeDeFrases += 1
        print(card[0])
    for card in sessao:
        quantidadeDeExemplos += 1
        print(card[2]["subtitle"])



playsound("fim.mp3")
print("BOTA A TRADUÇÃO \n")

traducao = []
while True:
    try:
        line = input()
    except EOFError:
        break
    if line == '0':
        break
    elif line != '':
        traducao.append(line)

# traducao = [
# "oh baby, é um bom dia para brincar hein",
# "Estou certo",
# "olá senhor cowboy, como você está hoje",
# "você gosta de andar a cavalo",
# ]

cont = 0
for sessao in pack:
    for card in sessao:
        if cont < quantidadeDeFrases:
            card.append(traducao[cont])
            cont += 1
        else:
            break
for sessao in pack:
    for card in sessao:
        card[2]["translation"] = traducao[cont]
        cont += 1

for sessao in pack: print(sessao)


try:
    with open(destino, 'w+', encoding="utf-8") as js_file:
        p_frase = []
        p_link = []
        p_traducao = []
        dadinhos = []
        for sessao in pack:
            for card in sessao:
                frase = card[0]
                link = card[1]
                link = link.replace("https://getyarn.io/yarn-clip/", "https://y.yarn.co/") + ".mp4"
                traducao = card[3]
                exemplo = card[2]

                dadinhos.append([
                    link,
                    frase,
                    traducao,
                    exemplo
                ])
            break
        js_file.write(
            f'var dadinhos = {dadinhos}\n\n'
            f'var nomeMovie = "{nome_movie}"'
        )
except:
    input("ERRO NA GRAVAÇÃO")
# except Exception as e:
#     print("error ", e)
#     input("")