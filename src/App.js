import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

import VideoScreen from './pages/VideoScreen';
import AudioScreen from './pages/AudioScreen';
import DefinitionScreen from './pages/DefinitionScreen';
import PronunciationScreen from './pages/PronunciationScreen';
import ConfigPage from './pages/ConfigPage';

import DadosProvider from './context/Dados';


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

  // useEffect(() => {
  //   pageInicial ? navigate("/pronunciation-screen") : navigate("/")
  // }, [pageInicial])

  
  return (
      <DadosProvider>
        <GlobalStyles />
        <Routes>
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/translate" element={<DefinitionScreen frase = {"Man, i like you whats your name"} />} />
          <Route path="/pronunciation" element={<PronunciationScreen frase = {"Man, i like you whats your name"} />} />
          <Route path="/videos" element={<VideoScreen qualTextoMostrar={qualTextoMostrar} dados={dados} />} />
          <Route path="/audio" element={<AudioScreen />} />
          <Route path="/" element={<div onClick={() => setPageInicial(true)}>Press any Key</div>} />
        </Routes>
      </DadosProvider>
  );
}

export default App;
