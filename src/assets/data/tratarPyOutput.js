import {dadinhos, nomeMovie} from './pyoutiput'

import {getPronuncia} from './scripts/pronunciation2.0'
import {bestWords} from '../../assets/data/bestWords';

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

        // let marcar_bests_words = lista => {
        //     lista = lista.join('**')
        //     for (let ww of bestWords) {
        //         let re = new RegExp("\\b(" + ww + ")\\b", "ig");
        //         lista = lista.replace(re, '<span>$1</span>')
        //     }
        //     return lista.split("**")
        // }
        
        retornar.urlVideos.push(link)
        retornar.pronuncia.push(pronuncia)
        // retornar.mySubtitle = marcar_bests_words(en)
        
        retornar.mySubtitle.push(en)
        retornar.myTranslation.push(pt)
        retornar.exemplo.push(exemplo)

        retornar.videoName = nomeMovie
    }
    return retornar
})()



// (() => {
//     let marcar_bests_words = lista => {
//         lista = lista.join('**')
//         for (let ww of bestWords) {
//             let re = new RegExp("\\b(" + ww + ")\\b", "ig");
//             lista = lista.replace(re, '<span>$1</span>')
//         }
//         return lista.split("**")
//     }
//     dados.mySubtitle = marcar_bests_words(dados.mySubtitle)
// })()