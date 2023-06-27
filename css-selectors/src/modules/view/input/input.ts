import Element from "../../node";
import "./input.scss";
import allLevel from "../../allLevel";

export default class Input {
  createElement;
  isTrue;
  constructor() {
    this.createElement = this.elementView();
    this.event();
    this.isTrue = false;
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
        if (input.value === allLevel[1].check) {
          this.isTrue = true;
        } else {
          this.isTrue = false;
        }
      }
    }
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
