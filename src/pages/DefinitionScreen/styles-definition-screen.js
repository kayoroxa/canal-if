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
        margin-bottom: 1.5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        > * {
            font-size: min(
                8vw,
                ${({quantidadeDeLinhas}) => 16 / quantidadeDeLinhas + "vw"},
                ${({quantidadeDefinition}) => 30 / quantidadeDefinition + "vw"}
            );
        }
    }
    
    .definition {
        /* background: gray; */
        margin-bottom: 2%;
        flex: 1;
        width: 85%;
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        /* flex-wrap: wrap; */
        
        >* {
            /* background: pink; */
            margin-bottom: 1vh;
            margin-top: 1vh;
            /* flex-basis: 60px; */
            /* max-height: 1vh; */

           
           /* font-size: 3vw; */
           font-size: min(2.5vw,  ${({quantidadeDefinition}) => 17 / quantidadeDefinition + "vw"});
        }
        span {
            background: var(--blue);
            padding: 0% 2%;
            font-size: 100%;
        }
    }
`;