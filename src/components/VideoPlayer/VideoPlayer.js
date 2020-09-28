import React, {useEffect, useRef} from 'react';
import { useDados } from '../../context/Dados';

import { Container } from './styles-video-player';
import { useState } from 'react';


const VideoPlayer = ({  indexPlay, setIndexPlay, setIsPlaying, reproduzirTodos, qualTextoMostrar }) => {
    const {dados, proximaPage} = useDados()
    const [vezesRepetiuExemplo, setVezesRepetiuExemplo] = useState(1)

    const mudar = () => {
        if (reproduzirTodos && indexPlay < dados.length -1) setIndexPlay(prev => prev +1)
        else if (qualTextoMostrar == "exemplo" && vezesRepetiuExemplo < 2) {
            setVezesRepetiuExemplo(prev => prev +1)
            videoRef.current.play()
        }
        else proximaPage()
    }

    const videoRef = useRef(null)
    
    useEffect(() => {
        videoRef.current.play()
    },[indexPlay])

    return (
        <Container>
            {Object.values(dados).map((card, index) => (
                    <video 
                        key={index}
                        ref={index === indexPlay ? videoRef : null}
                        src={qualTextoMostrar !== "exemplo" ? card.urlFrase : card.urlExemplo}
                        style={index !== indexPlay ? {display: "none"} : null}
                        onEnded={() => mudar()}
                        preload="auto"
                    />
                )
            )}
        </Container>
    )
}

export default VideoPlayer;