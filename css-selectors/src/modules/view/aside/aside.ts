import Element from "../../node";
import "./aside.scss";

export default class Aside {
  elementView;
  constructor() {
    this.elementView = this.createElement();
  }

  private createElement() {
    const aside = {
      tagName: "aside",
      classNames: ["aside"],
      textContent: "",
    };
    return new Element(aside);
  }

  public getHtmlEl(): HTMLElement {
    return this.elementView.getNode();
  }
}
