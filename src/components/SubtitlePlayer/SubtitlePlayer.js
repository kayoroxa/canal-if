import React from 'react';
import { useDados } from '../../context/Dados';
import { Container } from './styles-subtitle-player';

const SubtitlePlayer = ({qualTextoMostrar, state }) => {
    const [indexPlay, setIndexPlay] = state
    let {dados} = useDados()
    dados = Object.values(dados)
    return (
       <Container>
            <div className={"paiLegenda " + qualTextoMostrar}>
                {dados[indexPlay] && qualTextoMostrar === "pt-en" && <>
                    <div className="en"><p> {dados[indexPlay].frase} </p></div>
                    <div className="pt"><p> {dados[indexPlay].fraseTranslate} </p></div>
                </>}
                {dados[indexPlay] && qualTextoMostrar === "en" && <>
                    <div className="en"><p> {dados[indexPlay].frase} </p></div>
                </>}
                {dados[indexPlay] && qualTextoMostrar === "pt" && <>
                    <div className="en"><p> {dados[indexPlay].fraseTranslate} </p></div>
                </>}
                {dados[indexPlay] && qualTextoMostrar === "pronunciaAndExemplo" && <>
                    <div className="pronuncia"><p> {dados[indexPlay].pronuncia} </p></div>
                    <div className="en"><p> {dados[indexPlay].frase} </p></div>
                    <div className="pt"><p> {dados[indexPlay].fraseTranslate} </p></div>
                </>}
            </div>
       </Container>
    );
}

export default SubtitlePlayer;