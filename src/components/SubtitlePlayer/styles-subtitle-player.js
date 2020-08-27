import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    color: black;
    position: relative;


    > .paiLegenda {
        position: absolute;
        background: blue;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    
        p {
            font-size: 130%;
            font-weight: 500;
        }
    
    }

    > .pt-en {
        .en {
            background: green;
        }
    }

    > .en {
        .en {
            background: pink;
        }
    }

    > .pronunciaAndExemplo {
        .pronuncia {
            background: pink;
        }
        .en {
            background: pink;
        }
        .pt {
            background: pink;
        }
    }

    
`;