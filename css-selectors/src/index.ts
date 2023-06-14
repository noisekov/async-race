import "./index.scss";

const a = document.querySelector("body");
const b = document.createElement("h1");
b.innerText = "Hello";
a?.append(b);
