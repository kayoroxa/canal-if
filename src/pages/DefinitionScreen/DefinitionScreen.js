import React, { useState, useEffect } from 'react'
import { useDados } from '../../context/Dados'
import { Container } from './styles-definition-screen'
import {
  quebraDeLinha,
  recordChair,
} from '../../assets/data/scripts/quebraDeLinha'

const DefinitionScreen = () => {
  const [indexDefinition, setIndexDefinition] = useState(0)

  const {
    indexPlay,
    proximoIndexPlay,
    dados,
    proximaPage,
    voltarInicioPage,
  } = useDados()

  const [mostrarProximoCard, setMostrarProximoCard] = useState(false)

  const temMaisCard = indexPlay < Object.keys(dados).length - 1 ? true : false

  let tamanhoDeCaracteres = recordChair

  const frase = dados[indexPlay].frase
  // const dividir = frase.includes('|') ? frase.split('|') : quebraDeLinha(frase)
  const dividir = quebraDeLinha(frase.replaceAll('|', ''))

  let fim = false

  const teclaCLicada = e => {
    if (e.code === 'NumpadEnter' || fim) {
      proximaPage()
    } else if (e.code === 'Escape') {
      voltarInicioPage()
    } else setIndexDefinition(prev => prev + 1)
  }

  useEffect(() => {
    document.onkeydown = e => teclaCLicada(e)
    // if (indexDefinition === dados[indexPlay].wordTranslate.split(",").length +1) proximaPage()
    return () => (document.onkeydown = null)
  }, [indexDefinition])
  const caminhoAudioExterno = `
    ${process.env.PUBLIC_URL}/audios/audiosVideo/${indexPlay + 1}a.mp3
  `
  //////////////////////////////////////////////////////////////////
  const quantidadeDeLetrasLinha = Math.round(600 / dividir[0].length) + 'vw'
  const quantidadeDeLinhas = Math.round(16 / dividir.length) + 'vw'
  const quantidadeDefinition =
    Math.round(30 / dados[indexPlay].wordTranslate.split(',').length) + 'vw'

  console.log('quantidadeDeLetrasLinha', quantidadeDeLetrasLinha)
  console.log('quantidadeDeLinhas', quantidadeDeLinhas)
  console.log('quantidadeDefinition', quantidadeDefinition)
  return (
    <Container
      quantidadeDeLinhas={dividir.length}
      quantidadeDefinition={dados[indexPlay].wordTranslate.split(',').length}
      quantidadeDeLetrasLinha={dividir[0].length}
    >
      <audio
        src={
          caminhoAudioExterno
            ? caminhoAudioExterno
            : dados[indexPlay].voiceTranslate
        }
        autoPlay
        onEnded={() => proximaPage()}
      />
      <div className="frase">
        {dividir ? (
          dividir.map((element, i) => (
            <React.Fragment key={i}>
              <p>{element}</p>
            </React.Fragment>
          ))
        ) : (
          <p>{dados[indexPlay].frase}</p>
        )}
      </div>
      <div className="definition">
        {dados[indexPlay].wordTranslate.split(',').map((card, index) => (
          <li
            key={index}
            style={index < indexDefinition ? null : { opacity: 0 }}
          >
            <span className="bold">
              {card.split(':')[0].trim().toLowerCase()}
            </span>{' '}
            = {card.split(':')[1].trim().toLowerCase()}
          </li>
        ))}
      </div>
    </Container>
  )
}

export default DefinitionScreen
