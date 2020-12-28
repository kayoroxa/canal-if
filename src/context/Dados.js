import getPronunciationDict from '../assets/data/scripts/getPronunctiationDict'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { dadinhos, nomeMovie } from '../assets/data/pyoutiput'
import { dictWords } from '../assets/data/dictWords'
import { useNavigate } from 'react-router-dom'
const DadosContext = createContext()

export default function DadosProvider({ children }) {
  const indexPlayInicial = 0

  const navigate = useNavigate()

  const [entrouNoLoop, setEntrouNoLoop] = useState(false)

  const [voiceAlfaOmega, setVoiceAlfaOmega] = useState({ alfa: '', omega: '' })

  const changerVoiceAlfaOmega = {
    alfa: newValor => setVoiceAlfaOmega(prev => ({ ...prev, alfa: newValor })),
    omega: newValor =>
      setVoiceAlfaOmega(prev => ({ ...prev, omega: newValor })),
  }

  const cronograma = [
    'config',
    'audio',
    'words-learning',
    'videos-completo-pt-en',
    'lets-learning',
    // ['video-index', 'translate', 'exemple'],
    ['video-index', 'translate', 'pronunciation', 'exemple'],
    'fim',
  ]

  const indexLoop = cronograma.findIndex(e => Array.isArray(e))

  const [lastVoiceRecorder, setLastVoiceRecorder] = useState('')

  useEffect(() => {
    console.log('MUDOU: ', lastVoiceRecorder)
  }, [lastVoiceRecorder])

  const [indexPlay, setIndexPlay] = useState(indexPlayInicial)

  const proximoIndexPlay = () => setIndexPlay(prev => prev + 1)

  const [indexPage, setIndexPage] = useState(0)

  const proximaPage = () => setIndexPage(prev => prev + 1)

  const voltarInicioPage = () => {
    setIndexPage(0)
    setEntrouNoLoop(false)
    setIndexPlay(0)
    navigate('/config')
  }

  useEffect(() => {
    if (!entrouNoLoop && indexPage === indexLoop) {
      setEntrouNoLoop(true)
      setIndexPage(0)
      navigate('/null')
      setIndexPlay(indexPlayInicial)
    } else if (entrouNoLoop) {
      if (!cronograma[indexLoop][indexPage]) {
        setIndexPage(0)
        navigate('/null')
        setIndexPlay(prev => prev + 1)
      } else {
        if (!dados[indexPlay]) {
          //dps do loop
          setEntrouNoLoop(false)
          setIndexPage(indexLoop + 1)
          navigate('/null')
          setIndexPlay(indexPlayInicial)
        } else {
          navigate('/' + cronograma[indexLoop][indexPage])
        }
      }
    } else if (indexPage < cronograma.length) {
      setIndexPlay(0)
      navigate('/' + cronograma[indexPage])
    }
  }, [indexPage])

  const [indexCardConfig, setIndexCardConfig] = useState(0)
  const handleDados = dadinhos.map((card, index) => ({
    urlFrase: card[0],
    frase: card[1].replaceAll(/\(.*\)|[\w']*\:/gi, '').trim(),
    fraseTranslate: card[2].replaceAll(/\(.*\)|[\w']*\:/gi, '').trim(),
    wordTranslate: card[1]
      .match(/\w+’\w+|\w+'\w+|\w+/gi)
      .map(
        // (word, i) => `${word}: ${card[2].match(/[^!\s?,';\|\\.]+/gi)[i]}`
        (word, i) =>
          `${word}: ${
            dictWords[word.toLowerCase()]
              ? dictWords[word.toLowerCase()].translation
              : 'undefined'
          }`
      )
      .join(', ')
      .toLowerCase(),
    voiceTranslate: [],
    // pronuncia: getPronuncia(card[1]),
    pronuncia: getPronunciationDict(card[1]),
    voicePronuncia: [],
    exemplos: {
      0: {
        exemploFrase: card[3][0].subtitle,
        exemploTranslate: card[3][0].translation,
        urlExemplo: card[3][0].url,
        showExemplo: false,
      },
      1: {
        exemploFrase: 'oi',
        exemploTranslate: 'translation oi',
        urlExemplo:
          'https://y.yarn.co/968da1a1-013a-40e5-9412-2d782fec7fe2.mp4',
        showExemplos: false,
      },
    },
    showExemplos: { 0: false, 1: false },
    showPronuncia: false,
    showDefinition: false,
  }))
  // download dados Storage

  const [dados, setDados] = useState(
    localStorage.getItem('dados')
      ? JSON.parse(localStorage.getItem('dados'))
      : handleDados
  )

  const zerarVoice = () => {
    setDados(prev =>
      prev.map(card => ({
        ...card,
        voicePronuncia: '',
        voiceTranslate: '',
      }))
    )
  }

  window.onload = () => zerarVoice()

  const formatar = () => {
    localStorage.removeItem('dados')
    setDados(handleDados)
  }

  useEffect(() => {
    localStorage.setItem('dados', JSON.stringify(dados))
    console.log(dados)
  }, [dados])

  const changerDados = (() => {
    const subChanger = (name, index) => value => {
      if (typeof value === 'function') {
        // const newValue = value(dados)
        return setDados(prev =>
          Object.values({
            ...prev,
            [index]: { ...prev[index], [name]: value(prev[index][name]) },
          })
        )
      } else {
        return setDados(prev =>
          Object.values({
            ...prev,
            [index]: { ...prev[index], [name]: value },
          })
        )
      }
    }

    const retornar = Object.keys(dados).map(_ => ({}))

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
  )
}

export function useDados() {
  const context = useContext(DadosContext)
  if (!context) throw new Error('useDados must be used within a DadosProvider')
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
  } = context
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
  }
}
