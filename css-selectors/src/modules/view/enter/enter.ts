import "./enter.scss";
import Element from "../../node";

export default class Enter {
  elementView;
  constructor() {
    this.elementView = this.createElement();
  }

  private createElement() {
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
    return this.elementView.getNode();
  }
}
