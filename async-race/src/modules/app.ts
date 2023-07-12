import Header from "./view/header/header.html";
import Main from "./view/garage/garage.html";

export default class App {
  public start(): void {
    document.body.insertAdjacentHTML("afterbegin", Header);
    document.body.insertAdjacentHTML("beforeend", Main);
  }
}
