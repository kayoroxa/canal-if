import React from 'react';
import ReactPlayer from 'react-player';


import { Container } from './styles-video-player';

const VideoPlayer = ({ dados, state }) => {
    const [indexPlay, setIndexPlay] = state

    console.log(state)

    const urls = dados.urlVideos

    const mudar = () => {
        setIndexPlay((prev) => prev +1)
    }

    return (
        <Container>
            <ReactPlayer 
                playing = {true}
                onEnded={() => mudar()}
                url={urls[indexPlay]}
            />
        </Container>
    )
}

export default VideoPlayer;