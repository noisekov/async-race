import { MAIN_URL, driveOrBroken, animationFn } from "./server-garage";

export const raceAllCar = () => {
  const raceBtn = document.querySelector(".block-btn__race");

  raceBtn?.addEventListener("click", raceStart);
};

const raceStart = () => {
  const findCar: NodeListOf<HTMLDivElement> = document.querySelectorAll(".car");
  findCar.forEach(async (car) => {
    const response = await fetch(
      MAIN_URL + `/engine?id=${car.id}&status=started`,
      {
        method: "PATCH",
      }
    );
    const raceBtn: HTMLButtonElement | null =
      document.querySelector(".block-btn__race");
    const resetBtn: HTMLButtonElement | null =
      document.querySelector(".block-btn__reset");
    if (raceBtn) raceBtn.disabled = true;
    if (resetBtn) resetBtn.disabled = false;
    const inputStart: NodeListOf<HTMLButtonElement> | null =
      document.querySelectorAll(".btn-start");
    const inputStop: NodeListOf<HTMLButtonElement> | null =
      document.querySelectorAll(".btn-stop");
    inputStart.forEach((btn) => (btn.disabled = true));
    inputStop.forEach((btn) => (btn.disabled = false));
    const data = await response.json();
    const result = data.distance / data.velocity;
    const raceWidth: HTMLDivElement | null =
      document.querySelector(".car__body-race");
    if (raceWidth) {
      const distance = raceWidth.offsetWidth;
      driveOrBroken(car.id);
      animationFn(result, distance, car.id);
    }
  });
};

export const resetAllCar = () => {
  const resetBtn = document.querySelector(".block-btn__reset");

  resetBtn?.addEventListener("click", raceReset);
};

const raceReset = () => {
  console.log("da");
};
