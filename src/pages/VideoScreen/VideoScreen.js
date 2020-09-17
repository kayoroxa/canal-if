import React, {useState, useEffect} from 'react';
import { useDados } from '../../context/Dados';

import VideoPlayer from '../../components/VideoPlayer';
import SubtitlePlayer from '../../components/SubtitlePlayer';


import { Container, Top, Button, Main } from './styles-video-screen.js';

const VideoScreen = ({ qualTextoMostrar, reproduzirTodos }) => {
    const { indexPlay, setIndexPlay, proximaPage, dados} = useDados()
    const [isPlaying, setIsPlaying] = useState(false)

    const chamou = () => {
        proximaPage()
        console.log('chamou')
    }
    useEffect(() => {
        if (indexPlay > dados.length -1) chamou()
    }, [indexPlay])

    return (
       <Container>
           <Main>
                <Top>
                    <VideoPlayer reproduzirTodos={reproduzirTodos} indexPlay={indexPlay} setIndexPlay={setIndexPlay} setIsPlaying = {setIsPlaying} />
                    <div className="logo bold" style={!isPlaying ? { display: "none" } : null}>INGLESFLIX</div>
                </Top>
                <Button>
                    <SubtitlePlayer reproduzirTodos={reproduzirTodos} qualTextoMostrar = {qualTextoMostrar} state={[indexPlay, setIndexPlay]} />
                </Button>
           </Main>
       </Container>
    );
}

export default VideoScreen;