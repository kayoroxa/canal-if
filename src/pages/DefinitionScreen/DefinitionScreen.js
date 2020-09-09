import React, {useState, useEffect} from 'react';

import { Container } from './styles-definition-screen';

const DefinitionScreen = ({frase}) => {
    const [indexDefinition, setIndexDefinition] = useState(0)
    const dividir = (() => {
        const lista = []
        if (frase.length > 22) {
            const tamanho = frase.split(' ').length
            const separados = [frase.split(' ').slice(0, (tamanho/2) +1).join(" "), frase.split(' ').slice((tamanho/2 +1)).join(" ")]
            if (separados.length > 1) {
                for (let valor of separados) {
                    lista.push(<p>{valor}</p>)
                }
                return lista
            }
        }
        return false
    })()

    const definition = {
        "man": "homem / cara",
        "i like you": "eu gosto de você",
        "what's / what is" : "qual é",
        "your name" : "seu nome"
    }
    
    const teclaCLicada = () => {
        setIndexDefinition((prev) => prev < Object.keys(definition).length -1 ? prev + 1 : 0)
    }
    document.onkeydown = teclaCLicada
    //////////////////////////////////////////////////////////////////
    return (
       <Container>
           <div className="frase">
                {dividir ? dividir.map((element, i) => <React.Fragment key={i}>{element}</React.Fragment>) : <p>{frase}</p>}
           </div>
           <div className="definition">
                {Object.keys(definition).map((key, index) => (
                    <p key={index} style={index <= indexDefinition ? null : {opacity: 0}}>
                        <span className="bold">{key}</span> = {definition[key]}
                    </p>
                ))}
           </div>
       </Container>
    );
}

export default DefinitionScreen;