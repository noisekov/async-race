import Element from "../../node";
import "./aside.scss";

export default class Aside {
  createElement;
  constructor() {
    this.createElement = this.createView();
  }

  createView() {
    const aside = {
      tagName: "aside",
      classNames: ["aside"],
      textContent: "",
    };
    const createAside = new Element(aside);

    return createAside;
  }

  getHtmlElement(): HTMLElement {
    return this.createElement.getNode();
  }
}
