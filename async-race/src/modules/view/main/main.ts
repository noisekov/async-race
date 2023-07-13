import Garage from "../garage/garage.html";
import Winners from "../winners/winners.html";

const state = {
  garageState: Garage,
  WinnersState: Winners,
};

export const mainContent = () => {
  const content = document.querySelector(".content");
  content?.insertAdjacentHTML("afterbegin", state.garageState);
  content?.insertAdjacentHTML("beforeend", state.WinnersState);
};
