import React, {useState, useEffect} from 'react';
import { useDados } from '../../context/Dados';
import { Container } from './styles-definition-screen';
import { quebraDeLinha, recordChair } from '../../assets/data/scripts/quebraDeLinha';

const DefinitionScreen = () => {
    const [indexDefinition, setIndexDefinition] = useState(0)
    
    const { 
        indexPlay,
        proximoIndexPlay,
        dados,
        proximaPage
    } = useDados()

    const [mostrarProximoCard, setMostrarProximoCard] = useState(false)

    const temMaisCard = indexPlay < Object.keys(dados).length -1 ? true : false

    let tamanhoDeCaracteres = recordChair

    const dividir = quebraDeLinha(dados[indexPlay].frase)

    const teclaCLicada = (e) => {
        if (e.code === "NumpadEnter") {
            proximaPage()
        }
        else {
            setIndexDefinition((prev) => prev < dados[indexPlay].wordTranslate.split(",").length  ? (
                prev + 1
            ) : (
                0
            ))
        }
    }
    
    useEffect(() => {
        document.onkeydown = (e) => teclaCLicada(e)
        if (indexDefinition === dados[indexPlay].wordTranslate.split(",").length) proximaPage()
        return () => document.onkeydown = null
    }, [indexDefinition])

    
    //////////////////////////////////////////////////////////////////
    return (
        <Container 
            quantidadeDeLinhas = {dividir.length}
            quantidadeDefinition = {dados[indexPlay].wordTranslate.split(",").length}
        >
            <audio src={dados[indexPlay].voiceTranslate} autoPlay/>
            <div className="frase">
                 {dividir ? dividir.map((element, i) => <React.Fragment key={i}><p>{element}</p></React.Fragment>) : <p>{dados[indexPlay].frase}</p>}
            </div>
            <div className="definition">
                {dados[indexPlay].wordTranslate.split(",").map((card, index) => (
                    <li key={index} style={index < indexDefinition ? null : {opacity: 0}}>
                        <span className="bold">{card.split(":")[0].trim()}</span> = {card.split(":")[1].trim()}
                    </li>
                ))}
            </div>
        </Container>
    );
}

export default DefinitionScreen;