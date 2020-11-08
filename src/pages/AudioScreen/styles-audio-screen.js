import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  > video {
    position: fixed;
    min-width: 100%;
    min-height: 100%;
    /* filter: blur(10px); */
  }
  > .title {
    z-index: 2;

    /* background: white; */
    width: 50%;
    height: 50%;
    margin: auto;
    position: absolute;
    right: 6%;
    bottom: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    * {
      color: white;
      padding-left: 20px;
      padding-right: 20px;
      margin-top: 10px;
      /* border-radius: 50px; */
    }
    .logo {
      font-size: 70px;
      background: red;
    }
    p {
      font-size: 30px;
      /* background: gray; */
    }

    h1 {
      font-size: 100px;
      line-height: 90px;
      text-align: center;
      background: deepskyblue;
    }
  }
`
