import { Component, Projector, VNodeChild } from 'maquette';
import { createDialog, Dialog } from './components/dialog';
import { MDCService } from './mdc-service';

export interface DialogAction {
  /**
   * There may only be one 'accept' button on a dialog
   */
  isAccept?: true;
  /**
   * There may only be one 'cancel' button on a dialog
   */
  isCancel?: true;
  raised?: true;
  primary?: true;
  text(): string;
  onclick(): void;
  isVisible?(): boolean;
  isDisabled?(): boolean;
}

export interface DialogConfig {
  /**
   * A list of actions. Should start with a cancel action.
   */
  actions: DialogAction[];
  title(): string;
  content(): VNodeChild;
  /**
   * Always called when the dialog is destroyed
   */
  exit?(): void;
}

export interface DialogService {
  showDialog(config: DialogConfig): void;
  hideDialog(): void;
  showConfirm(title: string, question: string, strings: ConfirmStrings): Promise<boolean>;
}

export interface ConfirmStrings {
  ok: string;
  cancel: string;
}

export let createDialogService = (dependencies: { projector: Projector, mdcService: MDCService }): DialogService & Component => {
  let { projector } = dependencies;
  let dialogs: Dialog[] = [];
  let dialogService = {
    showDialog: (config: DialogConfig) => {
      let dialog = createDialog(dependencies, config, window.document.activeElement);
      dialogs.push(dialog);
    },
    showConfirm: (title: string, question: string, strings?: ConfirmStrings): Promise<boolean> => {
      return new Promise<boolean>((resolve, reject) => {
        let ok = () => {
          resolve(true);
          dialogService.hideDialog();
        };
        let cancel = () => {
          resolve(false);
          dialogService.hideDialog();
        };
        let dialog: DialogConfig = {
          title: () => title,
          content: () => question,
          actions: [{
            isCancel: true,
            text: () => strings ? strings.cancel : 'Cancel',
            onclick: cancel
          }, {
            isAccept: true,
            text: () => strings ? strings.ok : 'Ok',
            onclick: ok
          }]
        };
        dialogService.showDialog(dialog);
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
        return dialogs[dialogs.length - 1].renderMaquette();
      }
      return undefined;
    }
  };
  return dialogService;
};
