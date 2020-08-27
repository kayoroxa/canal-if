import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import VideoScreen from './pages/VideoScreen';

import {dados} from './assets/data/tratarPyOutput';



function App() {
  // console.log(dados)
  return (
    <>
      <GlobalStyles />
      
      <VideoScreen qualTextoMostrar="pt-en" dados={dados} />
    </>
  );
}

export default App;
