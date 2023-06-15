import Element from "../../node";
import "./footer.scss";

export default class Footer {
  createElement;
  constructor() {
    this.createElement = this.createView();
  }

  createView() {
    const footer = {
      tagName: "footer",
      classNames: ["footer"],
      textContent: "Create noisekov",
    };
    const createFooter = new Element(footer);

    return createFooter;
  }
  getHtmlElement(): HTMLElement {
    return this.createElement.getNode();
  }
}
