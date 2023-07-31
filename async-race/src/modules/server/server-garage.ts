import { IDataCar } from "../../type/type";
import { CARS_PER_PAGE } from "../data/global-var";
import { APIService } from "./api-service";

export let pageNow = 1;

export const countCar = async () => {
  const response = await APIService.get("/garage?_limit=1");
  const howMuchCar = response.headers.get("X-Total-Count");
  const countCar = document.querySelector(".garage__all-car");
  if (countCar) countCar.textContent = howMuchCar;
};

export const getCarsOnPage = async (page: number) => {
  const response = await APIService.get(
    `/garage?_page=${page}&_limit=${CARS_PER_PAGE}`
  );
  const data: Promise<IDataCar[]> = await response.json();
  const countPage = document.querySelector(".garage__page");
  if (countPage) countPage.textContent = `${page}`;
  countCar();
  const garageBlock = document.querySelector(".garage-with-car");
  if (garageBlock) garageBlock.innerHTML = "";
  createCar(data);
};

export const createCarImg = (color: string): string => {
  return `<svg class="${color}" xmlns="http://www.w3.org/2000/svg" width="52" height="50" viewBox="0 0 100 100"><g><path d="M74.61 56.44c-5.08 0-9.22 4.13-9.22 9.21s4.14 9.22 9.22 9.22 9.21-4.14 9.21-9.22-4.13-9.21-9.21-9.21zM23.79 56.44c-5.08 0-9.22 4.13-9.22 9.21s4.14 9.22 9.22 9.22S33 70.73 33 65.65s-4.13-9.21-9.21-9.21z" fill="${color}" data-original="#000000" class=""></path><path d="M92 55.37c-1.1 0-2-.9-2-2s.9-2 2-2h5.01v-1.69c0-3.36-2.28-6.26-5.54-7.05-.02-.01-.05-.01-.08-.02a92.775 92.775 0 0 0-15.18-2.86L65 28.55c-1.92-1.92-5.54-3.42-8.24-3.42H32.11c-2.72.04-6.2 1.49-8.13 3.41L12.86 39.68H9c-3.31 0-6 2.69-6 6v3.43h4.94c1.1 0 2 .9 2 2s-.9 2-2 2H3v8.56c0 3.3 2.68 5.98 5.98 5.98h.6c1.1 0 2-.9 2-2 0-6.73 5.48-12.21 12.22-12.21s12.22 5.48 12.22 12.21c0 1.1.9 2 2 2H60.4c1.1 0 2-.9 2-2 0-6.73 5.48-12.21 12.22-12.21 6.73 0 12.21 5.48 12.21 12.21 0 1.1.9 2 2 2h.83c4.06 0 7.36-3.3 7.36-7.36v-4.92zm-43.67-15.7H29.59l4.02-10.54h14.72zm8.36 7.72H54c-1.1 0-2-.9-2-2s.9-2 2-2h2.69c1.1 0 2 .9 2 2s-.9 2-2 2zm-4.36-7.72V29.13h4.43c1.66 0 4.24 1.07 5.42 2.25l8.3 8.29z" fill="${color}" data-original="#000000"></path></g></svg>`;
};

const createLayoutNewCar = (
  color: string,
  name: string,
  id: number
): string => {
  return `<div class="car" id="${id}">
    <div class="car__header">
        <button class="car__header-select">select</button>
        <button class="car__header-remove">remove</button>
        <span class="car__header-name">${name}</span>
    </div>
    <div class="car__body">
        <div class="car__body-btn">
            <button class="btn-start">A</button>
            <button class="btn-stop" disabled>B</button>
        </div>
        <div class="car__body-race">
            <div class="current-car">${createCarImg(color)}</div>
        </div>
    </div>
  </div>`;
};

const createCar = async (data: Promise<IDataCar[]>) => {
  const garageBlock = document.querySelector(".garage-with-car");
  (await data).forEach((elem) => {
    garageBlock?.insertAdjacentHTML(
      "beforeend",
      createLayoutNewCar(elem.color, elem.name, elem.id)
    );
  });
};

export const removeCurrentCar = async () => {
  const removeBtn = document.querySelectorAll(".car__header-remove");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", async (evt: Event) => {
      if (evt.target instanceof Element) {
        const currentId = evt.target.closest(".car")?.getAttribute("id");
        await APIService.delete(`/garage/${currentId}`);
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

export const addCreateBtnListener = () => {
  const btnCreateCar: HTMLInputElement | null = document.querySelector(
    ".input-create__submit"
  );
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
    const response = await APIService.post(bodyData);
    const data = await response.json();
    renderOneCar(data);
    if (inputCreateName) inputCreateName.value = ``;
  });
};

export const renderOneCar = (data: IDataCar) => {
  const garageBlock = document.querySelector(".garage-with-car");
  const countPage = document.querySelector(".garage__page");
  if (countPage) {
    const carBlock = document.querySelectorAll(".car");

    if (carBlock.length < CARS_PER_PAGE) {
      garageBlock?.insertAdjacentHTML(
        "beforeend",
        createLayoutNewCar(data.color, data.name, data.id)
      );
      removeCurrentCar();
      startCurrentCar();
      stopCurrentCar();
      selectCurrentCar();
    }
    countCar();
  }
};

let animateId: number | null = null;

export const startCurrentCar = async () => {
  const inputCreateName: NodeListOf<HTMLButtonElement> | null =
    document.querySelectorAll(".btn-start");

  inputCreateName.forEach((btn) => {
    btn.onclick = async (evt: Event) => {
      if (evt.target instanceof Element) {
        if (evt.target) {
          const targetEl = evt.target;
          const currentId: string | null | undefined = targetEl
            .closest(".car")
            ?.getAttribute("id");
          btn.disabled = true;
          const currentStopBtn: HTMLButtonElement | null | undefined = targetEl
            .closest(".car")
            ?.querySelector(".btn-stop");
          if (currentStopBtn) currentStopBtn.disabled = false;
          const responseStarted = await APIService.patch(currentId, "started");
          const data = await responseStarted.json();
          const result = data.distance / data.velocity;
          const raceWidth: HTMLDivElement | null =
            document.querySelector(".car__body-race");
          if (raceWidth) {
            const distance = raceWidth.offsetWidth;
            checkStatusDriveOrBroken(currentId);
            animationFn(result, distance, currentId);
          }
        }
      }
    };
  });
};

export const stopCurrentCar = async () => {
  const inputCreateName: NodeListOf<HTMLButtonElement> | null =
    document.querySelectorAll(".btn-stop");

  inputCreateName.forEach((btn) => {
    btn.onclick = async (evt: Event) => {
      if (evt.target instanceof Element) {
        if (evt.target) {
          const targetEl = evt.target;
          const currentId: string | null | undefined = targetEl
            .closest(".car")
            ?.getAttribute("id");
          const currentStartBtn: HTMLButtonElement | null | undefined = targetEl
            .closest(".car")
            ?.querySelector(".btn-start");
          await APIService.patch(currentId, "stopped");
          if (currentStartBtn) currentStartBtn.disabled = false;
          btn.disabled = true;
          const findCar = document.getElementById(`${currentId}`);
          if (findCar) {
            const currentCar: HTMLDivElement | null =
              findCar.querySelector(".current-car");
            if (currentCar) currentCar.style.transform = `translateX(0px)`;
          }
          if (animateId) cancelAnimationFrame(animateId);
        }
      }
    };
  });
};

export const animationFn = (
  seconds: number,
  distance: number,
  id?: string | null
) => {
  const imgCarWidth: HTMLDivElement | null =
    document.querySelector(".current-car");
  if (imgCarWidth) {
    let startPosition = imgCarWidth.offsetWidth;
    const framesCount = (seconds / 1000) * 60;
    const dX = (distance - startPosition) / framesCount;

    const tick = () => {
      startPosition += dX;
      const findCar = document.getElementById(`${id}`);

      if (findCar) {
        const currentCar: HTMLDivElement | null =
          findCar.querySelector(".current-car");
        if (id && currentCar) {
          currentCar.style.transform = `translateX(${
            startPosition - currentCar.offsetWidth
          }px)`;
        }
        if (startPosition < distance) {
          animateId = requestAnimationFrame(tick);
        }
      }
    };
    tick();
  }
};

export const checkStatusDriveOrBroken = async (id?: string | null) => {
  const responseDrive = await APIService.patch(id, "drive");
  if (responseDrive.status === 500) {
    if (animateId) {
      cancelAnimationFrame(animateId);
    }
  }
};

export const selectCurrentCar = () => {
  const selectBtn: NodeListOf<HTMLButtonElement> | null =
    document.querySelectorAll(".car__header-select");
  const inputSelectName: HTMLInputElement | null = document.querySelector(
    ".input-update__text"
  );
  const inputSelectColor: HTMLInputElement | null = document.querySelector(
    ".input-update__color"
  );

  selectBtn.forEach((btn) => {
    btn.onclick = (evt: Event) => {
      if (evt.target instanceof Element) {
        if (inputSelectName && inputSelectColor) {
          inputSelectName.value = "";
          const currentId = evt.target.closest(".car")?.getAttribute("id");
          const currentName =
            evt.target.closest(".car")?.children[0].children[2].textContent;
          const currentColor =
            evt.target.closest(".car")?.children[1].children[1].children[0]
              .children[0].classList[0];
          if (inputSelectColor && currentColor && currentName) {
            inputSelectColor.value = currentColor;
            inputSelectName.value = currentName;
          }
          inputSelectName?.focus();
          requestUpdateParamCurrentCar(currentId);
        }
      }
    };
  });
};

const requestUpdateParamCurrentCar = (id?: string | null) => {
  const inputSelectName: HTMLInputElement | null = document.querySelector(
    ".input-update__text"
  );
  const inputSelectColor: HTMLInputElement | null = document.querySelector(
    ".input-update__color"
  );
  const inputSelectSubmit: HTMLInputElement | null = document.querySelector(
    ".input-update__submit"
  );

  if (inputSelectSubmit) {
    inputSelectSubmit.onclick = async () => {
      const bodyData = {
        name: inputSelectName?.value,
        color: inputSelectColor?.value,
      };
      const response = await APIService.put(id, bodyData);
      const data = await response.json();
      updateCurrentCar(data);
    };
  }
};

const updateCurrentCar = (data: IDataCar) => {
  const findId = document.getElementById(`${data.id}`);
  if (findId) {
    const nameCarUpdate = findId.querySelector(".car__header-name");
    const colorCarUpdate = findId.querySelector(".current-car");

    if (nameCarUpdate && colorCarUpdate) {
      nameCarUpdate.textContent = data.name;
      const newColor = createCarImg(data.color);
      colorCarUpdate.innerHTML = newColor;
    }
  }
};

export const addPaginationBtnListener = () => {
  const btnNext: HTMLButtonElement | null = document.querySelector(
    ".pagination-garage__next"
  );
  const btnPrev: HTMLButtonElement | null = document.querySelector(
    ".pagination-garage__prev"
  );

  btnNext?.addEventListener("click", pageRight);
  btnPrev?.addEventListener("click", pageLeft);
};

const pageRight = async () => {
  const btnNext: HTMLButtonElement | null = document.querySelector(
    ".pagination-garage__next"
  );
  const btnPrev: HTMLButtonElement | null = document.querySelector(
    ".pagination-garage__prev"
  );
  const countCar = document.querySelector(".garage__all-car");
  const countPage = document.querySelector(".garage__page");
  if (countCar && countPage && btnPrev) {
    if (+countCar.innerHTML > CARS_PER_PAGE * pageNow) {
      pageNow++;
      await getCarsOnPage(pageNow);
      btnPrev.disabled = false;
      removeCurrentCar();
      startCurrentCar();
      stopCurrentCar();
      selectCurrentCar();
      refreshBtnRaceAndReset();
      if (+countCar.innerHTML < CARS_PER_PAGE * pageNow) {
        if (btnNext) btnNext.disabled = true;
      }
    }
  }
};

const pageLeft = async () => {
  const btnNext: HTMLButtonElement | null = document.querySelector(
    ".pagination-garage__next"
  );
  const btnPrev: HTMLButtonElement | null = document.querySelector(
    ".pagination-garage__prev"
  );
  const countCar = document.querySelector(".garage__all-car");
  const countPage = document.querySelector(".garage__page");
  if (countCar && countPage && btnPrev) {
    if (pageNow > 1) {
      pageNow--;
      await getCarsOnPage(pageNow);
      removeCurrentCar();
      startCurrentCar();
      stopCurrentCar();
      selectCurrentCar();
      refreshBtnRaceAndReset();
      if (pageNow === 1 && btnPrev && btnNext) {
        btnPrev.disabled = true;
        btnNext.disabled = false;
      }
    }
  }
};

const refreshBtnRaceAndReset = () => {
  const raceBtn: HTMLButtonElement | null =
    document.querySelector(".block-btn__race");
  const resetBtn: HTMLButtonElement | null =
    document.querySelector(".block-btn__reset");
  if (raceBtn) raceBtn.disabled = false;
  if (resetBtn) resetBtn.disabled = true;
};
