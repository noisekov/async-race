import Element from "../../node";
import "./header.scss";

export default class Header {
  createElement;
  constructor() {
    this.createElement = this.elementView();
  }

  elementView() {
    const header = {
      tagName: "header",
      classNames: ["header"],
      textContent: "",
    };
    const createHeader = new Element(header);

    const headerWrapper = {
      tagName: "div",
      classNames: ["header-wrapper"],
      textContent: "",
      parentNode: createHeader.getNode(),
    };
    const headerWrap = new Element(headerWrapper);
    const headerName = {
      tagName: "h1",
      classNames: ["header__name"],
      textContent: "CSS Diner",
      parentNode: headerWrap.getNode(),
    };
    const headerLink = {
      tagName: "a",
      classNames: ["header__link"],
      textContent: "tg",
      parentNode: headerWrap.getNode(),
    };
    new Element(headerName);
    const headerLinkEl = new Element(headerLink);
    headerLinkEl.setAttribute("href", "https://t.me/noisekov");
    return createHeader;
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
