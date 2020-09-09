import React from 'react';

import { Container } from './styles-pronunciation-screen';

const PronunciationScreen = ({frase}) => {
    const compTemp = () => {
        return (
            <p>
                than<span>k you</span> <span>com<span>e</span> on</span>
            </p>
        )
    }
    return (
        <Container>
            <div className="main">
                {compTemp()}
            </div>
        </Container>
    );
}

export default PronunciationScreen;