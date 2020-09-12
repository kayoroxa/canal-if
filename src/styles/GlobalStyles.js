import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    html {
        background-color: var(--background);
        overflow-x: hidden;
    }
    * {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-size: 1.3rem;
        color: white;
    }
    :root {
        --background: #111;
        --black: #111;
        --blue: #05A2AC;
    }

    .bold {
        font-family: 'Assistant', sans-serif;
    }

    svg:hover {cursor: pointer; fill: var(--blue)}
`