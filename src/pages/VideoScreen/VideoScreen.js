import React, {useState, useEffect} from 'react';

import VideoPlayer from '../../components/VideoPlayer';
import SubtitlePlayer from '../../components/SubtitlePlayer';


import { Container, Top, Button, Main } from './styles-video-screen.js';

const VideoScreen = ({ qualTextoMostrar, dados}) => {
    const [indexPlay, setIndexPlay] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        
      }, [isPlaying])

    return (
       <Container>
           <Main>
                <Top>
                    <VideoPlayer dados={dados} indexPlay={indexPlay} setIndexPlay={setIndexPlay} setIsPlaying = {setIsPlaying} />
                    <div className="logo bold" style={!isPlaying ? {display: "none"} : null}>INGLESFLIX</div>
                </Top>
                <Button>
                    <SubtitlePlayer qualTextoMostrar = {qualTextoMostrar} dados={dados} state={[indexPlay, setIndexPlay]} />
                </Button>
           </Main>
       </Container>
    );
}

export default VideoScreen;