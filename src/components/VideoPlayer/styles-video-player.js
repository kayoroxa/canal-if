import styled from 'styled-components';

export const Container = styled.div`
    border: 6px solid var(--background);
    color: white;
    
    width: 100%;
    height: 100%;
    border-radius: 40px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;

    video {
        /* min-width: 100%; */
        min-height: 100%;
        border-radius: 50px;
    }
`;