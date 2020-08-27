import React, {useState} from 'react';

import VideoPlayer from '../../components/VideoPlayer';
import SubtitlePlayer from '../../components/SubtitlePlayer';


import { Container, Top, Button, Main } from './styles-video-screen.js';

const VideoScreen = ({ qualTextoMostrar, dados}) => {
    const [indexPlay, setIndexPlay] = useState(0)

    return (
       <Container>
           <Main>
                <Top>
                    <VideoPlayer dados={dados} state={[indexPlay, setIndexPlay]} />
                </Top>
                <Button>
                    <SubtitlePlayer qualTextoMostrar = {qualTextoMostrar} dados={dados} state={[indexPlay, setIndexPlay]} />
                </Button>
           </Main>
       </Container>
    );
}

export default VideoScreen;