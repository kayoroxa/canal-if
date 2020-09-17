import React, {useState, useEffect} from 'react';
import { useDados } from '../../context/Dados';
import { Container } from './styles-definition-screen';

const DefinitionScreen = () => {
    const [indexDefinition, setIndexDefinition] = useState(0)
    const { indexPlay, proximoIndexPlay, dados, proximaPage } = useDados()
    const [mostrarProximoCard, setMostrarProximoCard] = useState(false)

    const temMaisCard = indexPlay < Object.keys(dados).length -1 ? true : false
    const dividir = (() => {
        const lista = []
        if (dados[indexPlay].frase.length > 22) {
            const tamanho = dados[indexPlay].frase.split(' ').length
            const separados = [dados[indexPlay].frase.split(' ').slice(0, (tamanho/2) +1).join(" "), dados[indexPlay].frase.split(' ').slice((tamanho/2 +1)).join(" ")]
            if (separados.length > 1) {
                for (let valor of separados) {
                    lista.push(<p>{valor}</p>)
                }
                return lista
            }
        }
        return false
    })()

    const teclaCLicada = () => {
        setIndexDefinition((prev) => prev < dados[indexPlay].wordTranslate.split(",").length  ? (
            prev + 1
        ) : (
            0
        ))
    }
    
    useEffect(() => {
        document.onkeydown = teclaCLicada

        if (indexDefinition === dados[indexPlay].wordTranslate.split(",").length) setMostrarProximoCard(true)

        else if (mostrarProximoCard && temMaisCard === true) {
            proximoIndexPlay()
            setMostrarProximoCard(false)
        }

        else if (mostrarProximoCard  && temMaisCard === false) {
            proximaPage()
            setMostrarProximoCard(false)
        }

        return () => document.onkeydown = null
    }, [indexDefinition])

    
    //////////////////////////////////////////////////////////////////
    return (
       <Container>
           <div className="frase">
                {dividir ? dividir.map((element, i) => <React.Fragment key={i}>{element}</React.Fragment>) : <p>{dados[indexPlay].frase}</p>}
           </div>
           <div className="definition">
                {dados[indexPlay].wordTranslate.split(",").map((card, index) => (
                    <p key={index} style={index < indexDefinition ? null : {opacity: 0}}>
                        <span className="bold">{card.split(":")[0].trim()}</span> = {card.split(":")[1].trim()}
                    </p>
                ))}
           </div>
       </Container>
    );
}

export default DefinitionScreen;