const isVogal = (letra) => {
    const vocais = ['a','e','i','o','u']

    if (vocais.includes(letra)) {
        return true
    }else {
        return false
    }
}
const isConsoante = (letra) => {
    const pontos = `',.<>;?!"`
    if (!isVogal(letra) && !pontos.includes(letra)) return true
    else return false
}

const span = (x, className = false) => {
    if (className === null) return "´"+x+"`"//`<span>${x}</span>`
    if (className === "hidden") return `{${x}}`
    if (className === "change") return `[${x}]`
    if (className === false) return `(${x})`
    // const open = `<span order="%"${className ? ' class='+className : ''}>`
    // const close = `</span>`
    // return open+x+close
}

export const getPronuncia = (frase) => {
    const palavrasDeusas = ['it', "can't", 'why', 'your']
    frase = frase.toLowerCase().split(" ")
    function ing (palavra, index, proximaPalavra) {
        try {
            if (palavra.slice(-3) === "ing") {
                frase[index] = palavra.slice(0, -1) + span(palavra.slice(-1), "hidden")
            }
        }catch {}
    }
    function ke (palavra, index, proximaPalavra) {
        try {
            if (palavra.slice(-2) === "ke" && isVogal(proximaPalavra[0])) {
                frase[index] = span(`${palavra.slice(0, -1)}${span(palavra.slice(-1), "hidden")} ${proximaPalavra}`)
                frase.splice(index+1, 1) // apagar proxima palavra
            }
        }catch {}
    }

    function igual (palavra, index, proximaPalavra) {
        try {
            const lastLetra = palavra.slice(-1)
            const firstLetra = proximaPalavra[0]
            if (lastLetra === firstLetra && isConsoante(lastLetra) && isConsoante(firstLetra)) {
                frase[index] = span(`${palavra.slice(0, -1)}${span(lastLetra, "hidden")} ${proximaPalavra}`)
                frase.splice(index+1, 1) // apagar proxima palavra
            }
        }catch {}
    }

    function h (palavra, index, proximaPalavra) {
        // try {
            if (palavra[0] === 'h' ) {
                try {
                    if (proximaPalavra[0] !== "h") {
                        frase[index] = span(palavra[0], "hidden") + frase[index].slice(1)
                    }
                }
                catch {
                    frase[index] = span(palavra[0], "hidden") + frase[index].slice(1)
                }
            }
        // }catch {}
        
    }
    function tYou (palavra, index, proximaPalavra) {
        let ultimaLetraPalavraIsT = palavra.slice(-1) == 't'
        // try {
            let primeiraLetraPalavraSegIsYou = proximaPalavra == 'you'
            if (ultimaLetraPalavraIsT && primeiraLetraPalavraSegIsYou) {
                frase[index] = span(`${palavra} ${proximaPalavra}`)
                frase.splice(index+1, 1) // apagar proxima palavra
            }
        // }catch{}
    }

    function tConsoanteOuVogal (palavra, index, proximaPalavra) {
        let ultimaLetraPalavraIsT = palavra.slice(-1) == 't'|| palavra.slice(-1) =='d'
        try {
            // let primeiraLetraPalavraSegIsVogal = isVogal(proximaPalavra[0])
            if (ultimaLetraPalavraIsT && !palavrasDeusas.includes(palavra)) {
                if (isConsoante(proximaPalavra[0])) {
                    if (palavra.slice(-2) === "'t"){
                        frase[index] = span(`${palavra.slice(0, -2)}${span("'t")} ${proximaPalavra}`)
                        // frase[index] = palavra.slice(0, -2) + proximaPalavra
                        // frase[index] = palavra.slice(0, -2) + proximaPalavra
                    }
                    else {
                        frase[index] = span(`${palavra.slice(0, -1)}${span(palavra.slice(-1), "hidden")} ${proximaPalavra}`)
                        // frase[index] = palavra.slice(0, -1) + proximaPalavra
                    }
                }else {
                    //update
                    if (palavra !== "just" ) {
                        frase[index] = span(`${palavra.slice(0, -1)}${span(palavra.slice(-1)+span('r'), "change")} ${proximaPalavra}`)
                    }
                    else {
                        frase[index] = span(`${palavra} ${proximaPalavra}`)
                    }
                }
                frase.splice(index+1, 1) // apagar proxima palavra
            }
        }catch{}
    }

    function consoanteVogal (palavra, index, proximaPalavra) {
        let ultimaLetraPalavraIsVogal = isConsoante(palavra.slice(-1)) && palavra.length > 1
        try {
            let primeiraLetraPalavraSegIsVogal = isVogal(proximaPalavra[0])
            if (ultimaLetraPalavraIsVogal && primeiraLetraPalavraSegIsVogal && !palavrasDeusas.includes(palavra)) {
                frase[index] = palavra.slice(0,-1)+span(`${palavra.slice(-1)} ${proximaPalavra}`)
                //passar ultima letra pra palavra seguinte
                frase.splice(index+1, 1) // apagar proxima palavra

                // frase[index +1] = palavra.slice(-1) + frase[index + 1]
                // frase[index] = palavra.slice(0,-1)
            }
        }catch {}
    }

    const wordWithLetraMuda = (palavra, index, proximaPalavra) => {
        palavra = palavra.replace(/\s/g, '');
        if(proximaPalavra) proximaPalavra = proximaPalavra.replace(/\s/g, '')
        try {
            if (palavra.slice(-3) === "ere")  {
                frase[index] = palavra.slice(0,-1) + span(palavra.slice(-1) ,"hidden")
            }
        }catch {}
        try {
            if (palavra.slice(-2) === "nd")  {
                frase[index] = span(palavra.slice(0,-1) + span(palavra.slice(-1) ,"hidden") + ' ' + frase[index +1])
                frase.splice(index+1, 1) // apagar proxima palavra
            }
        }catch {}
        try {
            if (palavra.slice(-2) === "as")  {
                if (isVogal(proximaPalavra[0])) {
                    frase[index] = span(palavra.slice(0,-1) + span(palavra.slice(-1) + span("z",null) ,"change")+' '+proximaPalavra)
                    frase.splice(index+1, 1) // apagar proxima palavra
                }else {
                    frase[index] = palavra.slice(0,-1) + span(palavra.slice(-1) + span("z",null) ,"change")
                }
            }
        }catch {}
        try {
            if (palavra.slice(-2) === "ed" && "td".includes(palavra.slice(-3, 4))) {
                //termina em ed, menos ted ou ded
                if (proximaPalavra[0] === 'h') {
                    frase[index] = span(frase[index] + ' ' + span(frase[index +1][0], "hidden") +frase[index +1].slice(1)) 
                    frase.splice(index+1, 1) // apagar proxima palavra
                }
                else {}
            }
            else {}
        } catch {}
        
    }

    const patternsFunctions = [
        wordWithLetraMuda,
        ing,
        ke,
        igual,
        h,
        tYou,
        // tConsoanteOuVogal,
        consoanteVogal,
    ]

    for (let pattern of patternsFunctions) {
        for (const [index, palavra] of frase.entries()) {
            let proximaPalavra = frase[index + 1]
            pattern(palavra, index, proximaPalavra)
        }
    }
    let pronuncia = frase.join(" ")
    
    // const lengthOrder = (pronuncia.match(/%/g) || []).length
    // for (let c = 1; c <= lengthOrder; c++) {
    //     pronuncia = pronuncia.replace("%", c)
    // }
    return pronuncia
}

console.log(getPronuncia("i was a"))