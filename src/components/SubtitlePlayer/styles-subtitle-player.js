import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    /* color: black; */
    position: relative;


    > .paiLegenda {
        position: absolute;
        /* background: blue; */
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
    
        p, span {
            font-size: 50px;
        }
    
    }

    > .exemplo .pt *{
        opacity: 0.8;
    }

    > .exemplo .en {
        * {color: orange;}
        span {
            font-weight: bold;
            opacity: 1 !important;
            position: relative;
            /* color: var(--blue); */
            /* ::after {
                opacity: 0.5;
                content : ''; display: block;
                position: absolute;
                background: orange;
                width: calc(100% + 12.25px); height: 2px;
                left: -6.125px; bottom: 5px;
            } */
        }

    }

    > .pt-en {
        .en {
            /* background: green; */
        }
    }

    > .en {
        .en {
            /* background: pink; */
        }
    }

    > .pronunciaAndExemplo {
        .pronuncia {
            /* background: pink; */
        }
        .en {
            /* background: pink; */
        }
        .pt {
            /* background: pink; */
        }
    }

    
`;