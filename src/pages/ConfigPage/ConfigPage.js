import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceRecorder from '../../components/VoiceRecorder';

import { 
    MdQueuePlayNext,
    MdDiscFull,
    MdPlayArrow,
    MdNavigateBefore,
    MdNavigateNext,
    MdSkipPrevious,
    MdSkipNext
} from 'react-icons/md';

import EditInPlace from '../../components/EditInPlace';
import { ContainerConfigPage } from './styles-config-page';

import { useDados } from '../../context/Dados';


const ConfigPage = () => {
    console.log("config")
    const {
        dados,
        changerDados,
        indexCardConfig,
        setIndexCardConfig,
        indexPage,
        setIndexPage,
        proximaPage,
        formatar,
        voiceAlfaOmega,
        changerVoiceAlfaOmega,
    } = useDados()


    useEffect(() => {
        setIndexPage(0)
    }, [])

    const lenDados = Object.keys(dados).length
    const [showVideo, setShowVideo] = useState({frase: false, exemplo: false})
    const navigate = useNavigate()
    const proximo = () => {setIndexCardConfig((prev) => prev +1 < lenDados ? prev +1 : prev)}
    const anterior = () => {setIndexCardConfig((prev) => prev -1 < 0 ? prev : prev -1)}
    
    const fraseVideoRef = useRef(null)
    const fraseExemploRef = useRef(null)

    const fraseVideo = (
        <video
            ref={fraseVideoRef}
            src={dados[indexCardConfig].urlFrase}
            style={showVideo.frase ? {position: "absolute"} : {display: "none"}}
            onEnded={() => setShowVideo((prev) => ( {...prev, frase: false} ))}
            preload="auto"
        />
    )
    
    const exemploVideo = (
        <video
            ref={fraseExemploRef}
            src={dados[indexCardConfig].urlExemplo}
            style={showVideo.exemplo ? {position: "absolute"} : {display: "none"}}
            onEnded={() => setShowVideo((prev) => ( {...prev, exemplo: false} ))}
            preload="auto"
        />
    )

    useEffect(() => {
        if (showVideo.exemplo) fraseExemploRef.current.play()
        else if (showVideo.frase) fraseVideoRef.current.play()
    }, [showVideo])
        
    const teclou = (e) => {
        if (e.code === "NumpadEnter") {
            proximaPage()
        }
    }

    useEffect(() => {
        document.onkeydown = (e) => teclou(e)
        return () => document.onkeydown = null
    }, [])
    return (
        <ContainerConfigPage>
            {fraseVideo}
            {exemploVideo}
            <header>
                <MdQueuePlayNext size={50} onClick={() => proximaPage()}/>
                <VoiceRecorder 
                    dado={voiceAlfaOmega.alfa}
                    setAudios={changerVoiceAlfaOmega.alfa}
                    name="voiceAlfa"
                    size={22}
                />
                <MdDiscFull size={50} onClick={() => formatar()}/>
                <div>{indexCardConfig +1}/{lenDados}</div>
                <VoiceRecorder 
                    dado={voiceAlfaOmega.omega}
                    setAudios={changerVoiceAlfaOmega.omega}
                    name="voiceOmega"
                    size={22}
                />
                <div>{Math.round((indexCardConfig +1) * 100 / lenDados)}% Complete</div>
            </header>
            <div className="not-header">
                <MdNavigateBefore size={100} onClick={anterior}/>
                <div className="main">
                    <div className="title">Frase</div>
                    <div className="line-box frase">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].frase} onChangeValue={changerDados[indexCardConfig].frase} />
                        </div>
                        <MdPlayArrow onClick={() => setShowVideo((prev) => ({...prev, frase: true}) )} size={48}/>
                    </div>
                    <div className="title">Frase-translate</div>
                    <div className="line-box frase-translate">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].fraseTranslate} onChangeValue={changerDados[indexCardConfig].fraseTranslate} />
                        </div>
                    </div>
                    <div className="title">
                        Word-translate
                        <VoiceRecorder 
                            dado={dados[indexCardConfig].voiceTranslate}
                            setAudios={changerDados[indexCardConfig].voiceTranslate}
                            name="voiceTranslate"
                            size={22}
                        />
                    </div>
                    <div className="line-box word-translate">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].wordTranslate} onChangeValue={changerDados[indexCardConfig].wordTranslate} />
                        </div>
                    </div>
                    <div className="title">
                        Pronuncia
                        <VoiceRecorder
                            dado={dados[indexCardConfig].voicePronuncia}
                            setAudios={changerDados[indexCardConfig].voicePronuncia}
                            name="voicePronuncia"
                            size={22}
                        />
                    </div>
                    <div className="line-box pronuncia">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].pronuncia} onChangeValue={changerDados[indexCardConfig].pronuncia} />
                        </div>
                    </div>
                    <div className="title">Exemplo-frase</div>
                    <div className="line-box exemplo-frase">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].exemploFrase} onChangeValue={changerDados[indexCardConfig].exemploFrase} />
                        </div>
                        <MdSkipPrevious size={48}/>
                        <MdSkipNext size={48}/>
                        <MdPlayArrow onClick={() => setShowVideo((prev) => ({...prev, exemplo: true}) )} size={48}/>
                    </div>
                    <div className="title">Exemplo-translate</div>
                    <div className="line-box exemplo-translate">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].exemploTranslate} onChangeValue={changerDados[indexCardConfig].exemploTranslate} />
                        </div>
                    </div>
                    <div className="title">Exemplo Url</div>
                    <div className="line-box exemplo-urlExemplo">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].urlExemplo} onChangeValue={changerDados[indexCardConfig].urlExemplo} />
                        </div>
                    </div>
                </div>
                < MdNavigateNext size={100} onClick = {proximo}/>
            </div>
        </ContainerConfigPage>
    );
}

export default ConfigPage;