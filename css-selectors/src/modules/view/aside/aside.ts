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
    return new Element(aside);
  }

  public getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
