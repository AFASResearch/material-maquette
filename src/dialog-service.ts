import {Component, h, Projector, VNodeChild } from "maquette";
import {createDialog, Dialog} from "./dialog";
import {upgradeElement} from "./util";
import {createButton} from "./button";
let dialogPolyfill = require('dialog-polyfill');

export interface DialogConfig {
  title: () => string;
  content: () => VNodeChild;
  actions: () => VNodeChild;
  /**
   * When the user presses close, clicks the curtain or presses esc
   */
  closeRequested: () => void;
  /**
   * When the user presses enter inside the dialog
   */
  submitRequested?: () => void;
  /**
   * Always called when the dialog is destroyed
   */
  exit?: () => void;
}

export interface DialogService {
  showDialog: (config: DialogConfig) => void;
  hideDialog: () => void;
  showConfirm: (title: string, question: string) => Promise<boolean>;
}

export let createDialogService = (dependencies: {projector: Projector}): DialogService & Component => {
  let {projector} = dependencies;
  let dialogs: Dialog[] = [];
  return {
    showDialog: (config: DialogConfig) => {
      let dialog = createDialog(config);
      dialogs.push(dialog);
    },
    showConfirm: (title: string, question: string): Promise<boolean> => {
      return new Promise<boolean>((resolve, reject) => {
        let showModal = (el: HTMLElement) => {
          upgradeElement(el);
          dialogPolyfill.registerDialog(el);
          (el as any).showModal();
        };
        let okButton = createButton({text: 'Ok', colored: true, raised: true, onClick: () => {
          resolve(true);
          dialogs.pop();
        }});
        let cancelButton = createButton({text: 'Cancel', colored: true, onClick: () => {
          resolve(false);
          dialogs.pop();
        }});
        dialogs.push({
          renderMaquette: () => {
            return h('dialog.mdl-dialog', {afterCreate: showModal}, [
              h('h4.mdl-dialog__title', [title]),
              h('div.mdl-dialog__content', [
                question
              ]),
              h('div.mdl-dialog__actions', [
                okButton.renderMaquette(),
                cancelButton.renderMaquette()
              ])
            ])
          }
        })
      });
    },
    hideDialog: () => {
      let dialog = dialogs.pop()!;
      if (dialog.exit) {
        dialog.exit();
      }
      projector.scheduleRender();
    },
    renderMaquette: () => {
      if (dialogs.length > 0) {
        return dialogs[dialogs.length-1].renderMaquette();
      }
      return undefined;
    }
  };
};