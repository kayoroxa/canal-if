import React from 'react';

import VideoPlayer from './components/VideoPlayer';

import { Container } from './styles-video-screen.js';

const VideoScreen = () => {
    return (
       <Container>
           <VideoPlayer />
       </Container>
    );
}

export default VideoScreen;