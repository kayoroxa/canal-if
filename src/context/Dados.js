import {getPronuncia} from '../assets/data/scripts/pronunciation2.0'
import React, { createContext, useState, useContext, useEffect } from 'react';
import {dadinhos, nomeMovie} from '../assets/data/pyoutiput'
import { useNavigate } from 'react-router-dom';
const DadosContext = createContext();

export default function DadosProvider({ children }) {
    const navigate = useNavigate()
    const [entrouNoLoop, setEntrouNoLoop] = useState(false)
    
    const cronograma = [
        "config",
        "videos-completo",
        [
            "video-index",
            "translate",
            "pronunciation",
        ],
        "fim",
    ]


    const [indexPlay, setIndexPlay] = useState(0)
    const proximoIndexPlay = () => setIndexPlay((prev) => prev +1)
    const [indexPage, setIndexPage] = useState(0)
    const proximaPage = () => setIndexPage((prev) => prev +1)


    useEffect(() => {
        console.log("mudou indexPage para", indexPage, "/", cronograma[2].length)
        if (!entrouNoLoop && indexPage === 2) {
            console.log("!entrouNoLoop && indexPage === 2", indexPage)
            setEntrouNoLoop(true)
            setIndexPage(0)
            setIndexPlay(0)
        }
        else if (entrouNoLoop) {
            console.log("entrouNoLoop", indexPage)

            
            if (!cronograma[2][indexPage]) {
                setIndexPage(0)
                setIndexPlay(prev => prev +1)
                console.log("!cronograma[2][indexPage]", indexPage)
            }
            else {
                console.log("****mudou index Page", indexPage,  cronograma[2].length)
                if (!dados[indexPlay]) {
                    setEntrouNoLoop(false)
                    setIndexPage(3) //dps do loop
                    setIndexPlay(0)
                }
                else {
                    navigate("/" + cronograma[2][indexPage])
                    console.log("index page", indexPage)
                }
            }
        }
        else {
            navigate("/" + cronograma[indexPage])
            console.log("else else", indexPage)
        }
    }, [indexPage])

    const [indexCardConfig, setIndexCardConfig] = useState(0)

    const [dados, setDados] = useState(dadinhos.map((card, index) => (
        {
            urlFrase : card[0],
            frase : card[1],
            fraseTranslate : card[2],
            wordTranslate : "man : homem / cara, i like you : eu gostoooo de você, what's / what is : qual é, your name : seu nome",
            pronuncia : getPronuncia(card[1]),
            exemploFrase : card[3].subtitle,
            exemploTranslate : card[3].translation,
            urlExemplo : card[3].url,
        }
    )))

    const changerDados = (() => {
        const subChanger = (name, index) => value => setDados((prev) => ({
            ...prev, [index] : {...prev[index], [name]: value} 
        }))
        const retornar = Object.keys(dados).map((_) => ({}))

        for (const [index, card] of retornar.entries()) {
            for (let key of Object.keys(dados[index])) {
                card[key] = subChanger(key, index)
            }
            // retornar.push({})
        }
        return retornar
    })()

    return (
       <DadosContext.Provider
            value={{
                dados,
                changerDados,
                indexCardConfig,
                setIndexCardConfig,
                indexPlay,
                setIndexPlay,
                indexPage,
                setIndexPage,
                proximaPage,
                proximoIndexPlay,
            }}
       >
            {children}
       </DadosContext.Provider>
    );
}

export function useDados() {
    const context = useContext(DadosContext);
    if (!context) throw new Error('useDados must be used within a DadosProvider');
    const {
        dados,
        changerDados,
        indexCardConfig,
        setIndexCardConfig,
        indexPlay,
        setIndexPlay,
        indexPage,
        setIndexPage,
        proximaPage,
        proximoIndexPlay,
    } = context;
    return {
        dados,
        changerDados,
        indexCardConfig,
        setIndexCardConfig,
        indexPlay,
        setIndexPlay,
        indexPage,
        setIndexPage,
        proximaPage,
        proximoIndexPlay,
    };
}