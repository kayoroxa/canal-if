import React, {useEffect, useRef} from 'react';
import ReactPlayer from 'react-player';
import { useDados } from '../../context/Dados';

import { Container } from './styles-video-player';
import { useState } from 'react';


const VideoPlayer = ({  indexPlay, setIndexPlay, setIsPlaying, reproduzirTodos, qualTextoMostrar }) => {
    const {dados, proximaPage} = useDados()
    // const urls = dados.urlVideos
    // Object.keys(dados).map((card, index) => console.log(card))
    const mudar = (ultimoIndexTocado) => {
        if (reproduzirTodos) setIndexPlay(ultimoIndexTocado + 1)
        else proximaPage()
    }
    
    return (
        <Container>
            {Object.values(dados).map((card, index) => (
                    <video 
                        key={index}
                        src={qualTextoMostrar !== "exemplo" ? card.urlFrase : card.urlExemplo}
                        autoPlay = {index === indexPlay ? true : false}
                        style={index !== indexPlay ? {display: "none"} : null}
                        onEnded={() => mudar(index)}
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