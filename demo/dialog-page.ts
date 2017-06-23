import { AllMaterialMaquetteServices } from '../src/services';
import { Page } from '../src/router';
import { createButton } from '../src/components/button';
import { createContent } from '../src/components/content';
import { h } from 'maquette';
import { createCard } from '../src/components/card';
import { DialogConfig } from '../src/dialog-service';

export let createDialogPage = (services: AllMaterialMaquetteServices): Page => {

  let dialog1: DialogConfig = {
    title: () => 'Dialog title',
    content: () => h('div', ['A modal dialog that you can approve or deny']),
    actions: [
      {
        text: () => 'deny',
        onclick: services.dialogService.hideDialog,
        isCancel: true
      },
      {
        text: () => 'approve',
        onclick: services.dialogService.hideDialog,
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

  let card1 = createCard({ elevation: 4 });

  return {
    title: () => 'Modal dialog',
    content: () => content.wrap(() => ([
      card1.wrap({
        primary: {
          title: () => 'Dialogs [Not operational anymore]'
        },
        supportingText: () => [
          button1.renderMaquette()
        ]
      })
    ]))
  };
};
