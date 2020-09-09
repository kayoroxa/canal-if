import React, {useEffect, useRef} from 'react';
import ReactPlayer from 'react-player';


import { Container } from './styles-video-player';
import { useState } from 'react';

const VideoPlayer = ({ dados, indexPlay, setIndexPlay, setIsPlaying }) => {
    
    
    const urls = dados.urlVideos

    const mudar = (ultimoIndexTocado) => {
        setIndexPlay(ultimoIndexTocado + 1)
    }
    
    return (
        <Container>
            {urls.map((url, index) => (
                    <ReactPlayer 
                        key={index}
                        url={url}
                        config={{
                            file: { 
                                attributes: { 
                                    preload: 'auto' 
                                }
                            }}}
                        playing = {index === indexPlay ? true : false}
                        style={index !== indexPlay ? {display: "none"} : null}
                        onEnded={() => mudar(index)}
                    />
                )
            )}
        </Container>
    )
}

export default VideoPlayer;