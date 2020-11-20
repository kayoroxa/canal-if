import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 100px;
    font-family: 'Assistant', sans-serif;
  }

  p:nth-child(1) {
    color: var(--blue);
  }
  p:nth-child(2) {
    color: lightgray;
  }
`
