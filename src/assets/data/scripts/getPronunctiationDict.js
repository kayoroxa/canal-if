import { dictWords } from '../dictWords'

const rules = {
  ing: 'in',
  it: 'êt',
  gi: 'ji',
  gy: 'jy',
  igh: 'ai',
}

const applyRules = word => {
  for (let ruleIdentify of Object.keys(rules)) {
    if (word.includes(ruleIdentify)) {
      return word.replace(
        ruleIdentify,
        '[' + ruleIdentify + '´' + rules[ruleIdentify] + '`]'
      )
    }
  }
  return word
}

// console.log(applyRules('hegi'))

const getPronunciationDict = frase => {
  const allWords = frase.toLowerCase().match(/[a-zA-Z][’'a-zA-Z]*/gi)
  return allWords
    .map(word => {
      if (dictWords[word]) {
        if (dictWords[word].pronunciation !== '' && !undefined) {
          return dictWords[word].pronunciation
        } else return applyRules(word)
      } else return applyRules(word)
    })
    .join(' ')
}
export default getPronunciationDict
