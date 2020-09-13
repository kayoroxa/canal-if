import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { MdQueuePlayNext, MdPlayArrow, MdNavigateBefore, MdNavigateNext, MdSkipPrevious, MdSkipNext  } from 'react-icons/md';
import EditInPlace from '../../components/EditInPlace';
import { ContainerConfigPage } from './styles-config-page';

import { useDados } from '../../context/Dados';


const ConfigPage = () => {
    const {
        dados,
        changerDados,
        indexCardConfig,
        setIndexCardConfig,
        indexPage,
        proximaPage,
    } = useDados()

    const lenDados = Object.keys(dados).length
    const [showVideo, setShowVideo] = useState({frase: false, exemplo: false})
    const navigate = useNavigate()
    const proximo = () => {setIndexCardConfig((prev) => prev +1 < lenDados ? prev +1 : prev)}
    const anterior = () => {setIndexCardConfig((prev) => prev -1 < 0 ? prev : prev -1)}
    
    const fraseVideo = (
        <ReactPlayer
            url={dados[indexCardConfig].urlFrase}
            config={{
                file: { 
                    attributes: { 
                        preload: 'auto' 
                    }
                }}}
            playing = {showVideo.frase ? true : false}
            style={showVideo.frase ? {position: "absolute"} : {display: "none"}}
            onEnded={() => setShowVideo((prev) => ( {...prev, frase: false} ))}
        />)
    
    const exemploVideo = (
        <ReactPlayer
            url={dados[indexCardConfig].urlExemplo}
            config={{
                file: { 
                    attributes: { 
                        preload: 'auto' 
                    }
                }}}
            playing = {showVideo.exemplo ? true : false}
            style={showVideo.exemplo ? {position: "absolute"} : {display: "none"}}
            onEnded={() => setShowVideo((prev) => ( {...prev, exemplo: false} ))}
        />)

    return (
        <ContainerConfigPage>
            {fraseVideo}
            {exemploVideo}
            <header>
                <MdQueuePlayNext size={50} onClick={() => proximaPage()}/>
                <div>{indexCardConfig +1}/{lenDados}</div>
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
                    <div className="title">Word-translate</div>
                    <div className="line-box word-translate">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].wordTranslate} onChangeValue={changerDados[indexCardConfig].wordTranslate} />
                        </div>
                    </div>
                    <div className="title">Pronuncia</div>
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