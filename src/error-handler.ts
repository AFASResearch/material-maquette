import {dom, h} from 'maquette';

export let handleError = (...args: any[]) => {
  console.error('An error has been reported', ...args);
  let projection = dom.append(document.body, h('dialog.fatal-error', [
    h('span.text', ['Oops, an unexpected error has occurred']),
    h('button.reload', {onclick: () => window.location.reload()}, ['reload'])
  ]));
  let dialogElement = projection.domNode as any;
  if (dialogElement.showModal) {
    dialogElement.showModal();
  }
  debugger
};

export let installErrorHandler = (window: Window) => {
  window.addEventListener('unhandledrejection', handleError);
  window.onerror = handleError;
};
