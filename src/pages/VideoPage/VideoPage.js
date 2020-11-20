import React, { useState, useRef, useEffect } from 'react'

import { ContainerVideoPage, _BoxVideo } from './styles-video-page'
import Subtitle from './components/Subtitle'
import Video from './components/Video'

import { useDados } from '../../context/Dados'
const VideoPage = ({ playData, exemplo, onlyEn, onlyPt, setTocarOVideo }) => {
  // [
  //     {urlFrase:"", subtitle: {pt:"", en:""}},
  //     {urlVideo:"", subtitle: {pt:"", en:""}},
  // ]

  const { proximaPage } = useDados()

  const [indexPlayData, setIndexPlayData] = useState(0)
  const [indexExemploInCard, setIndexExemploInCard] = useState(0)

  const handleVideoEnded = () => {
    if (playData.length === 0) {
      proximaPage()
    } else if (indexPlayData < playData.length - 1) {
      setIndexPlayData(prev => prev + 1)
    } else if (!exemplo) {
      setIndexPlayData(0)
      proximaPage()
    } else {
      if (indexExemploInCard < playData[indexPlayData].length - 1)
        setIndexExemploInCard(prev => prev + 1)
      else {
        setIndexExemploInCard(0)
        proximaPage()
      }
    }
  }
  const videoRef = useRef(null)

  useEffect(() => {
    try {
      videoRef.current.play()
    } catch (error) {
      setIndexPlayData(0)
      setIndexExemploInCard(0)
      proximaPage()
    }

    // videoRef !== null && setTocarOVideo('00')
  }, [indexPlayData])

  window.playData = playData
  return (
    playData.length > 0 && (
      <ContainerVideoPage>
        {exemplo && <div className="exemplo-mark bold">EXEMPLO</div>}
        <div className="logo bold">InglêsFlix</div>
        <_BoxVideo>
          {playData.map((card, index) => (
            <video
              key={index}
              poster=""
              ref={index === indexPlayData ? videoRef : null}
              src={!exemplo ? card.urlFrase : card[indexExemploInCard].urlFrase}
              style={index !== indexPlayData ? { display: 'none' } : null}
              onEnded={() => handleVideoEnded()}
              preload="auto"
              //   onPlaying={() => setIsPlaying(true)}
            />
          ))}
        </_BoxVideo>
        {!exemplo && (
          <Subtitle
            pt={!onlyEn && playData[indexPlayData].subtitle.pt}
            en={!onlyPt && playData[indexPlayData].subtitle.en}
          />
        )}
        {exemplo && (
          <Subtitle
            pt={
              !onlyEn && playData[indexPlayData][indexExemploInCard].subtitle.pt
            }
            en={
              !onlyPt && playData[indexPlayData][indexExemploInCard].subtitle.en
            }
          />
        )}
      </ContainerVideoPage>
    )
  )
}

export default VideoPage
