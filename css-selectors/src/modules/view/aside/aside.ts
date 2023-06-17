import Element from "../../node";
import "./aside.scss";

export default class Aside {
  createElement;
  constructor() {
    this.createElement = this.elementView();
  }

  elementView() {
    const aside = {
      tagName: "aside",
      classNames: ["aside"],
      textContent: "",
    };
    const createAside = new Element(aside);

    return createAside;
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
