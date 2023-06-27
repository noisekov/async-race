import { IObservable, IObserver } from "../types";

export default class Subject implements IObservable {
  // The Subject (a.k.a Observable)
  #observers: Set<IObserver>;
  constructor() {
    this.#observers = new Set();
  }

  subscribe(observer: IObserver) {
    this.#observers.add(observer);
  }

  unsubscribe(observer: IObserver) {
    this.#observers.delete(observer);
  }

  notify(...args: unknown[]) {
    this.#observers.forEach((observer) => {
      observer.notify(...args);
    });
  }
}

// class Observer implements IObserver {
//   // The concrete observer
//   #id: number;

//   constructor(observable: IObservable) {
//     this.#id = COUNTER++;
//     observable.subscribe(this);
//   }

//   notify(...args: unknown[]) {
//     console.log(`OBSERVER_${this.#id} received ${JSON.stringify(args)}`);
//   }
// }
