import { Component, h } from 'maquette';
import { textField } from 'material-components-web/dist/material-components-web';
import { MaterialMaquetteServicesBase } from '../services';

export interface TextfieldConfig {
  id: string;
  label(): string;
  getValue(): string;
  setValue(newValue: string): void;
}

export let createTextfield = (context: MaterialMaquetteServicesBase, config: TextfieldConfig): Component => {
  let { label, id, getValue, setValue } = config;
  let enhancer = context.mdcService.createEnhancer(textField.MDCTextfield);

  let handleInput = (evt: Event) => {
    let input = evt.target as HTMLInputElement;
    setValue(input.value);
  };

  return {
    renderMaquette: () => {
      return h('div.mdc-textfield', { afterCreate: enhancer.handleCreate, afterUpdate: enhancer.handleUpdate }, [
        h('input.mdc-textfield__input', { id, oninput: handleInput, value: getValue() }),
        h('label.mdc-textfield__label', { for: id }, [label()])
      ]);
    }
  };
};
