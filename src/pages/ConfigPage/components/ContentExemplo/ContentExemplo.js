import React from 'react'

import { ContainerContentExemplo } from './styles-content-exemplo'
import Content from '../Content'

const ContentExemplo = ({ setShowVideo }) => {
  return (
    <ContainerContentExemplo>
      <div className="separar"></div>
      <Content
        setShowVideo={setShowVideo}
        title="Exemplo-frase"
        change="exemploFrase"
        changeShow="showExemplo"
        whatPlay="exemplo"
        playIcon
      />
      <Content
        setShowVideo={setShowVideo}
        title="Exemplo-translate"
        change="exemploTranslate"
        changeShow="showExemplo"
        hiddenButtonShow
      />
      <Content
        setShowVideo={setShowVideo}
        title="Exemplo Url"
        change="urlExemplo"
        changeShow="showExemplo"
        hiddenButtonShow
      />
    </ContainerContentExemplo>
  )
}

export default ContentExemplo
