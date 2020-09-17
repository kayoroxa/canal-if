import React, {useState, useEffect} from 'react';
import {getPronuncia} from '../../assets/data/scripts/pronunciation2.0';
import { Container } from './styles-pronunciation-screen';
import { useDados } from '../../context/Dados';

const PronunciationScreen = () => {
    const { proximaPage, dados, indexPlay, setIndexPlay } = useDados()

    let innerEasy = (() => {
        if (!dados[indexPlay]) return ""
        let innerEasy = dados[indexPlay].pronuncia
        
        innerEasy = innerEasy.replaceAll("{", "<span order='%' class=hidden>")
        innerEasy = innerEasy.replaceAll("}", "</span>")
        
        innerEasy = innerEasy.replaceAll("(", "<span order='%'>")
        innerEasy = innerEasy.replaceAll(")", "</span>")
        
        innerEasy = innerEasy.replaceAll("[", "<span order='%' class=change>")
        innerEasy = innerEasy.replaceAll("]", "</span>")

        innerEasy = innerEasy.replaceAll("´", "<span>")
        innerEasy = innerEasy.replaceAll("`", "</span>")
        
        const lengthOrder = (innerEasy.match(/%/g) || []).length
        for (let c = 1; c <= lengthOrder; c++) {
            innerEasy = innerEasy.replace("%", c)
        }
        return innerEasy
    })()

    const [step, setStep] = useState(0)

    useEffect(() => {
        if (!dados[indexPlay]) proximaPage()
    }, [indexPlay])

    useEffect(() => {
        if (step >= innerEasy.split("order").length) {
            setIndexPlay(prev => prev+1)
            setStep(0)
        }
    }, [step])

    useEffect(() => {
        document.onkeydown = () => setStep((prev) => prev +1)
        return () => document.onkeydown = null
    })

    return (
        <Container indexView={step < 0 ? 0 : step}>
            <div className="main">
                <p dangerouslySetInnerHTML={{ __html: innerEasy }} />
            </div>
        </Container>
    );
}

export default PronunciationScreen;