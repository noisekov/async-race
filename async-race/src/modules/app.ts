import Header from "./view/header/header.html";
import Main from "./view/main/main.html";
import { mainContent } from "./view/main/main";
import { changeState } from "./view/header/header";

export default class App {
  public start(): void {
    document.body.insertAdjacentHTML("afterbegin", Header);
    document.body.insertAdjacentHTML("beforeend", Main);
    mainContent();
    changeState();
  }
}
