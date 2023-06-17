export type typeElement = {
  append(child: HTMLElement): void;
  getNode(): HTMLElement;
  addClass(className: string): void;
  destroy(): void;
};

export type level = {
  [key: number]: { desk: string; check: string; text: string; code: string };
};
