import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative
`;

export const Main = styled.div`
    width: 100%;
    height: 80%;
    
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;

    /* background-color: blue; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const Top = styled.div`
    width: 40%;
    height: 60%;
`;

export const Button = styled.div`
    /* background-color: red; */
    width: 90%;
    height: 30%;
`;

