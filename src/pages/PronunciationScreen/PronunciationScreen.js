import React, { useState, useEffect, useRef } from 'react'
import { getPronuncia } from '../../assets/data/scripts/pronunciation2.0'
import { Container } from './styles-pronunciation-screen'
import { useDados } from '../../context/Dados'

import { GiSpeaker } from 'react-icons/gi'

const PronunciationScreen = () => {
  const { proximaPage, dados, indexPlay, voltarInicioPage } = useDados()

  useEffect(() => {
    if (!dados[indexPlay].showPronuncia) proximaPage()
  }, [])

  const [verIcon, setVerIcon] = useState(false)
  let innerEasy = (() => {
    if (!dados[indexPlay]) return ''
    let innerEasy = dados[indexPlay].pronuncia

    innerEasy = innerEasy.replaceAll('{', "<span order='%' class=hidden>")
    innerEasy = innerEasy.replaceAll('}', '</span>')

    innerEasy = innerEasy.replaceAll('(', "<span order='%'>")
    innerEasy = innerEasy.replaceAll(')', '</span>')

    innerEasy = innerEasy.replaceAll('[', "<span order='%' class=change>")
    innerEasy = innerEasy.replaceAll(']', '</span>')

    innerEasy = innerEasy.replaceAll('´', '<span>')
    innerEasy = innerEasy.replaceAll('`', '</span>')

    innerEasy = innerEasy.replaceAll('|', '<br>')

    const lengthOrder = (innerEasy.match(/%/g) || []).length
    for (let c = 1; c <= lengthOrder; c++) {
      innerEasy = innerEasy.replace('%', c)
    }
    return innerEasy
  })()

  const [step, setStep] = useState(0)

  const teclou = e => {
    if (e.code === 'NumpadEnter') {
      proximaPage()
    } else if (e.code === 'Escape') {
      voltarInicioPage()
    } else {
      setStep(prev =>
        prev < innerEasy.split('order').length ? prev + 1 : prev
      )
    }
  }

  const audioAcabou = () => {
    audioPronunciaRef.current.play()
    setVerIcon(true)
  }

  useEffect(() => {
    document.onkeydown = e => teclou(e)
    return () => (document.onkeydown = null)
  })

  const audioPronunciaRef = useRef(null)
  const audioPronunciaRef2 = useRef(null)
  const speakRef = useRef(null)

  const caminhoAudioExterno = `
    ${process.env.PUBLIC_URL}/audios/audiosVideo/${indexPlay + 1}b.mp3
  `
  return (
    dados[indexPlay].showPronuncia && (
      <Container indexView={step < 0 ? 0 : step}>
        <audio
          src={
            caminhoAudioExterno
              ? caminhoAudioExterno
              : dados[indexPlay].voicePronuncia
          }
          autoPlay
          onEnded={() => audioAcabou()}
        />

        <audio
          ref={audioPronunciaRef}
          src={dados[indexPlay].urlFrase}
          onEnded={() => audioPronunciaRef2.current.play()}
        />
        <audio
          ref={audioPronunciaRef2}
          src={dados[indexPlay].urlFrase}
          onEnded={() => proximaPage()}
        />
        {/* <audio src={process.env.PUBLIC_URL + '/audios/p' + indexPlay + '.mp3'} autoPlay/> */}
        <div className="main">
          <p dangerouslySetInnerHTML={{ __html: innerEasy }} />
        </div>
        <GiSpeaker
          ref={speakRef}
          size={150}
          fill="orange"
          style={verIcon ? { opacity: '1' } : { opacity: '0' }}
        />
      </Container>
    )
  )
}

export default PronunciationScreen
