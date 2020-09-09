import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .main {
        /* background: red; */
        width: 85%;
        text-align: center;
        text-transform: uppercase;
        * {font-size: 6vw;}

        > * {
            >span {position: relative;}
            >span::after {
                content: "";
                display: block;
                position: absolute;
                margin: auto;
                left: 0;
                right: 0;
                width: 98%;
                bottom: 6%;
                height: 4px;
                background: currentColor;
            }
            >span:nth-child(1) {color: red;}
            >span:nth-child(2) {color: var(--blue);}
        }
        > * >span > span {
            opacity: 0.3;
        }
    }
`;