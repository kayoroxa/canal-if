import React, {useEffect, useRef} from 'react';
import ReactPlayer from 'react-player';


import { Container } from './styles-video-player';

const VideoPlayer = ({ dados, state }) => {
    const [indexPlay, setIndexPlay] = state
    
    console.log(state)
    
    const urls = dados.urlVideos
    // Array(urls.length).fill().map((_, i) => elRefs[i] || createRef())

    const mudar = (ultimoIndexTocado) => {
        setIndexPlay(ultimoIndexTocado + 1)
    }

    useEffect(() => {

    }, [indexPlay])

    return (
        <Container>
            {urls.map((url, index) => (
                <ReactPlayer 
                    key={index}
                    url={url}
                    config={{
                        file: { 
                            attributes: { 
                                preload: 'auto' 
                            }
                        }}}
                    playing = {index === indexPlay ? true : false}
                    style={index === indexPlay ? "" : {display: "none"}}
                    onEnded={() => mudar(index)}
            />
            ))}
        </Container>
    )
}

export default VideoPlayer;