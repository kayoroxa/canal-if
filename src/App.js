import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import VideoScreen from './pages/VideoScreen';
import AudioScreen from './pages/AudioScreen';
import DefinitionScreen from './pages/DefinitionScreen';
import PronunciationScreen from './pages/PronunciationScreen';


import {dados} from './assets/data/tratarPyOutput';
import { roundToNearestMinutes } from 'date-fns';



function App() {
  const cronograma = [
    "pt",
    "en",
  ]
  const navigate = useNavigate()
  const [pageInicial, setPageInicial] = useState(true)
  const [qualTextoMostrar, setQualTextoMostrar] = useState(cronograma[0])
  // document.addEventListener('keydown', () => console.log("key-----------"));

  useEffect(() => {
    pageInicial ? navigate("/pronunciation-screen") : navigate("/")
  }, [pageInicial])

  
  return (
      <>
        <GlobalStyles />
        <Routes>
          <Route path="/translate-screen" element={<DefinitionScreen frase = {"Man, i like you whats your name"} />} />
          <Route path="/pronunciation-screen" element={<PronunciationScreen frase = {"Man, i like you whats your name"} />} />
          <Route path="/videos-screen" element={<VideoScreen qualTextoMostrar={qualTextoMostrar} dados={dados} />} />
          <Route path="/audio-screen" element={<AudioScreen />} />
          <Route path="/" element={<div onClick={() => setPageInicial(true)}>Press any Key</div>} />
        </Routes>
      </>
  );
}

export default App;
