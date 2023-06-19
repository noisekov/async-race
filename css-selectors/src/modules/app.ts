import Header from "./view/header/header";
import Footer from "./view/footer/footer";
import Main from "./view/main/main";

export default class App {
  constructor() {
    this.init();
  }

  init() {
    const header = new Header();
    const main = new Main();
    const footer = new Footer();
    const wrap = document.createElement("div");
    wrap.classList.add("wrapper");

    document.body.append(wrap);
    document.body.classList.add("container");
    if (header.getHtmlEl() && main.getHtmlEl()) {
      wrap.append(header.getHtmlEl(), main.getHtmlEl());
    }
    if (footer.getHtmlEl()) {
      wrap.append(footer.getHtmlEl());
    }
  }
}
