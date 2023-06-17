// import { typeElement } from "./types";

export default class Element {
  #node;

  constructor({
    tagName = "div",
    classNames = [],
    textContent = "",
    parentNode,
  }: {
    tagName: string;
    classNames: string[];
    textContent: string;
    parentNode?: HTMLElement | null;
  }) {
    this.#node = document.createElement(tagName);
    this.#node.classList.add(...classNames);
    this.#node.textContent = textContent;
    if (parentNode) {
      parentNode.append(this.#node);
    }
  }

  // append(child: typeElement): void {
  //   if (child) {
  //     this.#node.append(child.getNode());
  //   }
  // }

  getNode(): HTMLElement {
    return this.#node;
  }

  setAttribute(attr: string, attrValue: string): void {
    this.#node.setAttribute(attr, attrValue);
  }

  // appendChildren(children: typeElement[]) {
  //   children.forEach((el) => {
  //     this.append(el);
  //   });
  // }

  // addClass(className: string): void {
  //   this.#node.classList.add(className);
  // }

  // destroy(): void {
  //   this.#node.remove();
  // }
}
