const teste = [{} , {}]

for (const [index, element] of teste.entries()) {
    element["caio"] = index
}
console.log(teste)