import { AllMaterialMaquetteServices } from '../src/services';
import { Page } from '../src/router';
import { createButton } from '../src/components/button';
import { createContent } from '../src/components/content';
import { h } from 'maquette';
import { createCardTemplate } from '../src/components/card';
import { DialogConfig } from '../src/dialog-service';

/* tslint:disable no-console */
export let createDialogPage = (services: AllMaterialMaquetteServices): Page => {
  let dialog1: DialogConfig = {
    title: () => 'Dialog title',
    content: () => h('div', ['A modal dialog that you can approve or deny']),
    actions: [
      {
        text: () => 'deny',
        onclick: () => {
          console.log('deny');
          window.alert('Not an option');
        },
        isCancel: true
      },
      {
        text: () => 'still thinking',
        onclick: () => {
          console.log('thinking');
        }
      },
      {
        text: () => 'not sure',
        onclick: () => {
          console.log('not sure');
          services.dialogService.hideDialog();
        }
      },
      {
        text: () => 'approve',
        raised: true,
        onclick: () => {
          window.alert('You approved');
          console.log('approved');
          services.dialogService.hideDialog();
        },
        isAccept: true
      }
    ]
  };

  let content = createContent({ backgroundGray100: true });

  let button1 = createButton(services, {
    text: () => 'Start modal dialog',
    raised: true,
    onClick: () => services.dialogService.showDialog(dialog1)
  });

  let card1 = createCardTemplate({ elevation: 4 });

  return {
    title: () => 'Modal dialog',
    content: () => content.wrap(() => ([
      card1.wrap({
        primary: {
          title: () => 'Custom dialog with accept and deny'
        },
        supportingText: () => [
          button1.renderMaquette()
        ]
      })
    ]))
  };
};
