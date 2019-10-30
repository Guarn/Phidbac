import axios from "axios";

let reg = /token=.*;*/g;
let test1: string = "";
console.log(reg.test(document.cookie));
console.log(document.cookie);
if (reg.test(document.cookie)) {
    console.log("entré");
    test1 = document.cookie.match(reg)![0].substring(6);
    if (test1.charAt(test1.length - 1) === ";")
        test1 = test1.slice(0, test1.length - 1);
    test1 = test1.replace("Bearer%20", "Bearer ");
}
console.log(test1);

export default axios.create({
    baseURL: "http://phidbac.fr:4000/",
    headers: { Authorization: test1 },
    responseType: "json"
});
