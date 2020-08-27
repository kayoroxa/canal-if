import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import VideoScreen from './pages/VideoScreen';

import {dados} from './assets/data/tratarPyOutput';



function App() {
  return (
    <>
      <GlobalStyles />
      
      <VideoScreen dados={dados} />
    </>
  );
}

export default App;
