import Element from "../../node";
import "./input.scss";

export default class Input {
  createElement;
  constructor() {
    this.createElement = this.elementView();
    this.event();
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

  event() {
    this.getHtmlEl().addEventListener("input", this.inputElement.bind(this));
  }

  inputElement(event: Event) {
    if (event.target) {
      const input: HTMLInputElement | null = document.querySelector(".input");
      if (input) {
        console.log(input.value);
      }
    }
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
