import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import { useDados } from './context/Dados';
import VideoScreen from './pages/VideoScreen';
import AudioScreen from './pages/AudioScreen';
import DefinitionScreen from './pages/DefinitionScreen';
import PronunciationScreen from './pages/PronunciationScreen';
import ConfigPage from './pages/ConfigPage';


function App() {
  const { indexPlay, setIndexPlay } = useDados()
  const cronograma = [
    "pt",
    "en",
  ]
  const navigate = useNavigate()
  const [pageInicial, setPageInicial] = useState(true)
  const [qualTextoMostrar, setQualTextoMostrar] = useState(cronograma[0])

  const {dados} = useDados()

  
  return (
      <>
        <GlobalStyles />
        <Routes>
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/translate" element={<DefinitionScreen frase = {dados[0].frase} />} />
          <Route path="/pronunciation" element={<PronunciationScreen frase = {dados[0].frase} />} />
          <Route path="/video-index" element={<VideoScreen  qualTextoMostrar="en" />} />
          <Route path="/videos-completo" element={<VideoScreen reproduzirTodos={true} qualTextoMostrar={qualTextoMostrar} />} />
          <Route path="/fim" element={<div>FIM!!</div>} />
          <Route path="/audio" element={<AudioScreen />} />
          <Route path="/" element={<ConfigPage />} />
        </Routes>
      </>
  );
}

export default App;
