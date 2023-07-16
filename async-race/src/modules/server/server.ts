import { IdataCar } from "../../type/type";

const MAIN_URL = "http://127.0.0.1:3000";

export const countCar = async () => {
  const response = await fetch(MAIN_URL + "/garage?_limit=1");
  const howMuchCar = response.headers.get("X-Total-Count");
  const countCar = document.querySelector(".garage__all-car");
  if (countCar) countCar.textContent = howMuchCar;
};

export const getCars = async () => {
  const response = await fetch(MAIN_URL + "/garage");
  const data: Promise<IdataCar[]> = await response.json();
  countCar();
  createCar(data);
};

const carImg = (color: string): string => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="50" viewBox="0 0 100 100"><g><path d="M74.61 56.44c-5.08 0-9.22 4.13-9.22 9.21s4.14 9.22 9.22 9.22 9.21-4.14 9.21-9.22-4.13-9.21-9.21-9.21zM23.79 56.44c-5.08 0-9.22 4.13-9.22 9.21s4.14 9.22 9.22 9.22S33 70.73 33 65.65s-4.13-9.21-9.21-9.21z" fill="${color}" data-original="#000000" class=""></path><path d="M92 55.37c-1.1 0-2-.9-2-2s.9-2 2-2h5.01v-1.69c0-3.36-2.28-6.26-5.54-7.05-.02-.01-.05-.01-.08-.02a92.775 92.775 0 0 0-15.18-2.86L65 28.55c-1.92-1.92-5.54-3.42-8.24-3.42H32.11c-2.72.04-6.2 1.49-8.13 3.41L12.86 39.68H9c-3.31 0-6 2.69-6 6v3.43h4.94c1.1 0 2 .9 2 2s-.9 2-2 2H3v8.56c0 3.3 2.68 5.98 5.98 5.98h.6c1.1 0 2-.9 2-2 0-6.73 5.48-12.21 12.22-12.21s12.22 5.48 12.22 12.21c0 1.1.9 2 2 2H60.4c1.1 0 2-.9 2-2 0-6.73 5.48-12.21 12.22-12.21 6.73 0 12.21 5.48 12.21 12.21 0 1.1.9 2 2 2h.83c4.06 0 7.36-3.3 7.36-7.36v-4.92zm-43.67-15.7H29.59l4.02-10.54h14.72zm8.36 7.72H54c-1.1 0-2-.9-2-2s.9-2 2-2h2.69c1.1 0 2 .9 2 2s-.9 2-2 2zm-4.36-7.72V29.13h4.43c1.66 0 4.24 1.07 5.42 2.25l8.3 8.29z" fill="${color}" data-original="#000000"></path></g></svg>`;
};

const viewGarage = (color: string, name: string, id: number): string => {
  return `<div class="car" id="${id}">
    <div class="car__header">
        <button class="car__header-select">select</button>
        <button class="car__header-remove">remove</button>
        <span class="car__header-name">${name}</span>
    </div>
    <div class="car__body">
        <div class="car__body-btn">
            <button class="btn-start" type="button">A</button>
            <button class="btn-stop" type="button">B</button>
        </div>
        <div class="car__body-race">
            <div class="current-car">${carImg(color)}</div>
        </div>
    </div>
  </div>`;
};

const createCar = async (data: Promise<IdataCar[]>) => {
  const garageBlock = document.querySelector(".garage-with-car");
  (await data).forEach((elem) => {
    garageBlock?.insertAdjacentHTML(
      "afterbegin",
      viewGarage(elem.color, elem.name, elem.id)
    );
  });
};

export const removeCar = async () => {
  const removeBtn = document.querySelectorAll(".car__header-remove");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", async (evt: Event) => {
      if (evt.target instanceof Element) {
        const currentId = evt.target.closest(".car")?.getAttribute("id");
        await fetch(MAIN_URL + "/garage" + `/${currentId}`, {
          method: "DELETE",
        });
        const carBlock = document.querySelectorAll(".car");
        carBlock.forEach((car) => {
          if (car.getAttribute("id") === currentId) {
            car.remove();
            countCar();
          }
        });
      }
    });
  });
};

export const addNewCar = () => {
  const btnCreateCar = document.querySelector(".input-create__submit");
  const inputCreateColor: HTMLInputElement | null = document.querySelector(
    ".input-create__color"
  );
  const inputCreateName: HTMLInputElement | null = document.querySelector(
    ".input-create__text"
  );

  btnCreateCar?.addEventListener("click", async () => {
    const bodyData = {
      name: inputCreateName?.value,
      color: inputCreateColor?.value,
    };
    const response = await fetch(MAIN_URL + "/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const data = await response.json();
    addOneCar(data);
  });
};

const addOneCar = (data: IdataCar) => {
  const garageBlock = document.querySelector(".garage-with-car");
  garageBlock?.insertAdjacentHTML(
    "afterbegin",
    viewGarage(data.color, data.name, data.id)
  );
  removeCar();
  countCar();
  startCar();
};

export const startCar = async () => {
  const inputCreateName = document.querySelectorAll(".btn-start");

  inputCreateName.forEach((btn) => {
    btn.addEventListener("click", async (evt: Event) => {
      if (evt.target instanceof Element) {
        const currentId = evt.target.closest(".car")?.getAttribute("id");
        const responseStarted = await fetch(
          MAIN_URL + `/engine?id=${currentId}&status=started`,
          {
            method: "PATCH",
          }
        );
        const data = await responseStarted.json();
        const result = data.distance / data.velocity;
        console.log(result, currentId);
      }
    });
  });
};

// const imgCar: HTMLDivElement | null =
//       document.querySelector(".current-car");
//     const raceWidth: HTMLDivElement | null =
//       document.querySelector(".car__body-race");
//     if (raceWidth) {
//       if (imgCar) {
//         imgCar.style.transform = `translateX(${
//           raceWidth.offsetWidth - imgCar.offsetWidth
//         }px)`;
//         imgCar.style.transition = `${result / 1000}s linear`;
//       }
//     }
//     const responseDrive = await fetch(MAIN_URL + "/engine?id=1&status=drive", {
//       method: "PATCH",
//     });
//     if (responseDrive.status === 500) {
//       if (imgCar) console.log(imgCar.style.transform);
//     }
