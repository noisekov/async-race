import Element from "../../node";
import "./input.scss";
import { IObserver, ISubject } from "../../types";

export default class Input implements ISubject {
  createElement;
  inputValue: string;
  #observers: Set<IObserver>;
  constructor() {
    this.createElement = this.elementView();
    this.addEvent();
    this.inputValue = "";
    this.#observers = new Set();
  }

  public subscribe(observer: IObserver): void {
    this.#observers.add(observer);
  }

  public unsubscribe(observer: IObserver): void {
    this.#observers.delete(observer);
  }

  public notify(event: Event): void {
    if (event.target) {
      const input: HTMLInputElement | null = document.querySelector(".input");
      if (input) {
        this.inputValue = input.value.trim();
      }
    }

    this.#observers.forEach((observer) => {
      observer.update(this.inputValue);
    });
  }

  private elementView() {
    const header = {
      tagName: "input",
      classNames: ["input"],
      textContent: "",
    };
    const createHeader = new Element(header);
    createHeader.setAttribute("type", "text");
    createHeader.setAttribute("placeholder", "Type in a CSS selector");
    return createHeader;
  }

  private addEvent() {
    this.getHtmlEl().addEventListener("input", this.notify.bind(this));
  }

  public getHtmlEl(): HTMLElement {
    return this.createElement.getNode();
  }
}
