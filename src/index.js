import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import DadosProvider from './context/Dados';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DadosProvider>
        <App />
      </DadosProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);