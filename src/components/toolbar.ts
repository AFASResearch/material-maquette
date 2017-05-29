import { Component, h, VNodeChild } from 'maquette';
import { toolbar } from 'material-components-web';
import {MaterialMaquetteServicesBase} from "../services";

export interface ToolbarConfig {
  title(): VNodeChild;
}

export let createToolbar = (context: MaterialMaquetteServicesBase, config: ToolbarConfig): Component => {
  let { title } = config;

  let enhancer = context.mdcService.createEnhancer(toolbar.MDCToolbar);

  return {
    renderMaquette: () => {
      return h('div.mdc-toolbar', { afterCreate: enhancer.handleCreate, afterUpdate: enhancer.handleUpdate }, [
        h('div.mdc-toolbar__row', [
          h('section.mdc-toolbar__section.mdc-toolbar__section--align-start', [
            h('span.mdc-toolbar__title', [ title() ])
          ])
        ])
      ]);
    }
  };
};
