import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { createCard } from '../src/components/card';
import { createTextfield } from '../src/components/textfield';
import { h } from 'maquette';

export let createTextfieldPage = (services: MaterialMaquetteServicesBase): Page => {

  let value = 'value';

  let textfield1 = createTextfield(services, {
    id: 'textfield1',
    label: () => 'Label',
    getValue: () => value,
    setValue: (newValue: string) => {
      value = newValue.substr(0, 10); // max 10 characters
    }
  });

  let card1 = createCard({ shadowDp: 4, cellColumns: 12 });

  return {
    title: () => 'Textfield',
    content: () => h('main', [
      card1.wrap({
        primary: {
          title: () => 'Textfield, max 10 characters'
        },
        supportingText: {
          content: () => [
            textfield1.renderMaquette()
          ]
        }
      })
    ])
  };
};
