import styled from 'styled-components';

const selectors = (n, string) => {
    let selectors = ""
    if (n !== 0) {
        for (let c = 1; c <= n; c++) {
            selectors +=  c < n ?  string.replaceAll("%", `[order="${c}"]`)+"," : string.replaceAll("%", `[order="${c}"]`)
        }
    }
    else selectors = string.replaceAll("%", `[order="0"]`)
    
    return selectors
}

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
            >span {position: relative; line-height: 200%;}

            ${({indexView}) => selectors(indexView, "span.change > span")} {
                /* CHANGE inicializar*/
                position: absolute;
                top: -50%;
                left: 0; right: 0; margin: auto;
                opacity: 0;
                font-size: 4vw;
                line-height: 100%;
            }${({indexView}) => selectors(indexView, "span.change% > span")} {/*change */opacity: 1;}
            

            ${({indexView}) => selectors(indexView, "span:not(.hidden):not(.change)%::after")}{
                /* juntar */
                content: "";
                display: block;
                position: absolute;
                margin: auto;
                left: 0;
                right: 0;
                width: 100%;
                height: 100%;
                bottom: 6%;
                background: var(--blue);
                z-index: -1;
            }
            /* ${({indexView}) => selectors(indexView, ">span%:nth-child(1), >span%:nth-child(1):not(.hidden) *")} {color: red;} */

            /* ${({indexView}) => selectors(indexView, ">span%:nth-child(2), >span%:nth-child(2):not(.hidden) *")} {color: var(--blue);} */
        }


        ${({indexView}) => selectors(indexView, ".hidden%, .change%")}{
            /* ocultar */
            position: relative;
            color: gray !important;
        }
        ${({indexView}) => selectors(indexView, ".hidden%::after, .change%::after")} {
            /* ocultar after */
            content: "";
            display: block;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            width: 8px;
            height: 110%;
            bottom: 0.0001%;
            background: currentColor;
            opacity: 1;
            transform: rotate(20deg);
        }
    }
`;