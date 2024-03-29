import React, { useEffect } from 'react'
import { useDados } from '../../context/Dados'
import { Container } from './styles-audio-screen'

const AudioScreen = ({ alfaOmega }) => {
  const {
    dados,
    indexPlay,
    proximaPage,
    nomeMovie,
    voiceAlfaOmega,
    voltarInicioPage,
  } = useDados()

  const teclou = e => {
    if (e.code === 'NumpadEnter') {
      proximaPage()
    } else if (e.code === 'Escape') {
      voltarInicioPage()
    }
  }

  useEffect(() => {
    document.onkeydown = e => teclou(e)
    return () => (document.onkeydown = null)
  }, [])

  return (
    <Container>
      <div className="title">
        <div className="logo bold">INGLÊSFLIX</div>
        <audio
          src={
            alfaOmega === 'alfa'
              ? process.env.PUBLIC_URL + '/audios/audiosVideo/intro.mp3'
              : process.env.PUBLIC_URL + '/audios/audiosVideo/fim.mp3'
            // voiceAlfaOmega[alfaOmega] !== '' ? (
            //     voiceAlfaOmega[alfaOmega]
            // ) : (
            //     process.env.PUBLIC_URL + '/audios/intro.mp3'
            // )
          }
          autoPlay
          onEnded={() => proximaPage()}
        />
        {alfaOmega === 'alfa' ? <p>apresenta:</p> : ''}
        {/* <h1 className="bold">Vingadores</h1> */}
        <h1 className="bold">{nomeMovie}</h1>
      </div>
      <video src={dados[indexPlay].urlFrase} autoPlay muted loop></video>
    </Container>
  )
}

export default AudioScreen
