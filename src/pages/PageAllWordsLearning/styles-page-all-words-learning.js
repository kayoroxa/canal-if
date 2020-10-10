import styled from 'styled-components';

export const ContainerPageAllWordsLearning = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex; flex-direction: column; justify-content: center; align-items: center;

   h1 {margin-bottom: 2%; font-size: 50px;}

   .folha {
      background : white;
      width: 55%;
      display: flex; justify-content: center; align-items: center;
      padding: 20px;
      box-sizing: content-box;
      border-radius: 20px;
   }
   .delimitar {
      /* background: pink; */
      width: 97%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      * {
         background: lightblue;
         border-radius: 10px;
         color: black;
         padding: 0 10px;
         /* color: black; */
         margin: 10px 11px;
         font-size: 40px;
      }
   }

`;