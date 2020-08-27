import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    html {
        background-color: var(--background)
    }
    * {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        font-size: 1.3rem;
    }
    :root {
        --background: #111;
    }
`