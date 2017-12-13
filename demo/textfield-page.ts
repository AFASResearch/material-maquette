import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { createCardTemplate } from '../src/components/card';
import { h } from 'maquette';
import { renderTextField } from '../src';

export let createTextfieldPage = (services: MaterialMaquetteServicesBase): Page => {
  let value = 'value';

  let card1 = createCardTemplate({ elevation: 4 });

  return {
    title: () => 'Textfield',
    content: () => h('main', [
      card1.wrap({
        primary: {
          title: () => 'Textfield, max 10 characters'
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
      })
    ])
  };
};
