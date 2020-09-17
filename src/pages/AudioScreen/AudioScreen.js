import React, {useEffect} from 'react';
import { useDados } from '../../context/Dados';
import { Container } from './styles-audio-screen';

const AudioScreen = () => {
    const { dados, indexPlay, proximaPage, nomeMovie } = useDados()

    useEffect(() => {
        document.onkeydown = () => proximaPage()

        return () => document.onkeydown = null
    }, [])
    return (
        <Container>
            <div className="title">
                <div className="logo bold">INGLÊSFLIX</div>
                <p>apresenta:</p> 
                <h1 className="bold">{nomeMovie}</h1>
            </div>
            <video src={dados[indexPlay].urlFrase} autoPlay muted loop></video>
        </Container>
    );
}

export default AudioScreen;