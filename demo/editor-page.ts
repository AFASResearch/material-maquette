import { h } from 'maquette';
import { ButtonConfig, MaterialMaquetteServicesBase, Page, renderButton, renderCard, renderTextField } from '../src';

export let createEditorPage = (services: MaterialMaquetteServicesBase): Page => {
  let data: ButtonConfig = {
    style: {},
    text: 'Click me',
    onClick: () => alert('Clicked')
  };

  return {
    renderTitle: () => 'Editor',
    renderContent: () => h('main', [
      renderCard({
        style: {
          elevation: 4
        },
        content: {
          primary: {
            title: 'Editor'
          },
          supportingText: () => [
            renderTextField(services, {
              id: 'textfield1',
              label: 'Label',
              value: data.text,
              setValue: (newValue: string) => {
                data.text = newValue;
              }
            })
          ]
        }
      }),
      renderCard({
        style: {
          elevation: 4
        },
        content: {
          supportingText: () => [
            renderButton(services, data)
          ]
        }
      })
    ])
  };
};
