import { h } from 'maquette';
import { AllMaterialMaquetteServices, renderContent, DialogConfig, Page, renderButton, renderCard } from '../src';

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

  return {
    renderTitle: () => 'Modal dialog',
    renderContent: () => renderContent({ backgroundGray100: true }, [
      renderCard({
        style: { elevation: 4 },
        content: {
          primary: {
            title: 'Custom dialog with accept and deny'
          },
          supportingText: () => [
            renderButton(services, {
              style: { raised: true },
              text: 'Start modal dialog',
              onClick: () => services.dialogService.showDialog(dialog1)
            })
          ]
        }
      })
    ])
  };
};
