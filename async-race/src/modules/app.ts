import Header from "./view/header/header.html";
import Main from "./view/main/main.html";
import { mainContent } from "./view/main/main";
import { changeState } from "./view/header/header";
import {
  getCars,
  removeCar,
  addNewCar,
  startCar,
  selectCar,
  stopCar,
  PAGE_NOW,
  changePage,
} from "./server/server-garage";
import { generateCarsBtn } from "./server/hundred-cars";

export default class App {
  public async start() {
    document.body.insertAdjacentHTML("afterbegin", Header);
    document.body.insertAdjacentHTML("beforeend", Main);
    mainContent();
    changeState();
    generateCarsBtn();
    await getCars(PAGE_NOW);
    await removeCar();
    selectCar();
    addNewCar();
    await startCar();
    await stopCar();
    changePage();
  }
}
