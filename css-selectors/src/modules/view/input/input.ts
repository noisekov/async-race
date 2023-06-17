import Element from "../../node";
import "./input.scss";

export default class Input {
  createElement;
  constructor() {
    this.createElement = this.elementView();
  }

  elementView() {
    const header = {
      tagName: "input",
      classNames: ["input"],
      textContent: "",
    };
    const createHeader = new Element(header);
    createHeader.setAttribute("type", "text");
    createHeader.setAttribute("placeholder", "Type in a CSS selector");
    return createHeader;
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
