const isVogal = (letra) => {
    const vocais = ['a','e','i','o','u']

    if (vocais.includes(letra)) {
        return true
    }else {
        return false
    }
}
const span = (x)=> {
    const close = "</span>"
    const open = "<span"
    return close+x+open
}

const getPronuncia = (frase) => {
    const subtitle = frase
    const palavrasDeusas = ['it', "can't", 'why', 'your']
    frase = frase.toLowerCase().split(" ")
    const changer = (palavra, index, proximaPalavra) => {
        if (palavra === 'of') {
            // frase[index] = "ov"
            frase[index] = span("ov")
        }
    }
    const ing = (palavra, index, proximaPalavra) => {
        try {
            if (palavra.slice(-3) === "ing") {
                // frase[index] = palavra.slice(0, -3) + "in"
                frase[index] = span(palavra.slice(0, -3) + "in")
            }
        }catch {}
    }
    const ke = (palavra, index, proximaPalavra) => {
        try {
            if (palavra.slice(-2) === "ke" && isVogal(proximaPalavra[0])) {
                // frase[index] = palavra.slice(0, -1) + proximaPalavra
                frase[index] = span(palavra.slice(0, -1) + proximaPalavra)
                frase.splice(index+1, 1) // apagar proxima palavra
            }else {
            }
        }catch {}
    }
    
    const igual = (palavra, index, proximaPalavra) => {
        try {
            
            if (palavra.slice(-1) === proximaPalavra[0] && !isVogal(palavra.slice(-1)) && !isVogal(proximaPalavra[0])) {
                frase[index] = span(palavra + proximaPalavra.slice(1))
                frase.splice(index+1, 1) // apagar proxima palavra
            }
        }catch {}
    }
    const h = (palavra, index, proximaPalavra) => {
        try {
            if (proximaPalavra[0] === 'h' && palavra !== "your") {
                frase[index + 1] = frase[index + 1].slice(1)
            }
        }catch {}
    }
    const tYou = (palavra, index, proximaPalavra) => {
        let ultimaLetraPalavraIsT = palavra.slice(-1) == 't'
        try {
            let primeiraLetraPalavraSegIsYou = proximaPalavra == 'you'
            if (ultimaLetraPalavraIsT && primeiraLetraPalavraSegIsYou) {
                frase[index] = palavra + 'hya'
                frase.splice(index+1, 1) // apagar proxima palavra
            }
        }catch{}
    }
    const tConsoanteOuVogal = (palavra, index, proximaPalavra) => {
        let ultimaLetraPalavraIsT = palavra.slice(-1) == 't'|| palavra.slice(-1) =='d'
        try {
            let primeiraLetraPalavraSegIsVogal = isVogal(proximaPalavra[0])
            if (ultimaLetraPalavraIsT && !palavrasDeusas.includes(palavra)) {
            
                if (!primeiraLetraPalavraSegIsVogal) {
                    if (palavra.slice(-2) === "'t"){
                        frase[index] = palavra.slice(0, -2) + proximaPalavra
                    }
                    else {
                        frase[index] = palavra.slice(0, -1) + proximaPalavra
                    }
                }else {
                    
                    frase[index] = palavra.slice(0, -1) + 'r' + proximaPalavra
                }
                frase.splice(index+1, 1) // apagar proxima palavra
            }
        }catch{}
    }
    const consoanteVogal = (palavra, index, proximaPalavra) => {
        let ultimaLetraPalavraIsVogal = isVogal(palavra.slice(-1)) && palavra.length > 1
        try {
            let primeiraLetraPalavraSegIsVogal = isVogal(proximaPalavra[0])
            if (!ultimaLetraPalavraIsVogal && primeiraLetraPalavraSegIsVogal && !palavrasDeusas.includes(palavra)) {
                frase[index +1] = palavra.slice(-1) + frase[index + 1]
                frase[index] = palavra.slice(0,-1)
                // frase.splice(index+1, 1) // apagar proxima palavra
            }
        }catch {}
    }
    const wordWithLetraMuda = (palavra, index, proximaPalavra) => {
        // try {
            alert("executando")
            if (palavra.splice(-3) === "ere")  {
                alert("true")
                frase[index] = palavra.slice(0,-1) + span(palavra.slice(-1) ,"hidden")
            }else {
                console.log(palavra.splice(-3),"oi")
            }
        // }catch {}
    }
    const patternsFunctions = [
        wordWithLetraMuda,
        changer,
        ing,
        ke,
        igual,
        h,
        tYou,
        tConsoanteOuVogal,
        consoanteVogal,
    ]

    for (let pattern of patternsFunctions) {
        for (const [index, palavra] of frase.entries()) {
            let proximaPalavra = frase[index + 1]
            pattern(palavra, index, proximaPalavra)
        }
    }
    
    let pronuncia = frase.join(" ")
    const splitWords = (str) => str.match(/(\b[a-zA-Z]+\b)/g)
    

    // for (let word of splitWords(pronuncia.toLowerCase())) {
    //     if (!splitWords(subtitle.toLowerCase()).includes(word)) {
    //         let re = new RegExp("\\b(" + word + ")\\b", "ig");
    //         pronuncia = pronuncia.replace(re, '<span>$1</span>')
    //     }
    // }
    
    return pronuncia 
}

// console.log(getPronuncia("that would be a good.. way to get rid of all the PCP we have lying around."))