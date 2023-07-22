import { MAIN_URL } from "./server";
import { getCars, removeCar, startCar, stopCar, selectCar } from "./server";

export const generateCarsBtn = () => {
  const generateBtn: HTMLButtonElement | null = document.querySelector(
    ".block-btn__generate"
  );

  generateBtn?.addEventListener("click", async () => {
    generateBtn.disabled = true;
    await generateCars();
    await getCars();
    await removeCar();
    await startCar();
    await stopCar();
    selectCar();
    generateBtn.disabled = false;
  });
};

const generateCars = async () => {
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
    await fetch(MAIN_URL + "/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
  }
};

const brandsCars: Array<string> = [
  "Audi",
  "Alfa Romeo",
  "Alpina",
  "Aston Martin",
  "Axon",
  "Ford",
  "Ferrari",
  "Fiat",
  "GAZ",
  "GMC",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "JAC",
  "Jaguar",
  "Jeep",
  "Kamaz",
  "Lada",
  "Lexus",
  "Lotus",
  "MAN",
  "Maybach",
  "MAZ",
  "Mazda",
  "McLaren",
  "Nissan",
  "Opel",
  "Paccar",
  "Pagani",
  "Pontiac",
  "Porsche",
  "Renault",
  "Å koda",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "UAZ",
  "Volvo",
  "ZAZ",
  "XPeng",
  "TVR",
  "Saab",
  "RAM",
  "Chevrolet",
  "Mazzanti",
  "Daewoo",
];

const modelsCars: Array<string> = [
  "Roadster",
  "S",
  "X",
  "3",
  "Y",
  "Cybertruck",
  "X5",
  "X7",
  "X3",
  "X6",
  "GT4",
  "FXX",
  "599 GTO",
  "Enzo",
  "458 Italia",
  "250 GTO",
  "Priora",
  "4x4",
  "Rio",
  "Focus",
  "Kalina",
  "Vesta",
  "Spark",
  "Lacetti",
  "Nexia",
  "Matiz",
  "Cobalt",
  "Captiva",
  "A7",
  "A5",
  "A3",
  "A8",
  "TT",
  "Corolla",
  "Camry",
  "RAV4",
  "Impreza",
  "WRX",
  "ES",
  "LS",
  "RX",
  "GX",
  "LX",
  "GS",
  "LC500",
  "Gallardo",
  "Aventador",
  "911",
  "Cayenne",
  "FX37",
];
