import { IDataWinner, IDataCar, IObjectWinners } from "../../type/type";
import { createCarImg } from "./server-garage";
import { APIService } from "./api-service";

let dataWinCar: IObjectWinners<IDataWinner> = {};
let winnersCount = 1;

export const getWinners = async () => {
  const response = await APIService.get("/winners");
  const data: IDataWinner[] = await response.json();

  winnersCount = 1;
  dataWinCar = data;

  data.forEach((winCar) => {
    getCarsForWinner(winCar.id);
  });
  countWinners();
};

const getCarsForWinner = async (id: number) => {
  const response = await APIService.get("/garage");
  const data: Promise<IDataCar[]> = await response.json();
  (await data).filter((carWin) => {
    if (carWin.id === id) {
      for (const prop in dataWinCar) {
        if (dataWinCar[prop].id == carWin.id) {
          dataWinCar[prop].name = carWin.name;
          dataWinCar[prop].color = carWin.color;
          renderWinnerPage(createWinnersView(dataWinCar[prop]));
        }
      }
    }
  });
};

const createWinnersView = (obj: IDataWinner): string => {
  return `<tr>
      <td>${winnersCount++}</td>
      <td>${createCarImg(obj.color)}</td>
      <td>${obj.name}</td>
      <td>${obj.wins}</td>
      <td>${obj.time}</td>
    </tr>`;
};

const renderWinnerPage = (viewHtml: string) => {
  const tableBody = document.querySelector(".winners-cars");
  if (tableBody) {
    tableBody.insertAdjacentHTML("beforeend", viewHtml);
  }
};

const countWinners = async () => {
  const response = await APIService.get("/winners?_limit=1");
  const howMuchCar = response.headers.get("X-Total-Count");
  const headerHowWinners = document.querySelector(".winners__all-car");
  if (headerHowWinners) headerHowWinners.textContent = howMuchCar;

  const headerWhatPage = document.querySelector(".winners__page");
  if (headerWhatPage) headerWhatPage.textContent = "1";
};
