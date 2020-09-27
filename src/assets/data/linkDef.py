def link(frase, raw=False, movie='', segundaFrase= '', ate='', linkUrl = False, getIndex = 1):

    # try:
        import requests
        from bs4 import BeautifulSoup
        movieStrOriginal = movie


        movie = movie.capitalize()
        from random import randint

        link = str(str(frase).replace(' ', '%20').replace("'", "%27"))

        if movie != '': movie = str(f'''%3A"{movie.replace(" ", "%20").replace("'", "%27")}"%20''')
        url = f"https://getyarn.io/yarn-find?text={movie}{link}"

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
        link = todos[getIndex -1]
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
            next = link_next(link, segundaFrase, ate)
            if next != False:
                return link_next(link, segundaFrase, ate)
            else:
                #tentar dnv
                print("segundo tem nada haver")
                return False



    # except Exception as erro:
    #     print("erro link: ", erro)
    #     pass


def link_next(url, segundaFrase="", ate=''):
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

            title = soup.find("div", {"class": "clip-transcript transcript large"}).text
            title = title.replace("\n", "")

            lista.append([title, url])

            link = soup.find_all("a", {"class": "prev-next"}, href=True)[1]['href']
            link = "https://getyarn.io" + link

            print("Next: link:", title, link)

            from difflib import SequenceMatcher
            if SequenceMatcher(None, ate, title).ratio() > 0.84:
                print("acabou")
                return lista
            if len(lista) == 2:
                if segundaFrase != '' and SequenceMatcher(None, segundaFrase, title).ratio() < 0.7:
                    #se segunda frase n tiver nada haver
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