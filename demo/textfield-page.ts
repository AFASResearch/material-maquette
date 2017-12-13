import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { h } from 'maquette';
import { renderTextField, renderCard } from '../src';

export let createTextfieldPage = (services: MaterialMaquetteServicesBase): Page => {
  let value = 'value';

  return {
    title: () => 'Textfield',
    content: () => h('main', [
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
