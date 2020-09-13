import React, {useState} from 'react';
import {getPronuncia} from '../../assets/data/scripts/pronunciation2.0';
import { Container } from './styles-pronunciation-screen';

const PronunciationScreen = ({frase}) => {
    //fazer colocar index para mostrar todas as pronuncias e definition
    
    const [step, setStep] = useState(0)
    // const componentString = getPronuncia("There is so much to understand.")
    // const componentString = getPronuncia("gave him all the money he had")
    const componentString = getPronuncia(frase)
    // const componentString = "take<span order=1>k you</span> <span order=2>com<span order=3>e</span> on</span>"


    document.onkeydown = () => setStep((prev) => prev +1)

    return (
        <Container indexView={step}>
            <div className="main">
                <p dangerouslySetInnerHTML={{ __html: componentString }} />
            </div>
        </Container>
    );
}

export default PronunciationScreen;