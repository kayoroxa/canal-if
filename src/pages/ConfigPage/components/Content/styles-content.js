import styled from 'styled-components'

export const ContainerContent = styled.div`
  .title {
    text-transform: uppercase;
    font-size: 2.5vh;
    display: flex;
    justify-content: space-between;
  }
  .line-box {
    flex: 1;
    width: 100%;
    margin-top: 0.5%;
    margin-bottom: 1.5%;
    background: gray;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;

    .content {
      flex: 1;
      height: 85%;
      margin: 10px;
      /* background: pink; */
      display: flex;
      flex-direction: row;
      align-items: center;
      input {
        outline: none;
        background: none;
        color: white;
        ::placeholder {
          color: white;
        }
      }

      h1 {
        cursor: pointer;
      }
    }
    svg {
      margin-right: 10px;
    }
  }
`
