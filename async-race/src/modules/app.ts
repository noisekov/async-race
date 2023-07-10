import Header from "./view/header/header.html";

export default class App {
  public start(): void {
    document.body.insertAdjacentHTML("afterbegin", Header);
  }
}
