import React, {useState} from 'react';

import { Container } from './styles-pronunciation-screen';

const PronunciationScreen = ({frase}) => {
    // const string = "THANK YOU COME ON"
    const [step, setStep] = useState(0)
    const componentString = "than<span order=1>k you</span> <span order=2>com<span order=3>e</span> on</span>"


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