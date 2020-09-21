import styled from 'styled-components';

export const ContainerVoiceRecorder = styled.div`
   /* width: 100px; */
   /* height: 50px; */
   position: relative;
   /* overflow: hidden; */
   .main {
      width: 100% !important;
      height: 100%;
      /* background: yellowgreen; */
      /* margin: auto; */
      /* top: 0; left: 0; right: 0; bottom: 0; */
      display: flex; flex-direction: row;
      justify-content: space-between; align-items: center;
      /* * {
         background: blue;
      } */
   }
   > *:not(.main) {
      display: none;
   }
`;