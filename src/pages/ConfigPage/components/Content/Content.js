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
  index,
  clickInPlay,
  exemplo,
}) => {
  // const index = 0

  const toggleExemploIndexShow = exemplosArray => {
    console.log(exemplosArray)
    exemplosArray = { ...exemplosArray }
    exemplosArray[1].showExemplo = !exemplosArray[1].showExemplo
    exemplosArray = Object.values(exemplosArray)
    console.log(exemplosArray)
    return exemplosArray
  }

  const { dados, changerDados, indexCardConfig } = useDados()
  window.changer = changerDados[indexCardConfig]
  return (
    <ContainerContent
      style={
        !exemplo
          ? {
              opacity:
                changeShow && !dados[indexCardConfig][changeShow] ? 0.5 : 1,
            }
          : {
              opacity: !dados[indexCardConfig]['showExemplos'][index] ? 0.5 : 1,
            }
      }
    >
      <div className="title">
        {title}
        {changeShow && !hiddenButtonShow && (
          <MdRemoveRedEye
            onClick={
              () =>
                !exemplo
                  ? changerDados[indexCardConfig][changeShow](prev => !prev)
                  : changerDados[indexCardConfig]['showExemplos'](prev => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
              // : changerDados[indexCardConfig]['exemplos'][index][changeShow](
              //     prev => !prev
              //   )
            }
            size={22}
          />
        )}
      </div>
      <div className="line-box exemplo-frase">
        <div className="content">
          <EditInPlace
            value={
              exemplo
                ? dados[indexCardConfig]['exemplos'][index][change]
                : dados[indexCardConfig][change]
            }
            onChangeValue={
              !exemplo
                ? changerDados[indexCardConfig][change]
                : changerDados[indexCardConfig][change]
              // : changerDados[indexCardConfig]['exemplos'][0][change]
            }
          />
        </div>
        {/* <MdSkipPrevious size={48} />
        <MdSkipNext size={48} /> */}
        {playIcon && (
          <MdPlayArrow
            onClick={() =>
              clickInPlay(
                !exemplo
                  ? dados[indexCardConfig]['urlFrase']
                  : dados[indexCardConfig]['exemplos'][index]['urlExemplo']
              )
            }
            // onClick={() =>
            //   setShowVideo(prev => ({
            //     ...prev,
            //     [whatPlay ? whatPlay : change]: true,
            //   }))
            // }
            size={48}
          />
        )}
      </div>
    </ContainerContent>
  )
}

export default Content
