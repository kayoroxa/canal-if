import React, {useState, useEffect} from 'react';
import { useDados } from '../../context/Dados';

import VideoPlayer from '../../components/VideoPlayer';
import SubtitlePlayer from '../../components/SubtitlePlayer';


import { Container, Top, Button, Main } from './styles-video-screen.js';

const VideoScreen = ({ qualTextoMostrar, reproduzirTodos }) => {
    const {
        indexPlay,
        setIndexPlay,
        proximaPage,
        dados,
        voltarInicioPage,
    } = useDados()

    const [isPlaying, setIsPlaying] = useState(true)

    const chamou = () => proximaPage()
    
    useEffect(() => {
        if (indexPlay > dados.length -1) chamou()
    }, [indexPlay])

    const teclou = (e) => {
        if (e.code === "NumpadEnter") proximaPage()
        else if (e.code === "Escape") voltarInicioPage()
    }

    useEffect(() => {
        document.onkeydown = (e) => teclou(e)
        return () => document.onkeydown = null
    }, [])

    return (
        <Container style={isPlaying ? {opacity : 1} : {opacity : 0}}>
            {qualTextoMostrar === 'exemplo' ? (
                <div className="logo-exemple "><p className='bold'>Exemplo</p></div>
            ) : ''}
            <Main>
                <Top>
                    <VideoPlayer 
                        qualTextoMostrar={qualTextoMostrar}
                        reproduzirTodos={reproduzirTodos}
                        indexPlay={indexPlay}
                        setIndexPlay={setIndexPlay}
                        setIsPlaying = {setIsPlaying}
                    />
                    <div className="logo bold" style={!isPlaying ? { display: "none" } : null}>INGLESFLIX</div>
                </Top>
                <Button>
                    <SubtitlePlayer
                        reproduzirTodos={reproduzirTodos}
                        qualTextoMostrar = {qualTextoMostrar}
                        state={[indexPlay, setIndexPlay]} 
                    />
                </Button>
            </Main>
        </Container>
    );
}

export default VideoScreen;