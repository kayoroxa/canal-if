export let recordChair = 0

export const quebraDeLinha = (fraseCompleta) => {
    // console.log("EXECUTOU DNVVV")
    recordChair = 0
    // console.log(recordChair)
    const fraseCompletaSplit = fraseCompleta.split(' ')

    let saida = [[]]
    let caracteresEmLinha = 0
    let lengthPermitido =  fraseCompleta.length > 60 ? 30 : 15

    for (const [index, word] of fraseCompletaSplit.entries()) {
        if (caracteresEmLinha < lengthPermitido) {
            //adicionar word na linha
            saida.slice(-1)[0].push(word)
            caracteresEmLinha += word.length +1
            if (caracteresEmLinha > recordChair) recordChair = caracteresEmLinha -1
            // console.log("record inside 1", recordChair)
        }
        else {
            //juntar palavras do anterior
            const backup = saida.slice(-1)[0].join(" ")
            saida.pop()
            saida.push(backup)

            //new linha 
            saida.push([])
            caracteresEmLinha = 0

            //adicionar word na linha
            saida.slice(-1)[0].push(word)
            caracteresEmLinha += word.length +1
            if (caracteresEmLinha > recordChair) {
                recordChair = caracteresEmLinha -1
                // console.log("record inside", recordChair)
            }
        }

    }

    //juntar palavras do anterior
    const backup = saida.slice(-1)[0].join(" ")
    saida.pop()
    saida.push(backup)

    // console.log(saida.slice(-1)[0].split(' ').length)
    if (saida.slice(-1)[0].split(' ').length < 2) {
        const backupLast = saida.slice(-1)[0]
        const backupLast2 = saida.slice(-2, -1)[0]
        const nova = backupLast2 +' '+ backupLast
        saida.pop()
        saida.pop()
        saida.push(nova)
        if (nova.length > recordChair) recordChair = nova.length -1
        // console.log("record fora", recordChair)
        
    }
    if (saida.length === 1 && recordChair > 20) {
        recordChair = 0
        const dividido = saida[0].split(' ')
        const quantidadeDePalavras = dividido.length
        const frase1 = (dividido.slice(0, quantidadeDePalavras / 2)).join(' ')
        const frase2 = (dividido.slice(quantidadeDePalavras / 2)).join(' ')
        saida = [frase1, frase2]
        if (frase1.length > recordChair) {
            recordChair = frase1.length
        }
        if (frase2.length > recordChair) {
            recordChair = frase2.length
        }
        console.log(recordChair)
    }
    // console.log("FINAL", recordChair)
    return saida
}