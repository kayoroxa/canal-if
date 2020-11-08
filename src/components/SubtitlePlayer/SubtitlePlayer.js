import React from 'react'
import { useDados } from '../../context/Dados'
import { Container } from './styles-subtitle-player'

const SubtitlePlayer = ({ qualTextoMostrar, state }) => {
  const [indexPlay, setIndexPlay] = state
  let { dados } = useDados()
  dados = Object.values(dados)

  const separarString = (texto, permitido = 35) => {
    const separados = texto.split(' ')
    const quantidadeDePalavras = separados.length
    if (texto.length > permitido) {
      const divididoPor2 = Math.ceil(quantidadeDePalavras / 2)
      let listaSeparada2 = [
        separados.slice(0, divididoPor2).join(' '),
        separados.slice(divididoPor2).join(' '),
      ]
      if (listaSeparada2[0].length < permitido) return listaSeparada2
      else {
        const divididoPor3 = Math.ceil(quantidadeDePalavras / 3)
        let listaSeparada3 = [
          separados.slice(0, divididoPor3).join(' '),
          separados.slice(divididoPor3, divididoPor3 * 2).join(' '),
          separados.slice(divididoPor3 * 2).join(' '),
        ]
        if (listaSeparada3[0].length < permitido) return listaSeparada3
        else return [texto]
      }
    } else return [texto]
  }

  //   const en = separarString(dados[indexPlay].frase).map((frase, i) => (
  //     <p key={i}>{frase}</p>
  //   ))
  //   const pt = separarString(dados[indexPlay].fraseTranslate).map((frase, i) => (
  //     <p key={i}>{frase}</p>
  //   ))

  const en = dados[indexPlay].frase
    .split('|')
    .map((frase, i) => <p key={i}>{frase}</p>)
  const pt = dados[indexPlay].fraseTranslate
    .split('|')
    .map((frase, i) => <p key={i}>{frase}</p>)

  let marcarWordsExemplo = () => {
    let exemplo = dados[indexPlay].exemploFrase
    let allWords = new RegExp('\\b(\\w*[a-zA-z]\\w*)\\b', 'ig')
    console.log([...dados[indexPlay].frase.match(allWords)])
    for (let ww of [...dados[indexPlay].frase.match(allWords)]) {
      let re = new RegExp('\\b(' + ww + ')\\b', 'ig')
      exemplo = exemplo.replace(re, '<span className="bold">$1</span>')
    }
    console.log(exemplo)
    return exemplo
  }

  return (
    <Container>
      <div className={'paiLegenda ' + qualTextoMostrar}>
        {dados[indexPlay] && qualTextoMostrar === 'pt-en' && (
          <>
            <div className="en">
              <p> {dados[indexPlay].frase} </p>
            </div>
            <div className="pt">
              <p> {dados[indexPlay].fraseTranslate}</p>
            </div>
          </>
        )}
        {dados[indexPlay] && qualTextoMostrar === 'en' && (
          <>
            <div className="en">{en}</div>
          </>
        )}
        {dados[indexPlay] && qualTextoMostrar === 'pt' && (
          <>
            <div className="en">{pt}</div>
          </>
        )}
        {dados[indexPlay] && qualTextoMostrar === 'exemplo' && (
          <>
            <div className="exemplo en">
              <p dangerouslySetInnerHTML={{ __html: marcarWordsExemplo() }} />
            </div>
            <div className="exemplo pt">
              <p> {dados[indexPlay].exemploTranslate} </p>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}

export default SubtitlePlayer
