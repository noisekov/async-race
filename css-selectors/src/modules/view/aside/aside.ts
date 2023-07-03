import Element from "../../node";
import "./aside.scss";

export default class Aside {
  createElement;
  constructor() {
    this.createElement = this.elementView();
  }

  private elementView() {
    const aside = {
      tagName: "aside",
      classNames: ["aside"],
      textContent: "",
    };
    const createAside = new Element(aside);

    return createAside;
  }

  public getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
