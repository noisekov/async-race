import "./enter.scss";
import Element from "../../node";

export default class Enter {
  createElement;
  constructor() {
    this.createElement = this.elementView();
  }

  private elementView() {
    const button = {
      tagName: "button",
      classNames: ["button"],
      textContent: "enter",
    };
    const createButton = new Element(button);
    createButton.setAttribute("type", "button");
    createButton.setAttribute("value", "enter");
    return createButton;
  }

  public getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
