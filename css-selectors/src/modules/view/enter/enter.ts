import "./enter.scss";
import Element from "../../node";

export default class Enter {
  createElement;
  constructor() {
    this.createElement = this.elementView();
    this.event();
  }

  elementView() {
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

  event() {
    this.getHtmlEl().addEventListener("click", this.buttonElement.bind(this));
  }

  buttonElement(event: Event) {
    if (event.target) {
      const button: HTMLButtonElement | null =
        document.querySelector(".button");
      if (button) {
        button.classList.toggle("button--click");
      }
    }
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
