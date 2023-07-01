import "./popup.scss";
import Element from "../../node";

export default class Popup {
  createElement;
  constructor() {
    this.createElement = this.elementView();
    this.event();
  }

  elementView() {
    const popupWrapper = {
      tagName: "div",
      classNames: ["popup-wrapper"],
      textContent: "",
    };
    const createWrapper = new Element(popupWrapper);
    const popupInner = {
      tagName: "div",
      classNames: ["popup-inner"],
      textContent: "",
      parentNode: createWrapper.getNode(),
    };
    const createInner = new Element(popupInner);
    const popupWrapperWindow = {
      tagName: "div",
      classNames: ["popup"],
      textContent: "Congratulate! You had passed all levels!",
      parentNode: createInner.getNode(),
    };
    new Element(popupWrapperWindow);
    return createWrapper;
  }

  event() {
    document.addEventListener("click", this.closePopup.bind(this));
  }

  closePopup() {
    document?.querySelector(".popup-wrapper")?.remove();
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
