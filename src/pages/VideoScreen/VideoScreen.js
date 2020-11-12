import React, { useState, useEffect, useCallback } from 'react'
import { useDados } from '../../context/Dados'

import VideoPlayer from '../../components/VideoPlayer'
import SubtitlePlayer from '../../components/SubtitlePlayer'

import { Container, Top, Button, Main } from './styles-video-screen.js'

const VideoScreen = ({ qualTextoMostrar, reproduzirTodos }) => {
  const {
    indexPlay,
    setIndexPlay,
    proximaPage,
    dados,
    voltarInicioPage,
  } = useDados()

  useEffect(() => {
    if (!dados[indexPlay].showExemplo && qualTextoMostrar === 'exemplo')
      proximaPage()
  }, [])

  const [isPlaying, setIsPlaying] = useState(true)
  const [canPlay, setCanPlay] = useState(
    qualTextoMostrar !== 'exemplo' && !reproduzirTodos ? true : false
  )
  const chamou = () => proximaPage()

  useEffect(() => {
    if (indexPlay > dados.length - 1) chamou()
  }, [indexPlay])

  const teclou = e => {
    if (e.code === 'NumpadEnter') {
      // setIndexPlay(0)
      setCanPlay(false)
      setIsPlaying(false)
      proximaPage()
    } else if (e.code === 'Escape') voltarInicioPage()
  }

  useEffect(() => {
    document.onkeydown = e => teclou(e)
    return () => (document.onkeydown = null)
  }, [])

  const mostrar =
    qualTextoMostrar !== 'exemplo' ||
    (qualTextoMostrar === 'exemplo' && dados[indexPlay].showExemplo)
      ? true
      : false

  return (
    mostrar && (
      <Container>
        {qualTextoMostrar !== 'exemplo' && !reproduzirTodos ? (
          ''
        ) : (
          <audio
            src={
              process.env.PUBLIC_URL + '/audios/' + qualTextoMostrar + '.mp3'
            }
            autoPlay={true}
            onEnded={() => setCanPlay(true)}
          />
        )}
        {qualTextoMostrar === 'exemplo' ? (
          <div className="logo-exemple ">
            <p className="bold">Exemplo</p>
          </div>
        ) : (
          ''
        )}
        <Main>
          <Top>
            <VideoPlayer
              qualTextoMostrar={qualTextoMostrar}
              reproduzirTodos={reproduzirTodos}
              indexPlay={indexPlay}
              setIndexPlay={setIndexPlay}
              setIsPlaying={setIsPlaying}
              canPlay={canPlay}
              setCanPlay={setCanPlay}
            />
            <div
              className="logo bold"
              style={!isPlaying ? { display: 'none' } : null}
            >
              INGLESFLIX
            </div>
          </Top>
          <Button style={canPlay ? { opacity: 1 } : { opacity: 0 }}>
            <SubtitlePlayer
              reproduzirTodos={reproduzirTodos}
              qualTextoMostrar={qualTextoMostrar}
              state={[indexPlay, setIndexPlay]}
            />
          </Button>
        </Main>
      </Container>
    )
  )
}

export default VideoScreen
