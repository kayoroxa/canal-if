import styled from 'styled-components'

export const ContainerVideoPage = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    position: absolute;
    right: 32%;
    bottom: 42%;
    font-size: 30px;
    opacity: 0.2;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
  }

  .exemplo-mark {
    width: 120px;
    height: 50px;
    position: absolute;
    left: 3%;
    top: 5%;
    background: var(--blue);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 110px;
    font-size: 40px;
  }
`

export const _BoxVideo = styled.div`
  /* background-color: pink; */
  width: 45%;
  height: 50%;
  border-radius: 50px;
  overflow: hidden;

  video {
    min-width: 100%;
    min-height: 100%;
    border-radius: 50px;
  }
`
