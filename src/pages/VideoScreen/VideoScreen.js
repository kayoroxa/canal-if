import React, {useState, useEffect} from 'react';
import { useDados } from '../../context/Dados';

import VideoPlayer from '../../components/VideoPlayer';
import SubtitlePlayer from '../../components/SubtitlePlayer';


import { Container, Top, Button, Main } from './styles-video-screen.js';

const VideoScreen = ({ qualTextoMostrar}) => {
    const { indexPlay, setIndexPlay, proximaPage, dados} = useDados()
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (indexPlay > dados.length -1) proximaPage()
    }, [indexPlay])

    return (
       <Container>
           <Main>
                <Top>
                    <VideoPlayer indexPlay={indexPlay} setIndexPlay={setIndexPlay} setIsPlaying = {setIsPlaying} />
                    <div className="logo bold" style={!isPlaying ? { display: "none" } : null}>INGLESFLIX</div>
                </Top>
                <Button>
                    <SubtitlePlayer qualTextoMostrar = {qualTextoMostrar} state={[indexPlay, setIndexPlay]} />
                </Button>
           </Main>
       </Container>
    );
}

export default VideoScreen;