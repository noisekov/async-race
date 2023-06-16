import Header from "./view/header/header";
import Footer from "./view/footer/footer";
import Main from "./view/main/main";
import Aside from "./view/aside/aside";

export default class App {
  constructor() {
    this.init();
  }

  init() {
    const header = new Header();
    const main = new Main();
    const footer = new Footer();
    const aside = new Aside();
    const wrap = document.createElement("div");
    wrap.classList.add("wrapper");

    document.body.append(wrap);
    document.body.append(aside.getHtmlElement());
    document.body.classList.add("container");
    if (header.getHtmlElement() && main.getHtmlElement()) {
      wrap.append(header.getHtmlElement(), main.getHtmlElement());
    }
    if (footer.getHtmlElement()) {
      wrap.append(footer.getHtmlElement());
    }
  }
}
