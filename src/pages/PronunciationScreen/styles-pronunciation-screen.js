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
            >span {position: relative;}

            ${({indexView}) => selectors(indexView, "span%::after")}{
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
            ${({indexView}) => selectors(indexView, ">span%:nth-child(1), >span%:nth-child(1) *")} {color: red;}

            ${({indexView}) => selectors(indexView, ">span%:nth-child(2), >span%:nth-child(2) *")} {color: var(--blue);}
        }
        ${({indexView}) => selectors(indexView, "> * >span > span%")}{
            position: relative;
            color: white !important;
            opacity: 0.3;
        }

        ${({indexView}) => selectors(indexView, "> * >span > span%::after")} {
            content: "";
            display: block;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            width: 5px;
            height: 110%;
            bottom: 0.0001%;
            background: currentColor;
            opacity: 1;
            transform: rotate(15deg);
        }
    }
`;