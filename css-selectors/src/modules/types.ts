export type typeElement = {
  append(child: HTMLElement): void;
  getNode(): HTMLElement;
  addClass(className: string): void;
  destroy(): void;
};
