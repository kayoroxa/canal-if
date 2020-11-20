import React, { useState } from 'react'
import VideoComponent from '../../components/VideoComponent'
import { ContainerTest, videoStyle } from './styles-test'

const Test = () => {
  const [videoIndex, setVideoIndex] = useState(0)
  const links = [
    'https://y.yarn.co/a8053e62-5ef5-46ea-8d52-fa3e7fcf7fb9.mp4',
    'https://y.yarn.co/469a0cec-a08c-4baf-bbca-8d23cb3e61d4.mp4',
    'https://y.yarn.co/1186dd53-f568-4040-8d88-3018f714ec30.mp4',
  ]
  return (
    <ContainerTest>
      {links.map((link, index) => (
        <VideoComponent
          key={index}
          style={videoStyle}
          playing={videoIndex === index ? true : false}
          hidden={videoIndex !== index ? true : false}
          src={link}
        />
      ))}
      <div onClick={() => setVideoIndex(prev => prev + 1)}>click +1</div>
      <div onClick={() => setVideoIndex(prev => prev - 1)}>click -1</div>
    </ContainerTest>
  )
}

export default Test
