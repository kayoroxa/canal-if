import React, { useEffect, useRef } from 'react'
import { useDados } from '../../context/Dados'

import { Container } from './styles-video-player'
import { useState } from 'react'

const VideoPlayer = ({
  indexPlay,
  setIndexPlay,
  setIsPlaying,
  reproduzirTodos,
  qualTextoMostrar,
  canPlay,
  setCanPlay,
}) => {
  const { dados, proximaPage } = useDados()
  const [vezesRepetiuExemplo, setVezesRepetiuExemplo] = useState(1)

  const mudar = () => {
    if (reproduzirTodos && indexPlay < dados.length - 1) {
      setIsPlaying(false)
      setIndexPlay(prev => prev + 1)
    } else if (qualTextoMostrar == 'exemplo' && vezesRepetiuExemplo < 2) {
      setVezesRepetiuExemplo(prev => prev + 1)
      if (canPlay) videoRef.current.play()
    } else {
      proximaPage()
      setCanPlay(false)
    }
  }

  const videoRef = useRef(null)

  useEffect(() => {
    console.log(canPlay)
    if (canPlay) videoRef.current.play()
  }, [indexPlay, canPlay])

  return (
    <Container>
      {Object.values(dados).map((card, index) => (
        <video
          key={index}
          poster=""
          ref={index === indexPlay ? videoRef : null}
          src={qualTextoMostrar !== 'exemplo' ? card.urlFrase : card.urlExemplo}
          style={index !== indexPlay ? { display: 'none' } : null}
          onEnded={() => mudar()}
          preload="auto"
          onPlaying={() => setIsPlaying(true)}
        />
      ))}
    </Container>
  )
}

export default VideoPlayer
