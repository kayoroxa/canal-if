import {getPronuncia} from '../assets/data/scripts/pronunciation2.0'
import React, { createContext, useState, useContext, useEffect } from 'react';
import {dadinhos, nomeMovie} from '../assets/data/pyoutiput'
import {translationWords} from '../assets/data/translationWords';
import { useNavigate } from 'react-router-dom';
const DadosContext = createContext();


export default function DadosProvider({ children }) {

    const indexPlayInicial = 0

    const navigate = useNavigate()

    const [entrouNoLoop, setEntrouNoLoop] = useState(false)

    const [voiceAlfaOmega, setVoiceAlfaOmega] = useState({ alfa : '', omega : '' })

    const changerVoiceAlfaOmega = {
        alfa : newValor => setVoiceAlfaOmega(prev => ({...prev, alfa: newValor})),
        omega : newValor => setVoiceAlfaOmega(prev => ({...prev, omega: newValor})),
    }


    const cronograma = [
        "config",
        "audio",
        "videos-completo-pt",
        "videos-completo-en",
        [
            "video-index",
            "translate",
            "pronunciation",
            "exemple",
        ],
        "fim",
    ]

    const indexLoop = cronograma.findIndex((e) => Array.isArray(e))

    const [lastVoiceRecorder, setLastVoiceRecorder] = useState("")

    useEffect(() => {
        console.log("MUDOU: ", lastVoiceRecorder)
    }, [lastVoiceRecorder])

    const [indexPlay, setIndexPlay] = useState(indexPlayInicial)

    const proximoIndexPlay = () => setIndexPlay((prev) => prev +1)

    const [indexPage, setIndexPage] = useState(0)

    const proximaPage = () => setIndexPage((prev) => prev +1)

    const voltarInicioPage = () => {
        setIndexPage(0)
        setEntrouNoLoop(false)
        setIndexPlay(0)
        navigate("/config")
    }

    useEffect(() => {
        if (!entrouNoLoop && indexPage === indexLoop) {
            setEntrouNoLoop(true)
            setIndexPage(0)
            navigate("/null")
            setIndexPlay(indexPlayInicial)
        }
        else if (entrouNoLoop) {
            if (!cronograma[indexLoop][indexPage]) {
                setIndexPage(0)
                navigate("/null")
                setIndexPlay(prev => prev +1)
            }
            else {
                if (!dados[indexPlay]) { //dps do loop
                    setEntrouNoLoop(false)
                    setIndexPage(indexLoop +1) 
                    navigate("/null")
                    setIndexPlay(indexPlayInicial)
                }
                else navigate("/" + cronograma[indexLoop][indexPage])
            }
        }
        else if (indexPage < cronograma.length) {
            setIndexPlay(0)
            navigate("/" + cronograma[indexPage])
        }
    }, [indexPage])

    const [indexCardConfig, setIndexCardConfig] = useState(0)

    const handleDados = dadinhos.map((card, index) => (
        {
            urlFrase : card[0],
            frase : card[1],
            fraseTranslate : card[2],
            wordTranslate : card[1].match(/\w+’\w+|\w+'\w+|\w+/gi).map(
                    // (word, i) => `${word}: ${card[2].match(/[^!\s?,';\|\\.]+/gi)[i]}`
                    (word, i) => `${word}: ${translationWords[word.toLowerCase()]}`
                ).join(', ').toLowerCase(),
            voiceTranslate : "",
            pronuncia : getPronuncia(card[1]),
            voicePronuncia : "",
            exemploFrase : card[3].subtitle,
            exemploTranslate : card[3].translation,
            urlExemplo : card[3].url,
        }
    ))

    // download dados Storage
    const [dados, setDados] = useState(
        localStorage.getItem("dados") ? (
            JSON.parse(localStorage.getItem("dados"))
        ) : handleDados
    )
    
    const formatar = () => {
        localStorage.removeItem("dados")
        setDados(handleDados)
    }

    useEffect(() => {
        localStorage.setItem("dados", JSON.stringify(dados))
    }, [dados])

    const changerDados = (() => {
        const subChanger = (name, index)  => value => setDados((prev) => (
            Object.values({
                ...prev, [index] : {...prev[index], [name]: value} 
            })
        ))
        const retornar = Object.keys(dados).map((_) => ({}))

        for (const [index, card] of retornar.entries()) {
            for (let key of Object.keys(dados[index])) {
                card[key] = subChanger(key, index)
            }
        }
        return retornar
    })()

    return (
       <DadosContext.Provider
            value={{
                nomeMovie,
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
                formatar,
                lastVoiceRecorder,
                setLastVoiceRecorder,
                voiceAlfaOmega,
                changerVoiceAlfaOmega,
                voltarInicioPage,
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
        nomeMovie,
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
        formatar,
        lastVoiceRecorder,
        setLastVoiceRecorder,
        voiceAlfaOmega,
        changerVoiceAlfaOmega,
        voltarInicioPage,
    } = context;
    return {
        nomeMovie,
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
        formatar,
        lastVoiceRecorder,
        setLastVoiceRecorder,
        voiceAlfaOmega,
        changerVoiceAlfaOmega,
        voltarInicioPage,
    };
}