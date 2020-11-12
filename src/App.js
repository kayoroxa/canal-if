import React from 'react'
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

function App() {
  // const { indexPlay, setIndexPlay } = useDados()
  // const cronograma = ['pt', 'en']
  // const navigate = useNavigate()
  // const [pageInicial, setPageInicial] = useState(true)
  // const [qualTextoMostrar, setQualTextoMostrar] = useState(cronograma[0])

  const { dados } = useDados()

  window.onbeforeunload = () => ''

  // window.onbeforeunload = function () {
  //     return "";
  // };

  return (
    <>
      <GlobalStyles />
      <Routes>
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
          path="/video-index"
          element={<VideoScreen qualTextoMostrar="en" />}
        />
        <Route
          path="/exemple"
          element={<VideoScreen qualTextoMostrar="exemplo" />}
        />
        <Route path="/null" element={<div />} />
        <Route
          path="/videos-completo-pt"
          element={<VideoScreen reproduzirTodos={true} qualTextoMostrar="pt" />}
        />
        <Route
          path="/videos-completo-en"
          element={<VideoScreen reproduzirTodos={true} qualTextoMostrar="en" />}
        />
        <Route
          path="/videos-completo-pt-en"
          element={
            <VideoScreen reproduzirTodos={true} qualTextoMostrar="pt-en" />
          }
        />
        <Route path="/fim" element={<AudioScreen alfaOmega="omega" />} />
        <Route path="/audio" element={<AudioScreen alfaOmega="alfa" />} />
        <Route
          path="/words-learning"
          element={<PageAllWordsLearning alfaOmega="alfa" />}
        />
        <Route path="/" element={<ConfigPage />} />
        <Route path="/test-recorder" element={<TestRecorder />} />
      </Routes>
    </>
  )
}

export default App
