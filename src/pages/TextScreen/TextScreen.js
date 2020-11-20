import React, { useEffect } from 'react'
import { useDados } from '../../context/Dados'
import { Container } from './styles-text-screen'

const TextScreen = ({ texto }) => {
  const { proximaPage } = useDados()
  useEffect(() => {
    const tempo = setTimeout(() => {
      proximaPage()
    }, 2000)
    return () => clearTimeout(tempo)
  }, [])
  return (
    <Container>
      <p>VAMOS APRENDER</p>
      <p>A CENA</p>
    </Container>
  )
}

export default TextScreen
