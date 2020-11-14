import React, { useState, useRef, useEffect } from 'react'

import { ContainerVideoPage, _BoxVideo } from './styles-video-page'
import Subtitle from './components/Subtitle'
import Video from './components/Video'

import { useDados } from '../../context/Dados'
const VideoPage = ({ playData, exemplo }) => {
  // [
  //     {urlFrase:"", subtitle: {pt:"", en:""}},
  //     {urlVideo:"", subtitle: {pt:"", en:""}},
  // ]

  const { proximaPage } = useDados()

  const [indexPlayData, setIndexPlayData] = useState(0)

  const handleVideoEnded = () => {
    if (indexPlayData < playData.length - 1) {
      setIndexPlayData(prev => prev + 1)
    } else proximaPage()
  }
  const videoRef = useRef(null)
  useEffect(() => {
    videoRef.current.play()
  }, [indexPlayData])

  return (
    <ContainerVideoPage>
      {exemplo && <div className="exemplo-mark bold">EXEMPLO</div>}
      <div className="logo bold">InglêsFlix</div>
      <_BoxVideo>
        {playData.map((card, index) => (
          <video
            key={index}
            poster=""
            ref={index === indexPlayData ? videoRef : null}
            src={card.urlFrase}
            style={index !== indexPlayData ? { display: 'none' } : null}
            onEnded={() => handleVideoEnded()}
            preload="auto"
            //   onPlaying={() => setIsPlaying(true)}
          />
        ))}
      </_BoxVideo>
      <Subtitle subtitleData={playData[indexPlayData].subtitle} />
    </ContainerVideoPage>
  )
}

export default VideoPage
