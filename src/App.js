import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import { useDados } from './context/Dados'
import VideoScreen from './pages/VideoScreen'
import AudioScreen from './pages/AudioScreen'
import DefinitionScreen from './pages/DefinitionScreen'
import PronunciationScreen from './pages/PronunciationScreen'
import PageAllWordsLearning from './pages/PageAllWordsLearning'
import ConfigPage from './pages/ConfigPage'
import TestRecorder from './pages/TestRecorder'
import VideoPage from './pages/VideoPage'
import TextScreen from './pages/TextScreen'
import Test from './pages/Test'
import VideoComponent from './components/VideoComponent'

function App() {
  // const { indexPlay, setIndexPlay } = useDados()
  // const cronograma = ['pt', 'en']
  // const navigate = useNavigate()
  // const [pageInicial, setPageInicial] = useState(true)
  // const [qualTextoMostrar, setQualTextoMostrar] = useState(cronograma[0])

  const { dados, indexPlay } = useDados()

  window.onbeforeunload = () => ''

  // window.onbeforeunload = function () {
  //     return "";
  // };

  const sessionVideo = {
    allVideos: () =>
      dados.map(card => ({
        urlFrase: card.urlFrase,
        subtitle: { en: card.frase, pt: card.fraseTranslate },
      })),
    exemplo: () => {
      const retornar = []
      if (dados[indexPlay]) {
        for (const [index, exemploCard] of Object.values(
          dados[indexPlay].exemplos
        ).entries()) {
          if (dados[indexPlay]['showExemplos'][index] === true) {
            retornar.push({
              urlFrase: exemploCard.urlExemplo,
              subtitle: {
                en: exemploCard.exemploFrase,
                pt: exemploCard.exemploTranslate,
              },
            })
          }
        }
      }
      return retornar
      // return Object.values(dados[indexPlay].exemplos).map(exemploCard => [
      //   {
      //     urlFrase: exemploCard.urlExemplo,
      //     subtitle: {
      //       en: exemploCard.exemploFrase,
      //       pt: exemploCard.exemploTranslate,
      //     },
      //   },
      // ])
    },
    onlyCard: () => {
      if (dados[indexPlay]) {
        return [
          {
            urlFrase: dados[indexPlay].urlFrase,
            subtitle: {
              pt: dados[indexPlay].fraseTranslate,
              en: dados[indexPlay].frase,
            },
          },
        ]
      } else return []
    },
  }
  const [tocarOVideo, setTocarOVideo] = useState(null)
  // const videosPreLoad = (() => {
  //   const allLinks = []
  //   for (let card of dados) {
  //     allLinks.push([
  //       card.urlFrase,
  //       ...card.exemplos.map(exemplo => exemplo.urlExemplo),
  //     ])
  //   }
  //   console.log(allLinks)
  //   return (
  //     <>
  //       {allLinks.map((cardLink, indexCard) =>
  //         cardLink.map((linkInCard, indexLink) => (
  //           <VideoComponent
  //             key={`${indexCard}${indexLink}`}
  //             style={{ position: 'fixed', opacity: 1 }}
  //             // style={videoStyle}
  //             playing={
  //               tocarOVideo === `${indexCard}${indexLink}` ? true : false
  //             }
  //             hidden={tocarOVideo !== `${indexCard}${indexLink}` ? true : false}
  //             src={linkInCard}
  //           />
  //         ))
  //       )}
  //     </>
  //   )
  // })()

  return (
    <>
      <GlobalStyles />
      {/* {videosPreLoad} */}
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/null" element={<div />} />
        {/* <Route path="/config" element={<Test />} /> */}
        <Route path="/config" element={<ConfigPage />} />
        <Route
          path="/translate"
          element={<DefinitionScreen frase={dados[0].frase} />}
        />
        <Route
          path="/pronunciation"
          element={<PronunciationScreen frase={dados[0].frase} />}
        />
        <Route
          path="/exemple"
          element={
            <VideoPage
              playData={sessionVideo.exemplo()}
              exemplo
              setTocarOVideo={setTocarOVideo}
            />
          }
        />
        <Route
          path="/video-index"
          element={
            <VideoPage
              playData={sessionVideo.onlyCard()}
              onlyEn
              setTocarOVideo={setTocarOVideo}
            />
          }
        />
        <Route
          path="/videos-completo-pt-en"
          element={
            <VideoPage
              playData={sessionVideo.allVideos()}
              setTocarOVideo={setTocarOVideo}
            />
          }
        />
        {/* <Route
          path="/videos-completo-en"
          element={<VideoPage playData={sessionVideo.allVideos()} onlyEn />}
        /> */}
        <Route path="/lets-learning" element={<TextScreen />} />
        <Route path="/fim" element={<AudioScreen alfaOmega="omega" />} />
        <Route path="/audio" element={<AudioScreen alfaOmega="alfa" />} />
        <Route
          path="/words-learning"
          element={<PageAllWordsLearning alfaOmega="alfa" />}
        />

        <Route path="/test-recorder" element={<TestRecorder />} />
      </Routes>
    </>
  )
}

export default App
