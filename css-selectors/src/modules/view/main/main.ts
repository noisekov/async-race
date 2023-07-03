import Element from "../../node";
import "./main.scss";
import Aside from "../aside/aside";
import allLevel from "../../allLevel";
import { IObserver } from "../../types";
import Popup from "../popup/popup";
import Enter from "../enter/enter";

export default class Main implements IObserver {
  createElement;
  codeEl: HTMLElement | null;
  desk: HTMLElement | null;
  levelNow: number | null;
  isLevelPass: boolean;
  aside: Aside | null;
  levelMax: number;
  enterBtn: HTMLElement | null;
  bthHelp: HTMLElement | null;
  bthReset: HTMLElement | null;
  constructor() {
    this.levelNow = 1;
    this.levelMax = 10;
    this.isLevelPass = false;
    this.enterBtn = null;
    this.bthHelp = null;
    this.bthReset = null;
    this.createElement = this.elementView();
    this.codeEl = null;
    this.desk = null;
    this.event();
    this.enterKeyCheck();
    this.aside = null;
    this.eventBthHelp();
    this.eventBthReset();
  }

  eventBthHelp() {
    const inputCheck = () => {
      const input: HTMLInputElement | null = document.querySelector(".input");
      if (input) {
        const data = this.getCheck();

        const dataLen = data.split("").length;
        let i = 0;
        input.value = "";
        const writeOneLetter = () => {
          if (i < dataLen) {
            input.value += data.charAt(i);
            setTimeout(() => {
              i++;
              input.setAttribute("disabled", "disabled");
              writeOneLetter();
            }, 100);
          }
          input.removeAttribute("disabled");
        };
        writeOneLetter();
        this.isLevelPass = true;
        input.focus();
      }
    };

    this.bthHelp?.addEventListener("click", inputCheck.bind(this));
  }

  eventBthReset() {
    const resetProgress = () => {
      this.levelNow = 1;
      this.changeLevel();
    };
    this.bthReset?.addEventListener("click", resetProgress.bind(this));
  }

  elementView() {
    const main = {
      tagName: "main",
      classNames: ["main"],
      textContent: "",
    };
    const createNode = new Element(main);

    const mainBtnHelp = {
      tagName: "button",
      classNames: ["button-help"],
      textContent: "Help",
      parentNode: createNode.getNode(),
    };
    const btnHelp = new Element(mainBtnHelp);
    this.bthHelp = btnHelp.getNode();

    const mainBtnReset = {
      tagName: "button",
      classNames: ["button-reset"],
      textContent: "Reset",
      parentNode: createNode.getNode(),
    };
    const btnReset = new Element(mainBtnReset);
    this.bthReset = btnReset.getNode();

    const mainDesk = {
      tagName: "div",
      classNames: ["main__desk"],
      textContent: "",
      parentNode: createNode.getNode(),
    };
    this.desk = new Element(mainDesk).getNode();

    const mainEditor = {
      tagName: "div",
      classNames: ["main__editor"],
      textContent: "",
      parentNode: createNode.getNode(),
    };
    const mainEditorEl = new Element(mainEditor);

    const mainEditorCode = {
      tagName: "div",
      classNames: ["main__code"],
      textContent: "",
      parentNode: createNode.getNode(),
    };
    const mainCodeEl = new Element(mainEditorCode);

    const mainCodeHead = {
      tagName: "div",
      classNames: ["code__head"],
      textContent: "",
      parentNode: mainCodeEl.getNode(),
    };
    const mainCodeHeadEl = new Element(mainCodeHead);

    const codeHeadLeft = {
      tagName: "div",
      classNames: ["code__head-name"],
      textContent: "HTML Viewer",
      parentNode: mainCodeHeadEl.getNode(),
    };
    new Element(codeHeadLeft);

    const codeHeadRight = {
      tagName: "div",
      classNames: ["code__head-file"],
      textContent: "table.html",
      parentNode: mainCodeHeadEl.getNode(),
    };
    new Element(codeHeadRight);

    const mainCodeBody = {
      tagName: "div",
      classNames: ["code__body"],
      textContent: "",
      parentNode: mainCodeEl.getNode(),
    };
    const mainCodeBodyBlock = new Element(mainCodeBody);

    const mainCodeBodyLine = {
      tagName: "div",
      classNames: ["code__body-line"],
      textContent: "asdasd",
      parentNode: mainCodeBodyBlock.getNode(),
    };
    const mainCodeBodyLineBlock = new Element(mainCodeBodyLine);
    mainCodeBodyLineBlock.getNode().innerHTML = `1 <br> 2 <br> 3 <br> 4 <br> 5 <br> 6 <br> 7 <br> 8 <br> 9 <br> 10 <br> 11 <br> 12 <br> 13 <br> 14 <br> 15 <br> 16 <br> 17 <br> 18 <br> 19 <br> 20`;

    const mainCodeBodyEditor = {
      tagName: "div",
      classNames: ["code__body-editor"],
      textContent: "",
      parentNode: mainCodeBodyBlock.getNode(),
    };
    const mainCodeBodyEditorBlock = new Element(mainCodeBodyEditor);
    this.codeEl = mainCodeBodyEditorBlock.getNode();

    const mainEditorHead = {
      tagName: "div",
      classNames: ["editor__head"],
      textContent: "",
      parentNode: mainEditorEl.getNode(),
    };
    const headEditor = new Element(mainEditorHead);

    const editorHeadLeft = {
      tagName: "div",
      classNames: ["editor__head-name"],
      textContent: "CSS Editor",
      parentNode: headEditor.getNode(),
    };
    new Element(editorHeadLeft);

    const editorHeadRight = {
      tagName: "div",
      classNames: ["editor__head-file"],
      textContent: "style.css",
      parentNode: headEditor.getNode(),
    };
    new Element(editorHeadRight);

    const mainEditorBody = {
      tagName: "div",
      classNames: ["editor__body"],
      textContent: "",
      parentNode: mainEditorEl.getNode(),
    };
    const editorBody = new Element(mainEditorBody);
    this.enterBtn = new Enter().getHtmlEl();
    editorBody.append(this.enterBtn);
    this.clickEnterBtn();

    const mainEditorBodyLine = {
      tagName: "div",
      classNames: ["editor__body-line"],
      textContent: "",
      parentNode: editorBody.getNode(),
    };
    new Element(
      mainEditorBodyLine
    ).getNode().innerHTML = `1 <br> 2 <br> 3 <br> 4 <br> 5 <br> 6 <br> 7 <br> 8 <br> 9 <br> 10 <br> 11 <br> 12 <br> 13 <br> 14 <br> 15 <br> 16 <br> 17 <br> 18 <br> 19 <br> 20`;
    const mainEditorBodyText = {
      tagName: "div",
      classNames: ["editor__body-text"],
      textContent: "",
      parentNode: editorBody.getNode(),
    };
    new Element(mainEditorBodyText).getNode().innerHTML = `
      {<br>
      /* Styles would go here. */<br>
      }
    `;
    this.aside = new Aside();
    this.chooseLevel();
    return createNode;
  }

  enterKeyCheck() {
    const checkEnter = (evt: KeyboardEvent) => {
      if (evt.key === "Enter") {
        if (this.isLevelPass) {
          if (this.levelNow) {
            if (this.levelNow <= this.levelMax) {
              this.levelNow += 1;
            } else {
              this.levelNow = null;
            }
          }
          this.isLevelPass = false;
          const rightElements: NodeListOf<HTMLElement> | null =
            document.querySelectorAll(".right");
          rightElements.forEach((rightEl) => {
            rightEl.classList.add("right-answer");
          });
          const input: HTMLInputElement | null =
            document.querySelector(".input");
          if (input) {
            input.value = "";
          }
          setTimeout(() => {
            this.changeLevel();
          }, 500);
        } else {
          const mainEditor: HTMLDivElement | null =
            document.querySelector(".main__editor");
          const mainCode: HTMLDivElement | null =
            document.querySelector(".main__code");
          if (mainEditor && mainCode) {
            mainEditor.classList.add("false-answer");
            mainCode.classList.add("false-answer");
            setTimeout(() => {
              mainEditor.classList.remove("false-answer");
              mainCode.classList.remove("false-answer");
            }, 500);
          }
        }
      }
    };
    document.addEventListener("keypress", checkEnter.bind(this));
  }

  event() {
    const mouseChoose = (evt: Event) => {
      if (evt.target) {
        [...(evt.target as HTMLElement).classList].filter((x) => {
          const whatTag = document.querySelector(".main__desk");
          const codeBody = document.querySelector(".desk__elements");
          if (whatTag && codeBody) {
            Array.from(whatTag.children).filter((element) => {
              if (element.childNodes.length > 1) {
                const correctEl = element.children[0];
                if (correctEl.tagName.toLowerCase() === x.toLowerCase()) {
                  correctEl.classList.add("light");
                  (evt.target as HTMLElement)?.classList.add("light");
                } else {
                  if (element.tagName.toLowerCase() === x.toLowerCase()) {
                    element.classList.add("light");
                    (evt.target as HTMLElement)?.classList.add("light");
                  }
                }
                const correctEl2 = element.children[1];
                if (correctEl2) {
                  if (correctEl2.tagName.toLowerCase() === x.toLowerCase()) {
                    correctEl2.classList.add("light");
                    (evt.target as HTMLElement)?.classList.add("light");
                  }
                }
              } else {
                if (element.tagName.toLowerCase() === x.toLowerCase()) {
                  element.classList.add("light");
                  (evt.target as HTMLElement)?.classList.add("light");
                }
              }
            });
            Array.from(codeBody.children).filter((element) => {
              if (element.childNodes.length > 1) {
                const correctEl = element.children[1];
                if (correctEl.classList[0].toLowerCase() === x.toLowerCase()) {
                  correctEl.classList.add("light");
                  (evt.target as HTMLElement)?.classList.add("light");
                }
                if (element.children[2]) {
                  const correctE2 = element.children[2];
                  if (
                    correctE2.classList[0].toLowerCase() === x.toLowerCase()
                  ) {
                    correctE2.classList.add("light");
                    (evt.target as HTMLElement)?.classList.add("light");
                  }
                }
                if (element.classList[0].toLowerCase() === x.toLowerCase()) {
                  element.classList.add("light");
                  (evt.target as HTMLElement)?.classList.add("light");
                }
              } else {
                if (element.classList[0].toLowerCase() === x.toLowerCase()) {
                  element.classList.add("light");
                  (evt.target as HTMLElement)?.classList.add("light");
                }
              }
            });
          }
        });
      }
    };
    const mouseClose = (evt: Event) => {
      if (evt.target) {
        [...(evt.target as HTMLElement).classList].filter((x) => {
          const whatTag = document.querySelector(".main__desk");
          const codeBody = document.querySelector(".desk__elements");
          if (whatTag && codeBody) {
            Array.from(whatTag.children).filter((element) => {
              if (element.childNodes.length > 1) {
                if (
                  element.children[0].tagName.toLowerCase() === x.toLowerCase()
                ) {
                  element.children[0].classList.remove("light");
                  (evt.target as HTMLElement)?.classList.remove("light");
                } else {
                  if (element.tagName.toLowerCase() === x.toLowerCase()) {
                    element.classList.remove("light");
                    (evt.target as HTMLElement)?.classList.remove("light");
                  }
                }
                const correctEl2 = element.children[1];
                if (correctEl2) {
                  if (correctEl2.tagName.toLowerCase() === x.toLowerCase()) {
                    correctEl2.classList.remove("light");
                    (evt.target as HTMLElement)?.classList.remove("light");
                  }
                }
              } else {
                if (element.tagName.toLowerCase() === x.toLowerCase()) {
                  element.classList.remove("light");
                  (evt.target as HTMLElement)?.classList.remove("light");
                }
              }
            });
            Array.from(codeBody.children).filter((element) => {
              if (element.childNodes.length > 1) {
                const correctEl1 = element.children[1];
                if (correctEl1.classList[0].toLowerCase() === x.toLowerCase()) {
                  correctEl1.classList.remove("light");
                  (evt.target as HTMLElement)?.classList.remove("light");
                }
                if (element.children[2]) {
                  const correctE2 = element.children[2];
                  if (
                    correctE2.classList[0].toLowerCase() === x.toLowerCase()
                  ) {
                    correctE2.classList.remove("light");
                    (evt.target as HTMLElement)?.classList.remove("light");
                  }
                }
                if (element.classList[0].toLowerCase() === x.toLowerCase()) {
                  element.classList.remove("light");
                  (evt.target as HTMLElement)?.classList.remove("light");
                }
              } else {
                if (element.classList[0].toLowerCase() === x.toLowerCase()) {
                  element.classList.remove("light");
                  (evt.target as HTMLElement)?.classList.remove("light");
                }
              }
            });
          }
        });
      }
    };
    document.addEventListener("mousemove", mouseChoose);
    document.addEventListener("mouseout", mouseClose);
  }

  clickEnterBtn() {
    const enterClick = (evt: Event) => {
      if (evt.target) {
        (evt.target as HTMLElement).classList.add("button--click");
        setTimeout(() => {
          (evt.target as HTMLElement).classList.remove("button--click");
        }, 100);
        if (this.isLevelPass) {
          if (this.levelNow) {
            if (this.levelNow <= this.levelMax) {
              this.levelNow += 1;
            } else {
              this.levelNow = null;
            }
          }
          this.isLevelPass = false;
          const rightElements: NodeListOf<HTMLElement> | null =
            document.querySelectorAll(".right");
          rightElements.forEach((rightEl) => {
            rightEl.classList.add("right-answer");
          });
          const input: HTMLInputElement | null =
            document.querySelector(".input");
          if (input) {
            input.value = "";
          }
          setTimeout(() => {
            this.changeLevel();
          }, 500);
        } else {
          const mainEditor: HTMLDivElement | null =
            document.querySelector(".main__editor");
          const mainCode: HTMLDivElement | null =
            document.querySelector(".main__code");
          if (mainEditor && mainCode) {
            mainEditor.classList.add("false-answer");
            mainCode.classList.add("false-answer");
            setTimeout(() => {
              mainEditor.classList.remove("false-answer");
              mainCode.classList.remove("false-answer");
            }, 500);
          }
        }
      }
    };

    if (this.enterBtn) {
      this.enterBtn.addEventListener("click", enterClick.bind(this));
    }
  }

  chooseLevel() {
    if (this.aside) {
      document.body.append(this.aside.getHtmlEl());
    }
    this.changeLevel();
  }

  changeLevel() {
    if (this.getCode() !== "win") {
      if (this.codeEl && this.desk) {
        this.codeEl.innerHTML = this.getCode();
        this.desk.innerHTML = this.getDesk();
        if (this.aside) {
          this.aside.getHtmlEl().innerHTML = this.getText();
        }
      } else {
        const bodyEditor: HTMLElement | null =
          document.querySelector(".code__body-editor");
        const mainDesk: HTMLElement | null =
          document.querySelector(".main__desk");
        const aside: HTMLElement | null = document.querySelector(".aside");
        if (bodyEditor && mainDesk && aside) {
          bodyEditor.innerHTML = this.getCode();
          mainDesk.innerHTML = this.getDesk();
          aside.innerHTML = this.getText();
        }
      }
    } else {
      const container = document.querySelector(".container");
      container?.append(new Popup().getHtmlEl());
    }
  }

  update(...args: unknown[]): void {
    if (this.levelNow) {
      if (args[0] === allLevel[this.levelNow].check) {
        this.isLevelPass = true;
      } else {
        this.isLevelPass = false;
      }
    }
  }

  getDesk() {
    if (this.levelNow) {
      if (this.levelNow <= this.levelMax) {
        return allLevel[this.levelNow].desk;
      }
    }
    return "win";
  }

  getCheck() {
    if (this.levelNow) {
      if (this.levelNow <= this.levelMax) {
        return allLevel[this.levelNow].check;
      }
    }
    return "win";
  }

  getText() {
    if (this.levelNow) {
      if (this.levelNow <= this.levelMax) {
        return allLevel[this.levelNow].text;
      }
    }
    return "win";
  }

  getCode() {
    if (this.levelNow) {
      if (this.levelNow <= this.levelMax) {
        return allLevel[this.levelNow].code;
      }
    }
    return "win";
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
