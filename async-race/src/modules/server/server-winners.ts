import { MAIN_URL } from "./server-garage";
import { IdataWinner, IdataCar, IObjectWinners } from "../../type/type";
import { carImg } from "./server-garage";

let dataWinCar: IObjectWinners<IdataWinner> = {};
let WINNERS_CAR_COUNT = 1;

export const getWinners = async () => {
  const response = await fetch(MAIN_URL + "/winners");
  const data: IdataWinner[] = await response.json();

  WINNERS_CAR_COUNT = 1;
  dataWinCar = data;

  data.forEach((winCar) => {
    getCarsForWinner(winCar.id);
  });
  countWinners();
};

const getCarsForWinner = async (id: number) => {
  const response = await fetch(MAIN_URL + "/garage");
  const data: Promise<IdataCar[]> = await response.json();
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

const createWinnersView = (obj: IdataWinner): string => {
  return `<tr>
      <td>${WINNERS_CAR_COUNT++}</td>
      <td>${carImg(obj.color)}</td>
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
  const response = await fetch(MAIN_URL + "/winners?_limit=1");
  const howMuchCar = response.headers.get("X-Total-Count");
  const headerHowWinners = document.querySelector(".winners__all-car");
  if (headerHowWinners) headerHowWinners.textContent = howMuchCar;

  const headerWhatPage = document.querySelector(".winners__page");
  if (headerWhatPage) headerWhatPage.textContent = "1";
};