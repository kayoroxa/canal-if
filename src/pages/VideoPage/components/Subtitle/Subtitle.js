import React from 'react'

import { ContainerSubtitle } from './styles-subtitle'

const Subtitle = ({ pt, en }) => {
  //{pt:"", en:""}

  return (
    <ContainerSubtitle>
      {pt && <p>{pt}</p>}
      {en && <p>{en}</p>}
      {/* {Object.values(subtitleData).map((textSubtitle, index) => (
        <p key={index}>{textSubtitle}</p>
      ))} */}
    </ContainerSubtitle>
  )
}

export default Subtitle
