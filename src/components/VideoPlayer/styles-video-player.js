import styled from 'styled-components';

export const Container = styled.div`
    /* border: red solid 5px; */
    width: 100%;
    height: 100%;
    position: relative;
    /* overflow: hidden; */
    /* display: flex; */
    /* justify-content: center; */
    overflow: hidden;
    border-radius: 50px;

    video {
        /* min-width: 100%; */
        position: absolute;
        background: pink;
        position: absolute;
        margin: auto;
        position: absolute;
        top: 50%; right: 50%;
        transform: translate(50%,-50%);
        min-width: 100%;
        min-height : 100%;

        /* border-radius: 50px; */
    }
`;