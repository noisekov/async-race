import Element from "../../node";
import "./footer.scss";

export default class Footer {
  createElement;
  constructor() {
    this.createElement = this.elementView();
  }

  private elementView() {
    const footer = {
      tagName: "footer",
      classNames: ["footer"],
      textContent: "Made by noisekov",
    };
    const createFooter = new Element(footer);

    return createFooter;
  }
  public getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
