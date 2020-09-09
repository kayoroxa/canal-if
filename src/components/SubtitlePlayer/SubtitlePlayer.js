import React from 'react';

import { Container } from './styles-subtitle-player';

const SubtitlePlayer = ({qualTextoMostrar, dados, state }) => {
    const [indexPlay, setIndexPlay] = state
    return (
       <Container>
           <div className={"paiLegenda " + qualTextoMostrar}>
                {qualTextoMostrar === "pt-en" && <>
                    <div className="en"><p> {dados.mySubtitle[indexPlay]} </p></div>
                    <div className="pt"><p> {dados.myTranslation[indexPlay]} </p></div>
                </>}
                {qualTextoMostrar === "en" && <>
                    <div className="en"><p> {dados.mySubtitle[indexPlay]} </p></div>
                </>}
                {qualTextoMostrar === "pt" && <>
                    <div className="en"><p> {dados.myTranslation[indexPlay]} </p></div>
                </>}
                {qualTextoMostrar === "pronunciaAndExemplo" && <>
                    <div className="pronuncia"><p> {dados.pronuncia[indexPlay]} </p></div>
                    <div className="en"><p> {dados.mySubtitle[indexPlay]} </p></div>
                    <div className="pt"><p> {dados.myTranslation[indexPlay]} </p></div>
                </>}
           </div>
       </Container>
    );
}

export default SubtitlePlayer;