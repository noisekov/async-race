import Element from "../../node";
import "./footer.scss";

export default class Footer {
  elementView;
  constructor() {
    this.elementView = this.createElement();
  }

  private createElement() {
    const footer = {
      tagName: "footer",
      classNames: ["footer"],
      textContent: "Made by noisekov",
    };
    return new Element(footer);
  }

  public getHtmlEl(): HTMLElement {
    return this.elementView.getNode();
  }
}
