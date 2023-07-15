import Header from "./view/header/header.html";
import Main from "./view/main/main.html";
import { mainContent } from "./view/main/main";
import { changeState } from "./view/header/header";
import { getCars, removeCar, addNewCar } from "./server/server";

export default class App {
  public async start() {
    document.body.insertAdjacentHTML("afterbegin", Header);
    document.body.insertAdjacentHTML("beforeend", Main);
    mainContent();
    changeState();
    await getCars();
    await removeCar();
    await addNewCar();
  }
}
