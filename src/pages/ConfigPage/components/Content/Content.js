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

const Content = ({
  title,
  playIcon,
  setShowVideo,
  change,
  changeShow,
  whatPlay,
  hiddenButtonShow,
}) => {
  const { dados, changerDados, indexCardConfig } = useDados()

  return (
    <ContainerContent
      style={{
        opacity: changeShow && !dados[indexCardConfig][changeShow] ? 0.5 : 1,
      }}
    >
      <div className="title">
        {title}
        {changeShow && !hiddenButtonShow && (
          <MdRemoveRedEye
            onClick={() =>
              changerDados[indexCardConfig][changeShow](prev => !prev)
            }
            size={22}
          />
        )}
      </div>
      <div className="line-box exemplo-frase">
        <div className="content">
          <EditInPlace
            value={dados[indexCardConfig][change]}
            onChangeValue={changerDados[indexCardConfig][change]}
          />
        </div>
        {/* <MdSkipPrevious size={48} />
        <MdSkipNext size={48} /> */}
        {playIcon && (
          <MdPlayArrow
            onClick={() =>
              setShowVideo(prev => ({
                ...prev,
                [whatPlay ? whatPlay : change]: true,
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
