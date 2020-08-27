import React from 'react';

import VideoPlayer from '../../components/VideoPlayer';
import SubtitlePlayer from '../../components/SubtitlePlayer';


import { Container, Top, Button, Main } from './styles-video-screen.js';

const VideoScreen = ({ qualTextoMostrar, nomeMovie, dadinhos }) => {
    return (
       <Container>
           <Main>
                <Top>
                    <VideoPlayer dadinhos={dadinhos} />
                </Top>
                <Button>
                    <SubtitlePlayer qualTextoMostrar = {qualTextoMostrar}/>
                </Button>
           </Main>
       </Container>
    );
}

export default VideoScreen;