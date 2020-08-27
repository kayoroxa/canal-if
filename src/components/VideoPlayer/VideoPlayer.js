import React, {useState, useRef} from 'react';
import ReactPlayer from 'react-player';


import { Container } from './styles-video-player';

const VideoPlayer = ({dadinhos}) => {
    const listUrl = [
        "https://y.yarn.co/a8cfb1b9-a0be-460a-8539-0209b56119ad.mp4",
        "https://y.yarn.co/49f52418-c94a-47fa-8425-70d2f2de1d17.mp4"
    ]

    const [url, setUrl] = useState(listUrl[0])
    const [indexPlay, setIndexPlay] = useState(0)

    const mudar = () => {
        setIndexPlay((prev) => setUrl(listUrl[prev + 1]))
    }

    return (
        <Container>
            <ReactPlayer 
                playing = {true}
                onEnded={() => mudar()}
                url={url}
            />
        </Container>
    )
}

export default VideoPlayer;