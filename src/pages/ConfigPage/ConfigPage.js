import React from 'react';
import { MdPlayArrow, MdNavigateBefore, MdNavigateNext, MdSkipPrevious, MdSkipNext  } from 'react-icons/md';
import EditInPlace from '../../components/EditInPlace';
import { ContainerConfigPage } from './styles-config-page';

import { useDados } from '../../context/Dados';


const ConfigPage = () => {
    const {dados, changerDados, indexCardConfig, setIndexCardConfig} = useDados()
    const lenDados = Object.keys(dados).length

    const proximo = () => {setIndexCardConfig((prev) => prev +1 < lenDados ? prev +1 : prev)}
    const anterior = () => {setIndexCardConfig((prev) => prev -1 < 0 ? prev : prev -1)}
    
    return (
        <ContainerConfigPage>
            <header>{indexCardConfig +1}/{lenDados} {Math.round((indexCardConfig +1) * 100 / lenDados)}% Complete</header>
            <div className="not-header">
                <MdNavigateBefore size={100} onClick={anterior}/>
                <div className="main">
                    <div className="title">Frase</div>
                    <div className="line-box frase">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].value1} onChangeValue={changerDados[indexCardConfig].value1} />
                        </div>
                        <MdPlayArrow size={48}/>
                    </div>
                    <div className="title">Frase-translate</div>
                    <div className="line-box frase-translate">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].value2} onChangeValue={changerDados[indexCardConfig].value2} />
                        </div>
                    </div>
                    <div className="title">Word-translate</div>
                    <div className="line-box word-translate">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].value3} onChangeValue={changerDados[indexCardConfig].value3} />
                        </div>
                    </div>
                    <div className="title">Pronuncia</div>
                    <div className="line-box pronuncia">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].value4} onChangeValue={changerDados[indexCardConfig].value4} />
                        </div>
                    </div>
                    <div className="title">Exemplo-frase</div>
                    <div className="line-box exemplo-frase">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].value5} onChangeValue={changerDados[indexCardConfig].value5} />
                        </div>
                        <MdSkipPrevious size={48}/>
                        <MdSkipNext size={48}/>
                        <MdPlayArrow size={48}/>
                    </div>
                    <div className="title">Exemplo-translate</div>
                    <div className="line-box exemplo-translate">
                        <div className="content">
                            <EditInPlace value={dados[indexCardConfig].value6} onChangeValue={changerDados[indexCardConfig].value6} />
                        </div>
                    </div>
                </div>
                < MdNavigateNext size={100} onClick = {proximo}/>
            </div>
        </ContainerConfigPage>
    );
}

export default ConfigPage;