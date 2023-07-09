import Element from "../../node";

export default class Level {
  createElement;
  constructor() {
    this.createElement = this.elementView();
  }

  private elementView() {
    const level = {
      tagName: "div",
      classNames: ["aside__level"],
      textContent: "",
    };
    return new Element(level);
  }

  public getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
