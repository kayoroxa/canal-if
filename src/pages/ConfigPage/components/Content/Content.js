import React from 'react'

import { ContainerContent } from './styles-content'
import EditInPlace from '../../../../components/EditInPlace'

import { useDados } from '../../../../context/Dados'

import {
  MdQueuePlayNext,
  MdDiscFull,
  MdPlayArrow,
  MdNavigateBefore,
  MdNavigateNext,
  MdSkipPrevious,
  MdSkipNext,
  MdRemoveRedEye,
} from 'react-icons/md'

const Content = ({ title, playIcon, setShowVideo, hiddenButton, change }) => {
  const { dados, changerDados, indexCardConfig } = useDados()

  const whatChange = {
    exemplo: {
      show: 'showExemplo',
      main: 'exemploFrase',
    },
    pronunciation: {
      show: 'showPronuncia',
      main: 'pronuncia',
    },
    definition: {
      show: 'showDefinition',
      main: 'wordTranslate',
    },
    frase: {
      show: true,
      main: 'frase',
    },
    fraseTranslate: {
      show: true,
      main: 'fraseTranslate',
    },
  }

  return (
    <ContainerContent
      style={{
        opacity:
          whatChange[change].show === true ||
          dados[indexCardConfig][whatChange[change].show]
            ? 1
            : 0.5,
      }}
    >
      <div className="title">
        {title}
        {hiddenButton && (
          <MdRemoveRedEye
            onClick={() =>
              changerDados[indexCardConfig][whatChange[change].show](
                prev => !prev
              )
            }
            size={22}
          />
        )}
      </div>
      <div className="line-box exemplo-frase">
        <div className="content">
          <EditInPlace
            value={dados[indexCardConfig][whatChange[change].main]}
            onChangeValue={
              changerDados[indexCardConfig][whatChange[change].main]
            }
          />
        </div>
        {/* <MdSkipPrevious size={48} />
        <MdSkipNext size={48} /> */}
        {playIcon && (
          <MdPlayArrow
            onClick={() =>
              setShowVideo(prev => ({
                ...prev,
                [whatChange[change].main]: true,
              }))
            }
            size={48}
          />
        )}
      </div>
    </ContainerContent>
  )
}

export default Content
