import styled from 'styled-components';

export const ContainerConfigPage = styled.div`
   width: 100vw;
   height: 100vh;
   position: relative;
   display: flex; flex-direction: column; align-items: center; justify-content: center;

   header {
      width: 80%;
      height: 5%;
      /* background: pink; */
      margin-top: 4%;
      text-align: right;
   }
   .not-header {
      width: 95%;
      flex: 1;
      display: flex; flex-direction: row; align-items: center; justify-content: space-between;
      margin-top: 1.5%; margin-bottom: 1.5%;
      /* background: skyblue; */
      .main {
         width: 85%;
         height: 100%;
         display: flex; flex-direction: column; align-items: space;
         .title {text-transform: uppercase; font-size: 2.5vh}
         .line-box {
            flex:1;
            width: 100%;
            margin-top: 0.5%;
            margin-bottom: 1.5%;
            background: gray;
            display: flex; flex-direction: row; align-items: center;
            border-radius: 10px;
            
            .content {
               flex: 1;
               height: 85%;
               margin: 10px;
               /* background: pink; */
               display: flex; flex-direction: row; align-items: center;
               input {outline: none; background: none; color: white; ::placeholder {color: white;}}

               h1 {cursor: pointer;}
            }
            svg {
               margin-right: 10px;
            }
         }
      }
   }
`;