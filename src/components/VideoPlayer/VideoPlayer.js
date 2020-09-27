import React, {useEffect, useRef} from 'react';
import ReactPlayer from 'react-player';
import { useDados } from '../../context/Dados';

import { Container } from './styles-video-player';
import { useState } from 'react';


const VideoPlayer = ({  indexPlay, setIndexPlay, setIsPlaying, reproduzirTodos, qualTextoMostrar }) => {
    const {dados, proximaPage} = useDados()
    // const urls = dados.urlVideos
    // Object.keys(dados).map((card, index) => console.log(card))
    const mudar = () => {
        if (reproduzirTodos && indexPlay < dados.length -1) setIndexPlay(prev => prev +1)
        else proximaPage()
    }
    const videoRef = useRef(null)
    useEffect(() => {
        // videoRef.current.play()
    },[indexPlay])

    return (
        <Container>
            {Object.values(dados).map((card, index) => (
                    <video 
                        key={index}
                        ref={index === indexPlay ? videoRef : null}
                        src={qualTextoMostrar !== "exemplo" ? card.urlFrase : card.urlExemplo}
                        // play = {index === indexPlay ? true : false}
                        style={index !== indexPlay ? {display: "none"} : null}
                        onEnded={() => mudar()}
                        preload="auto"
                    />
                    // <ReactPlayer 
                    //     height = "409px"
                    //     width = "758px"
                    //     style = {{"border-radius": "50px"}}
                    //     key={index}
                    //     url={qualTextoMostrar !== "exemplo" ? card.urlFrase : card.urlExemplo}
                    //     config={{
                    //         file: { 
                    //             attributes: { 
                    //                 preload: 'auto' 
                    //             }
                    //         }}}
                    //     // playing = {index === indexPlay ? true : false}
                    //     style={index !== indexPlay ? {display: "none"} : null}
                    //     onEnded={() => mudar(index)}
                    // />
                )
            )}
        </Container>
    )
}

export default VideoPlayer;