import Header from "./view/header/header.html";
import Main from "./view/main/main.html";
import { renderMainContent } from "./view/main/main";
import { addChangePageListener } from "./view/header/header";
import {
  getCarsOnPage,
  removeCurrentCar,
  addCreateBtnListener,
  startCurrentCar,
  selectCurrentCar,
  stopCurrentCar,
  pageNow,
  addPaginationBtnListener,
} from "./server/server-garage";
import { addGenerateCarsListener } from "./server/hundred-cars";
import { addRaceBtnListener, addResetBtnListener } from "./server/server-race";

export default class App {
  public async start() {
    document.body.insertAdjacentHTML("afterbegin", Header);
    document.body.insertAdjacentHTML("beforeend", Main);
    renderMainContent();
    addChangePageListener();
    addGenerateCarsListener();
    await getCarsOnPage(pageNow);
    await removeCurrentCar();
    selectCurrentCar();
    addCreateBtnListener();
    await startCurrentCar();
    await stopCurrentCar();
    addPaginationBtnListener();
    addRaceBtnListener();
    addResetBtnListener();
  }
}
