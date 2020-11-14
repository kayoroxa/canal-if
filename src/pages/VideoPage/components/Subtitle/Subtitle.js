import React from 'react'

import { ContainerSubtitle } from './styles-subtitle'

const Subtitle = ({ subtitleData }) => {
  //{pt:"", en:""}

  return (
    <ContainerSubtitle>
      {Object.values(subtitleData).map((textSubtitle, index) => (
        <p key={index}>{textSubtitle}</p>
      ))}
    </ContainerSubtitle>
  )
}

export default Subtitle
