import {getPronuncia} from '../assets/data/scripts/pronunciation2.0'
import React, { createContext, useState, useContext, useEffect } from 'react';
import {dadinhos, nomeMovie} from '../assets/data/pyoutiput'
import { useNavigate } from 'react-router-dom';
const DadosContext = createContext();

export default function DadosProvider({ children }) {
    const navigate = useNavigate()
    
    const cronograma = [
        "config",
        "pronunciation",
        "translate",
        "videos",
    ]

    const [indexPlay, setIndexPlay] = useState(0)
    const proximoIndexPlay = () => setIndexPlay((prev) => prev +1)
    const [indexPage, setIndexPage] = useState(0)
    const proximaPage = () => setIndexPage((prev) => prev +1)


    useEffect(() => {
        navigate("/" + cronograma[indexPage])
        setIndexPlay(0)
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
        proximaPage,
        proximoIndexPlay,
    };
}