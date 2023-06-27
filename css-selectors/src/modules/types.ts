export type typeElement = {
  append(child: HTMLElement): void;
  getNode(): HTMLElement;
  addClass(className: string): void;
  destroy(): void;
};

export type level = {
  [key: number]: { desk: string; check: string; text: string; code: string };
};

export interface IObservable {
  // The Subject Interface

  subscribe(observer: IObserver): void;
  // The subscribe method

  unsubscribe(observer: IObserver): void;
  // The unsubscribe method

  notify(...args: unknown[]): void;
  // The notify method
}

export interface IObserver {
  // A method for the Observer to implement

  notify(...args: unknown[]): void;
  // Receive notifications"
}
