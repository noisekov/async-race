import Element from "../../node";
import "./main.scss";

export default class Main {
  createElement;
  constructor() {
    this.createElement = this.createView();
  }

  createView() {
    const main = {
      tagName: "main",
      classNames: ["main"],
      textContent: "",
    };
    const createNode = new Element(main);
    createNode.addClass("main__desk");
    return createNode;
  }

  getHtmlElement(): HTMLElement {
    return this.createElement.getNode();
  }
}
