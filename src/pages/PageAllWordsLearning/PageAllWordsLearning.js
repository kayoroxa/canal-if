import React, { useEffect } from 'react'
import { useDados } from '../../context/Dados'
import { ContainerPageAllWordsLearning } from './styles-page-all-words-learning'

const PageAllWordsLearning = () => {
  const { dados, proximaPage, voltarInicioPage } = useDados()

  const teclou = e => {
    if (e.code === 'NumpadEnter') {
      proximaPage()
    } else if (e.code === 'Escape') {
      voltarInicioPage()
    }
  }
  useEffect(() => {
    document.onkeydown = e => teclou(e)
    return () => (document.onkeydown = null)
  }, [])

  const uniqueWords = (() => {
    const arrayUniqueWords = []
    dados.map(card => {
      const arrayCardUniqueWords = card['wordTranslate'].match(
        /(?<=\,\s|^).+?(?=\:)/gi
      )
      // const arrayCardUniqueWords = card["wordTranslate"].match(/[a-zA-Z'’]+(?=:)/gi)
      for (let word of arrayCardUniqueWords) {
        if (!arrayUniqueWords.includes(word)) {
          arrayUniqueWords.push(word)
        }
      }
    })
    return arrayUniqueWords
  })()
  console.log(uniqueWords)
  return (
    <ContainerPageAllWordsLearning>
      <h1 className="bold">{uniqueWords.length} EXPRESSÕES</h1>
      <div className="folha">
        <div className="delimitar">
          {uniqueWords.map((word, index) => (
            <div key={index}>{word.toLowerCase()}</div>
          ))}
        </div>
      </div>

      <audio
        src={process.env.PUBLIC_URL + '/audios/wordsLearning.mp3'}
        autoPlay
        onEnded={() => proximaPage()}
      />
    </ContainerPageAllWordsLearning>
  )
}

export default PageAllWordsLearning
