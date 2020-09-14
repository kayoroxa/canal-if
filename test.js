const definitionString = "kombi : homem / cara, i like you : eu gosto de você, what's / what is : qual é, your name : seu nom"
let definition = {}
for (let filho of definitionString.split(",")) {
    filho = filho.split(":")
    definition[filho[0].trim()] = filho[1].trim()
}
console.log(definition)