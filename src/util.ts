import 'material-design-lite';

let globalComponentHandler: typeof componentHandler = (window as any).componentHandler;

export let upgradeElement = (element: HTMLElement) => {
  globalComponentHandler.upgradeElement(element);
};
