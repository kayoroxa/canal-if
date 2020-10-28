
import urllib.parse


def link(frase, raw=False, movie='', segundaFrase='', ate='', atePenultimo='', linkUrl=False, getIndex=1):

    # try:
    import requests
    from bs4 import BeautifulSoup
    movieStrOriginal = movie

    movie = movie.capitalize()
    from random import randint

    link = str(str(frase).replace(' ', '%20').replace("'", "%27"))
    urlURI = urllib.parse.quote(f':"{movie}"{frase}')
    url = f'https://getyarn.io/yarn-find?text={urlURI}'
    print(url)
    while True:
        try:
            r = requests.get(url)
            break
        except Exception as erro:
            print("erro requests: ", url)

    soup = BeautifulSoup(r.content, 'html.parser')

    link = nome = ''
    # for link in soup.find_all('div', {'class': 'clip-wrap'}):
    #     print(link, '\n\n')

    todos = soup.find_all('div', {'class': 'clip-wrap'})
    # print(todos[0])
    # for link in soup.find_all('div', {'class': 'clip-wrap'}):
    link = todos[getIndex - 1]
    nome = (link.find('div', {'class': 'transcript bg-white'}).text)  # nome

    if movie == '':
        link = link.find('a').get('href')
        if linkUrl == True:
            link = "https://yarn.co" + link
        else:
            link = link.replace('/yarn-clip/', 'https://y.yarn.co/') + '.mp4'
        if raw == True:
            return nome, link
        print(f"Procurado: {frase}\npegado: {nome} link: {link}")
        return f'{nome}\n{link}\n'
    else:
        link = 'https://getyarn.io' + link.find('a').get('href')
        print(f"Procurado: {frase}\n pegado: {nome}")
        # verificar se o proximo ta certo

        urlPersonalizada = str(input('Cole a url Personalizada: '))

        if urlPersonalizada != '':
            return link_next(urlPersonalizada, segundaFrase, ate, atePenultimo, False)
        else:
            next = link_next(link, segundaFrase, ate, atePenultimo)
            if next != False:
                return next
            else:
                # tentar dnv
                print("segundo tem nada haver")
                return False

    # except Exception as erro:
    #     print("erro link: ", erro)
    #     pass


def link_next(url, segundaFrase="", ate='', atePenultimo='', temQueVerificarOSegundo=True):
    try:
        lista = []
        import requests
        from bs4 import BeautifulSoup
        for c in range(0, 30):

            while True:
                try:
                    r = requests.get(url)
                    break
                except Exception as erro:
                    print("Next: err req: ", url)

            soup = BeautifulSoup(r.content, 'html.parser')

            title = soup.find(
                "div", {"class": "clip-transcript transcript large"}).text
            title = title.replace("\n", "")

            lista.append([title, url])

            try:
                penultimoTitle = lista[-2][0]
            except:
                penultimoTitle = 'caio rocha'

            link = soup.find_all(
                "a", {"class": "prev-next"}, href=True)[1]['href']
            link = "https://getyarn.io" + link

            print(title)

            from difflib import SequenceMatcher
            # porcentagemSemelhança = 0.84
            if SequenceMatcher(None, ate, title).ratio() > 0.5 and SequenceMatcher(None, atePenultimo, penultimoTitle).ratio() > 0.84:
                print("acabou")
                return lista
            if SequenceMatcher(None, ate, title).ratio() > 0.84:
                print("acabou")
                return lista
            if temQueVerificarOSegundo:
                if len(lista) == 2:
                    if segundaFrase != '' and SequenceMatcher(None, segundaFrase, title).ratio() < 0.7:
                        # se segunda frase n tiver nada haver
                        print(f"segundo: {segundaFrase} não é: {title}")
                        return False
                    else:
                        print("SEgundo TEm Haverrrr !!!!!!! \n\n")
            url = link
            # print("pegou link_next")
        print("!!!!!!!!chegou no limite dos Next !!!!!!!!")
    except Exception as erro:
        print("Erro no link next: ", erro)
        pass
