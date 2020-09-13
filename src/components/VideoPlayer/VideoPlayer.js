import React, {useEffect, useRef} from 'react';
import ReactPlayer from 'react-player';
import { useDados } from '../../context/Dados';

import { Container } from './styles-video-player';
import { useState } from 'react';


const VideoPlayer = ({  indexPlay, setIndexPlay, setIsPlaying }) => {
    
    const {dados} = useDados()
    // const urls = dados.urlVideos
    // Object.keys(dados).map((card, index) => console.log(card))
    const mudar = (ultimoIndexTocado) => {
        setIndexPlay(ultimoIndexTocado + 1)
    }
    
    return (
        <Container>
            {Object.values(dados).map((card, index) => (
                    <ReactPlayer 
                        key={index}
                        url={card.urlFrase}
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