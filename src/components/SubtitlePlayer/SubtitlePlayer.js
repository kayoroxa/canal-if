import React from 'react';
import { useDados } from '../../context/Dados';
import { Container } from './styles-subtitle-player';

const SubtitlePlayer = ({qualTextoMostrar, state }) => {
    const [indexPlay, setIndexPlay] = state
    let {dados} = useDados()
    dados = Object.values(dados)

    const dividirEmDois = (frase) => {
        const arrayJuntar = [[], []]
        const fraseSplit = frase.split('.')
        if (fraseSplit[1] && fraseSplit[1] !== "") {
            for (let frase of fraseSplit) {
                if (arrayJuntar[0]) {
                    if (arrayJuntar[0].length < 50) {
                        arrayJuntar[0].push(frase)
                    }
                    else arrayJuntar[1].push(frase)
                }
            }
        }
        else {
            return <p>{frase}</p> 
        }
        const frase1 = arrayJuntar[0]
        console.log(frase1)
        const frase2 = arrayJuntar[1]

        return <> <p>{frase1}</p> <p>{frase2}</p> </>
    }

    const en = dividirEmDois(dados[indexPlay].frase)

    const pt = dividirEmDois(dados[indexPlay].fraseTranslate)

    return (
       <Container>
            <div className={"paiLegenda " + qualTextoMostrar}>
                {dados[indexPlay] && qualTextoMostrar === "pt-en" && <>
                    <div className="en"><p> {dados[indexPlay].frase} </p></div>
                    <div className="pt"><p> {dados[indexPlay].fraseTranslate}</p></div>
                </>}
                {dados[indexPlay] && qualTextoMostrar === "en" && <>
                    <div className="en">{en}</div>
                </>}
                {dados[indexPlay] && qualTextoMostrar === "pt" && <>
                    <div className="en">{pt}</div>
                </>}
                {dados[indexPlay] && qualTextoMostrar === "exemplo" && <>
                    {/* <div className="pronuncia"><p> {dados[indexPlay].pronuncia} </p></div> */}
                    <div className="en"><p> {dados[indexPlay].exemploFrase} </p></div>
                    <div className="pt"><p> {dados[indexPlay].exemploTranslate} </p></div>
                </>}
            </div>
       </Container>
    );
}

export default SubtitlePlayer;