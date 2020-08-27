import {dadinhos} from 'pyoutiput';
import {nomeMovie} from 'pyoutiput';

export const dados = (() => {
    let retornar = {
        urlVideos:[],
        pronuncia:[],
        mySubtitle:[],
        myTranslation:[],
        exemplo:[], 
    }

    for (let x of dadinhos) {
        const link = x[0]
        const en = x[1]
        const pt = x[2]
        const pronuncia = getPronuncia(en)
        const exemplo = x[3]

        retornar.urlVideos.push(link)
        retornar.pronuncia.push(pronuncia)
        retornar.mySubtitle.push(en)
        retornar.myTranslation.push(pt)
        retornar.exemplo.push(exemplo)

        retornar.videoName = nomeMovie
    }
    return retornar
})()