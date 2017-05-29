import {Component, h} from "maquette";
import {DialogConfig} from "../dialog-service";
let dialogPolyfill = require('dialog-polyfill');

const INPUT_QUERY_SELECTOR = 'select,input,textarea,button';

export interface Dialog extends Component {
  exit?: () => void;
}

// NOTE: Not yet fully converted from mdl to mdc

export let createDialog = (config: DialogConfig): Dialog => {

  let focusInput = (rootElement: HTMLElement, last: boolean) => {
    let inputs = [].slice.call(rootElement.querySelectorAll(INPUT_QUERY_SELECTOR));
    inputs = inputs.filter((node: HTMLInputElement) => !node.disabled);
    if (inputs.length > 0) {
      (inputs[last ? (inputs.length - 1) : 0] as HTMLElement).focus();
    }
  };

  let handleAfterCreate = (dialog: HTMLElement) => {
    //upgradeElement(dialog);
    dialogPolyfill.registerDialog(dialog);
    (dialog as any).showModal();

    focusInput(dialog, false);
  };

  let handleCurtainClick = (event: MouseEvent) => {
    if (event.currentTarget === event.target) { // Ignore bubbling events
      event.preventDefault();
      config.closeRequested();
    }
  };

  let handleKeydown = (evt: KeyboardEvent) => {
    if (evt.which === 13 && (evt.target as HTMLElement).tagName !== 'TEXTAREA' && ((evt.target as HTMLElement).tagName !== 'BUTTON')) {
      evt.preventDefault();
      config.submitRequested ? config.submitRequested() : config.closeRequested();
    } else if (evt.which === 27) {
      evt.preventDefault();
      config.closeRequested();
    }
  };

  let dialog = {
    renderMaquette: () => {
      let footerButtons = config.actions();
      return h('div.mdc-dialog', { afterCreate: handleAfterCreate, onkeydown: handleKeydown, onclick: handleCurtainClick, key: dialog }, [
        h('h4.mdc-dialog__title', [ config.title() ]),
        h('div.mdc-dialog__content', [
          config.content()
        ]),
        h('div.mdc-dialog__actions', footerButtons)
      ]);
    },
    exit: config.exit
  };

  return dialog;

};
