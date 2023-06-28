import Element from "../../node";
import "./main.scss";
import Aside from "../aside/aside";
import allLevel from "../../allLevel";
import { IObserver } from "../../types";

export default class Main implements IObserver {
  createElement;
  codeEl: HTMLElement | null;
  desk: HTMLElement | null;
  levelNow: number;
  constructor() {
    this.levelNow = 1;
    this.createElement = this.elementView();
    this.codeEl = null;
    this.desk = null;
    this.event();
  }

  elementView() {
    const main = {
      tagName: "main",
      classNames: ["main"],
      textContent: "",
    };
    const createNode = new Element(main);

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

    const mainEditorBodyLine = {
      tagName: "div",
      classNames: ["editor__body-line"],
      textContent: "",
      parentNode: editorBody.getNode(),
    };
    new Element(
      mainEditorBodyLine
    ).getNode().innerHTML = `1 <br> 2 <br> 3 <br> 4 <br> 5 <br> 6 <br> 7 <br> 8 <br> 9 <br> 10 <br> 11 <br> 12 <br> 13 <br> 14 <br> 15 <br> 16 <br> 17 <br> 18 <br> 19 <br> 20`;

    this.chooseLevel();
    return createNode;
  }

  event() {
    const mouseChoose = (evt: Event) => {
      if (evt.target) {
        [...(evt.target as HTMLElement).classList].filter((x) => {
          const whatTag = document.querySelector(".main__desk");
          const codeBody = document.querySelector(".desk__elements");
          if (whatTag && codeBody) {
            Array.from(whatTag.children).filter((element) => {
              if (element.tagName.toLowerCase() === x.toLowerCase()) {
                element.classList.add("light");
                (evt.target as HTMLElement)?.classList.add("light");
              }
            });
            Array.from(codeBody.children).filter((element) => {
              if (element.classList[0].toLowerCase() === x.toLowerCase()) {
                element.classList.add("light");
                (evt.target as HTMLElement)?.classList.add("light");
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
              if (element.tagName.toLowerCase() === x.toLowerCase()) {
                element.classList.remove("light");
                (evt.target as HTMLElement)?.classList.remove("light");
              }
            });
            Array.from(codeBody.children).filter((element) => {
              if (element.classList[0].toLowerCase() === x.toLowerCase()) {
                element.classList.remove("light");
                (evt.target as HTMLElement)?.classList.remove("light");
              }
            });
          }
        });
      }
    };
    document.addEventListener("mousemove", mouseChoose);
    document.addEventListener("mouseout", mouseClose);
  }

  chooseLevel() {
    const aside = new Aside();
    document.body.append(aside.getHtmlEl());
    if (this.codeEl && this.desk && aside) {
      this.codeEl.innerHTML = this.getCode();
      this.desk.innerHTML = this.getDesk();
      aside.getHtmlEl().innerHTML = this.getText();
    }
  }

  update(...args: unknown[]): void {
    if (args[0] === allLevel[this.levelNow].check) {
      console.log("da");
    }
  }

  getDesk() {
    return allLevel[this.levelNow].desk;
  }

  getCheck() {
    return allLevel[this.levelNow].check;
  }

  getText() {
    return allLevel[this.levelNow].text;
  }

  getCode() {
    return allLevel[this.levelNow].code;
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
