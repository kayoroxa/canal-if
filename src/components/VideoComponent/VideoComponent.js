import React, { useRef, useEffect } from 'react'

import { ContainerVideoComponent } from './styles-video-component'

const VideoComponent = ({
  style,
  autoPlay,
  loop,
  muted,
  src,
  onEnded,
  playing,
  hidden,
}) => {
  const videoRef = useRef(null)
  useEffect(() => {
    if (playing) videoRef.current.play()
  }, [playing])
  return (
    <ContainerVideoComponent>
      <video
        ref={videoRef}
        style={{ ...style, display: hidden && 'none' }}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        src={src}
        onLoadedData={onEnded}
      />
    </ContainerVideoComponent>
  )
}

export default VideoComponent
