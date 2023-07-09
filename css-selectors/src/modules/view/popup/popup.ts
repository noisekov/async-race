import "./popup.scss";
import Element from "../../node";

export default class Popup {
  createElement;
  constructor() {
    this.createElement = this.elementView();
    this.addEvent();
  }

  private elementView() {
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
      textContent: "Congratulate! You had passed all the levels!",
      parentNode: createInner.getNode(),
    };
    new Element(popupWrapperWindow);
    return createWrapper;
  }

  private addEvent() {
    document.addEventListener("click", this.closePopup.bind(this));
  }

  private closePopup() {
    document?.querySelector(".popup-wrapper")?.remove();
  }

  public getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
