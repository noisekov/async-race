import { getWinners } from "../../server/generate-winners";

export const changeState = () => {
  const navigationBtn = document.querySelectorAll(".nav__btn");

  navigationBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const wrapper = document.querySelectorAll(".wrapper");

      if (btn.textContent === "garage") {
        wrapper.forEach((block) => block.classList.remove("wrapper--active"));
        wrapper[0].classList.add("wrapper--active");
      }

      if (btn.textContent === "winners") {
        wrapper.forEach((block) => block.classList.remove("wrapper--active"));
        wrapper[1].classList.add("wrapper--active");
        const tableBody = document.querySelector(".winners-cars");
        if (tableBody) {
          tableBody.innerHTML = "";
        }
        getWinners();
      }
    });
  });
};
