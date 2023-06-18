import Element from "../../node";
import "./main.scss";
import Input from "../input/input";
import { level } from "../../types";

const level: level = {
  1: {
    desk: `<plate class="desk__inner"></plate><plate class="desk__inner"></plate>`,
    check: `plate`,
    text: `Select all plate element`,
    code: `
        <div>&lt;div class="table"&gt;<div class="plate">&lt;plate /&gt;</div><div class="plate">&lt;plate /&gt;</div>&lt;/div&gt</div>
      `,
  },
  2: {
    desk: `<plate></plate><plate></plate>`,
    check: `plate`,
    text: `Select all plate element`,
    code: `<pre><code><div class="table"><plate/><plate/></div></code></pre>`,
  },
};

export default class Main {
  createElement;
  codeEl: HTMLElement | null;
  desk: HTMLElement | null;
  constructor() {
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
    this.codeEl = new Element(mainCodeBody).getNode();

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

    const inputBody = new Input().getHtmlEl();
    editorBody.getNode().append(inputBody);

    this.chooseLevel(1);
    return createNode;
  }

  event() {
    document.addEventListener("mousemove", mouseChoose);
    document.addEventListener("mouseout", mouseClose);

    function mouseChoose(evt: Event) {
      if (evt.target) {
        if ((evt.target as HTMLElement).closest(".plate")) {
          (evt.target as HTMLElement).closest(".plate")?.classList.add("light");
        }
      }
    }

    function mouseClose(evt: Event) {
      if (evt.target) {
        if ((evt.target as HTMLElement).closest(".plate")) {
          (evt.target as HTMLElement)
            .closest(".plate")
            ?.classList.remove("light");
        }
      }
    }
  }

  chooseLevel(val: number) {
    if (this.codeEl && this.desk) {
      this.codeEl.innerHTML = this.getCode(val);
      this.desk.innerHTML = this.getDesk(val);
    }
  }

  getDesk(val: number) {
    return level[val].desk;
  }

  getCheck(val: number) {
    return level[val].check;
  }

  getText(val: number) {
    return level[val].text;
  }

  getCode(val: number) {
    return level[val].code;
  }

  getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
