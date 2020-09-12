import React, { createContext, useState, useContext } from 'react';

const DadosContext = createContext();

export default function DadosProvider({ children }) {
    const [indexCardConfig, setIndexCardConfig] = useState(0)
    const [dados, setDados] = useState([
        {
            value1 : "tela 1",
            value2 : "Não posso viver1",
            value3 : "i can live in my house",
            value4 : "asfasf",
            value5 : "groua11sfasfp 5",
            value6 : "groas11fasfup 6",
        },
        {
            value1 : "tela 2",
            value2 : "Não posso viver2",
            value3 : "gasd22fasfaf3",
            value4 : "as2fasf",
            value5 : "grou2asfasfp 5",
            value6 : "groa2sfasfup 6",
        },
        {
            value1 : "tela 3",
            value2 : "Não poasdasdsso viver2",
            value3 : "gasd22fasfaf3",
            value4 : "as2fasf",
            value5 : "grou2asfasfp 5",
            value6 : "groa2sfasfup 6",
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