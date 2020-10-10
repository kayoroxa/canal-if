
const texto = "can't: eram / estavam, you: você, following: seguindo, me: mim, today: hoje"
console.log(texto.match(/[a-zA-Z'’]+(?=:)/gi))