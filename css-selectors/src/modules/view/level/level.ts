import Element from "../../node";
import { level } from "../../types";

const level: level = {
  1: {
    desk: `<plate></plate><plate></plate>`,
    check: `plate`,
    text: `Select all plate element`,
    code: `<pre><code><div class="table"><plate/><plate/></div></code></pre>`,
  },
  2: {
    desk: `<plate></plate><plate></plate>`,
    check: `plate`,
    text: `Select all plate element`,
    code: `<pre><code><div class="table"><plate/><plate/></div></code></pre>`,
  },
};

export default class Level {
  createElement;
  constructor() {
    this.createElement = this.elementView();
  }

  elementView() {
    const level = {
      tagName: "div",
      classNames: ["aside__level"],
      textContent: "",
    };
    const createLevel = new Element(level);

    return createLevel;
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
