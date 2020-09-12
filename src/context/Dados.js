import React, { createContext, useState, useContext } from 'react';

const DadosContext = createContext();

export default function DadosProvider({ children }) {
    const [indexCardConfig, setIndexCardConfig] = useState(0)
    const [dados, setDados] = useState([
        {
            frase : "Hey, rise and shine, everybody.",
            fraseTranslate : "Ei, levante-se e brilhe, pessoal.",
            urlFrase : "https://y.yarn.co/b0d4a82a-8ee6-420c-8fa8-66b471a39cae.mp4",
            wordTranslate : "i can live in my house",
            pronuncia : "asfasf",
            exemploFrase : "Rise and shine, detectives, rise and shine.",
            exemploTranslate : "Levante-se e brilhe, detetives, levante-se e brilhe.",
            urlExemplo : "https://y.yarn.co/5cf2ef1b-042e-4c7f-9301-aa096de1975a.mp4",
        },
        {
            frase : "Where is everybody?",
            fraseTranslate : "Onde está todo mundo?",
            urlFrase : "https://y.yarn.co/e27b6803-3dae-4b65-a836-94a02ef19b65.mp4",
            wordTranslate : "i can live in my house",
            pronuncia : "asfasf",
            exemploFrase : "Where is everybody?",
            exemploTranslate : "Onde está todo mundo?",
            urlExemplo : "https://y.yarn.co/a30fb031-881a-4885-b116-f3944d46d5fb.mp4",
        },
    ])

    const changerDados = (() => {
        const subChanger = (name, index) => value => setDados((prev) => ({
            ...prev, [index] : {...prev[index], [name]: [value]} 
        }))
        const retornar = Object.keys(dados).map((_) => ({}))

        for (const [index, card] of retornar.entries()) {
            for (let key of Object.keys(dados[index])) {
                card[key] = subChanger(key, index)
            }
            // retornar.push({})
        }
        return retornar
    })()

    return (
       <DadosContext.Provider
            value={{
                dados,
                changerDados,
                indexCardConfig,
                setIndexCardConfig
            }}
       >
            {children}
       </DadosContext.Provider>
    );
}

export function useDados() {
    const context = useContext(DadosContext);
    if (!context) throw new Error('useDados must be used within a DadosProvider');
    const {
        dados,
        changerDados,
        indexCardConfig,
        setIndexCardConfig
    } = context;
    return {
        dados,
        changerDados,
        indexCardConfig,
        setIndexCardConfig
    };
}