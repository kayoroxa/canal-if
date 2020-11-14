import React, { useEffect, useRef } from 'react'

import { ContainerVideo } from './styles-video'

const Video = ({ src, onEnded, indexPlayData, key }) => {
  // urlVideo={playData[indexPlayData].urlVideo}
  // onEnded={handleVideoEnded}

  const videoRef = useRef(null)
  useEffect(() => {
    videoRef.current.play()
  }, [indexPlayData])
  return (
    <ContainerVideo>
      <video
        poster=""
        ref={key === indexPlayData ? videoRef : null}
        src={src}
        onEnded={onEnded}
        preload="auto"
        //   onPlaying={() => setIsPlaying(true)}
      />
    </ContainerVideo>
  )
}

export default Video
