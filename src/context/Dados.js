import {getPronuncia} from '../assets/data/scripts/pronunciation2.0'
import React, { createContext, useState, useContext, useEffect } from 'react';
import {dadinhos, nomeMovie} from '../assets/data/pyoutiput'
import { useNavigate } from 'react-router-dom';
const DadosContext = createContext();

export default function DadosProvider({ children }) {
    const navigate = useNavigate()
    const [entrouNoLoop, setEntrouNoLoop] = useState(false)
    const [voiceAlfaOmega, setVoiceAlfaOmega] = useState({ alfa : '', omega : '' })
    const changerVoiceAlfaOmega = {
        alfa : newValor => setVoiceAlfaOmega(prev => ({...prev, alfa: newValor})),
        omega : newValor => setVoiceAlfaOmega(prev => ({...prev, omega: newValor})),
    }
    const cronograma = [
        "config",
        // 'test-recorder',
        "audio",
        "videos-completo",
        [
            "video-index",
            "translate",
            "pronunciation",
            "exemple",
        ],
        "fim",
    ]

    const [lastVoiceRecorder, setLastVoiceRecorder] = useState("")

    useEffect(() => {
        console.log("MUDOU: ", lastVoiceRecorder)
    }, [lastVoiceRecorder])

    const [indexPlay, setIndexPlay] = useState(0)
    const proximoIndexPlay = () => setIndexPlay((prev) => prev +1)
    const [indexPage, setIndexPage] = useState(0)
    const proximaPage = () => setIndexPage((prev) => prev +1)

    useEffect(() => {
        console.log("change IndexPlay")
    }, [indexPlay])


    useEffect(() => {
        console.log("change IndexPage")
        if (!entrouNoLoop && indexPage === 3) {
            setEntrouNoLoop(true)
            setIndexPage(0)
            navigate("/null")
            setIndexPlay(0)
        }
        else if (entrouNoLoop) {
            if (!cronograma[3][indexPage]) {
                setIndexPage(0)
                navigate("/null")
                setIndexPlay(prev => prev +1)
            }
            else {
                if (!dados[indexPlay]) { //dps do loop
                    setEntrouNoLoop(false)
                    setIndexPage(4) 
                    navigate("/null")
                    setIndexPlay(0)
                }
                else navigate("/" + cronograma[3][indexPage])
            }
        }
        else navigate("/" + cronograma[indexPage])
    }, [indexPage])

    const [indexCardConfig, setIndexCardConfig] = useState(0)

    const handleDados = dadinhos.map((card, index) => (
        {
            urlFrase : card[0],
            frase : card[1],
            fraseTranslate : card[2],
            wordTranslate : "man : homem / cara, i like you : eu gostoooo de você, what's / what is : qual é, your name : seu nome",
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
    };
}