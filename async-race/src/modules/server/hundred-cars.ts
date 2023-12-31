import { pageNow } from "./server-garage";
import {
  getCarsOnPage,
  removeCurrentCar,
  startCurrentCar,
  stopCurrentCar,
  selectCurrentCar,
} from "./server-garage";
import { modelsCars } from "../data/models-cars";
import { brandsCars } from "../data/brands-cars";
import { APIService } from "./api-service";

export const addGenerateCarsListener = () => {
  const generateBtn: HTMLButtonElement | null = document.querySelector(
    ".block-btn__generate"
  );

  generateBtn?.addEventListener("click", async () => {
    generateBtn.disabled = true;
    await generateHundredCars();
    await getCarsOnPage(pageNow);
    await removeCurrentCar();
    await startCurrentCar();
    await stopCurrentCar();
    selectCurrentCar();

    const btnNext: HTMLButtonElement | null = document.querySelector(
      ".pagination-garage__next"
    );
    if (btnNext) btnNext.disabled = false;
    generateBtn.disabled = false;
  });
};

const generateHundredCars = async () => {
  const MIN_RANDOM_VALUE = 0;
  const MAX_RANDOM_VALUE = modelsCars.length - 1;
  const MAX_RANDOM_COLOR = 255;

  for (let i = 1; i <= 100; i++) {
    const randomNumber = Math.floor(
      MIN_RANDOM_VALUE +
        Math.random() * (MAX_RANDOM_VALUE + 1 - MIN_RANDOM_VALUE)
    );
    const randomNumber2 = Math.floor(
      MIN_RANDOM_VALUE +
        Math.random() * (MAX_RANDOM_VALUE + 1 - MIN_RANDOM_VALUE)
    );
    const splitString = `${brandsCars[randomNumber]} ${modelsCars[randomNumber2]}`;

    let colorValue = "#";
    for (let j = 0; j < 3; j++) {
      const randomColor = Math.floor(
        MIN_RANDOM_VALUE +
          Math.random() * (MAX_RANDOM_COLOR + 1 - MIN_RANDOM_VALUE)
      );
      colorValue += randomColor.toString(16).padStart(2, "0");
    }
    const bodyData = {
      name: splitString,
      color: colorValue,
    };
    APIService.post(bodyData);
  }
};
