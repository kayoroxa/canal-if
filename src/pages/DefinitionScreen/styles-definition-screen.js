import styled from 'styled-components';

export const Container = styled.div`
    /* background: var(--blue); */
    width: 100vw;
    height: 99vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;

    .frase {
        flex: 1;
        /* background: red; */
        text-transform: uppercase;
        margin-top: 2%;
        margin-bottom: 2%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        > * {font-size: 8vw;}
    }
    
    .definition {
        /* background: green; */
        margin-bottom: 2%;
        flex: 1;
        width: 85%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        >* {
           flex: 1;
           font-size: 3vw;
        }
        span {
                background: var(--blue);
                padding: 0% 2%;
                font-size: 100%;
        }
    }
`;