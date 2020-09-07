import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import VideoScreen from './pages/VideoScreen';

import {dados} from './assets/data/tratarPyOutput';



function App() {
  const navigate = useNavigate()
  global.document.addEventListener('keydown', () => {navigate("/videos-screen")});

  return (
      <>
        <GlobalStyles />
        <Routes>
          <Route path="/videos-screen" element={<VideoScreen qualTextoMostrar="pt-en" dados={dados} />} />
          <Route path="/" element={<div>Press any Key</div>} />
        </Routes>
      </>
  );
}

export default App;
