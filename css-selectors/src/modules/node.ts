export default class Element {
  node;
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
    this.node = document.createElement(tagName);
    this.node.classList.add(...classNames);
    this.node.textContent = textContent;
    if (parentNode) {
      parentNode.append(this.node);
    }
  }

  public append(child: HTMLElement): void {
    if (child) {
      this.node.append(child);
    }
  }

  public getNode(): HTMLElement {
    return this.node;
  }

  public setAttribute(attr: string, attrValue: string): void {
    this.node.setAttribute(attr, attrValue);
  }
}
