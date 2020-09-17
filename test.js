// "i missed <span order='1' class=hidden>h</span>i<span order='2'>m a</span> <span order='3'>lo<span order='4' class=hidden>t</span> today.</span>"

let innerEasy = "i missed <h>i(m a) (lo<t> today.)"




// // innerEasy = innerEasy.replaceAll("<", "<span order='$' class=hidden>")
// // innerEasy = innerEasy.replaceAll(">", "</span>")
// let re = new RegExp("[<]((?!.*span).*)[>]", "ig");
// innerEasy = innerEasy.replace(re, "<span order='$' class=hidden>$1</span>")

// // innerEasy = innerEasy.replaceAll("(", "<span order='$'")
// // innerEasy = innerEasy.replaceAll(")", "</span>")
// re = new RegExp("[(]((?!.*span).*)[)]", "ig");
// innerEasy = innerEasy.replace(re, "<span order='$'>$1</span>")

// // innerEasy = innerEasy.replaceAll("[", "<span order='$' class=change>")
// // innerEasy = innerEasy.replaceAll("]", "</span>")
// re = new RegExp("[[]((?!.*span).*)[]]", "ig");
// innerEasy = innerEasy.replace(re, "<span order='$' class=change>$1</span>")

// innerEasy = innerEasy.replaceAll("/", "<span>")
// innerEasy = innerEasy.replaceAll("\", "</span>")
// // re = new RegExp("[{]((?!.*span).*)[}]", "ig");
// // innerEasy = innerEasy.replace(re, "<span>$1</span>")



console.log(innerEasy)