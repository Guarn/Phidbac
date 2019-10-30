import axios from "axios";

let reg = /token=.*;*/g;
let test: string = "";
console.log(reg.test(document.cookie));
console.log(document.cookie);
if (reg.test(document.cookie)) {
    console.log('entré')
    let test = document.cookie.match(reg)![0].substring(6);
    if (test.charAt(test.length - 1) === ";")
        test = test.slice(0, test.length - 1);
    test = test.replace("Bearer%20", "Bearer ");
}
console.log(test);

export default axios.create({
    baseURL: "http://phidbac.fr:4000/",
    headers: { Authorization: test },
    responseType: "json"
});
