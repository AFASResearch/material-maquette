import { h } from 'maquette';
import { renderTextField, renderCard, MaterialMaquetteServicesBase, Page } from '../src';

export let createTextfieldPage = (services: MaterialMaquetteServicesBase): Page => {
  let value = 'value';

  return {
    renderTitle: () => 'Textfield',
    renderContent: () => h('main', [
      renderCard({
        style: {
          elevation: 4
        },
        content: {
          primary: {
            title: 'Textfield, max 10 characters'
          },
          supportingText: () => [
            renderTextField(services, {
              id: 'textfield1',
              label: 'Label',
              value,
              setValue: (newValue: string) => {
                value = newValue.substr(0, 10); // max 10 characters
              }
            })
          ]
        }
      })
    ])
  };
};
