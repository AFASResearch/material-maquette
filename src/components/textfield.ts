import { h, VNode } from 'maquette';
import { textField } from 'material-components-web/dist/material-components-web';
import { MaterialMaquetteServicesBase } from '../services';
import { createMdcComponentManager } from '../utilities/mdc-component-manager';

let textFieldManager = createMdcComponentManager(textField.MDCTextField);

export interface TextfieldConfig {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  setValue(newValue: string): void;
}

export let renderTextField = (context: MaterialMaquetteServicesBase, config: TextfieldConfig): VNode => {
  let { label, id, value, setValue } = config;

  let handleInput = (evt: Event) => {
    let input = evt.target as HTMLInputElement;
    setValue(input.value);
  };

  return h(
    'div.mdc-textfield',
    { afterCreate: textFieldManager.handleAfterCreate, afterRemoved: textFieldManager.handleAfterRemoved },
    [
      h('input.mdc-text-field__input', { id, oninput: handleInput, value: value }),
      h('label.mdc-text-field__label', { for: id }, [label]),
      h('div.mdc-text-field__bottom-line')
    ]);
};
