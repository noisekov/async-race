import Header from "./view/header/header";
import Footer from "./view/footer/footer";

export default class App {
  constructor() {
    this.init();
  }

  init() {
    const header = new Header();
    const footer = new Footer();
    if (header.getHtmlElement() && footer.getHtmlElement()) {
      document.body.append(header.getHtmlElement(), footer.getHtmlElement());
    }
  }
}
