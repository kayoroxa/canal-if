import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;

    > .logo-exemple {
        width: 100%;
        display: flex;
        position: fixed;
        top: 5%;
        justify-content: center;
        /* background: green; */
        z-index: 2;
        > p {
            font-size: 150%;
            background: var(--blue); padding: 10px 25px;
        }
    }
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
    width: 50%;
    height: 60%;
    position: relative;

    .logo {
        position: absolute;
        font-size: 30px;
        opacity: 0.2;
        right: 30px;
        bottom: 20px;
        -webkit-text-stroke-width: 1px; 
        -webkit-text-stroke-color: black; 
    }
`;

export const Button = styled.div`
    /* background-color: red; */
    width: 90%;
    height: 30%;
`;

