import { h, VNode, VNodeChild } from 'maquette';
import { toolbar } from 'material-components-web/dist/material-components-web';
import { MaterialMaquetteServicesBase } from '../services';
import { createMdcComponentManager } from '../utilities/mdc-component-manager';

export interface ToolbarConfig {
  title(): VNodeChild;
}

let toolbarManager = createMdcComponentManager(toolbar.MDCToolbar);

export let renderToolbar = (context: MaterialMaquetteServicesBase, config: ToolbarConfig): VNode => {
  let { title } = config;

  return h(
    'div.mdc-toolbar',
    {
      afterCreate: toolbarManager.handleAfterCreate,
      afterRemoved: toolbarManager.handleAfterRemoved
    },
    [
      h('div.mdc-toolbar__row', [
        h('section.mdc-toolbar__section.mdc-toolbar__section--align-start', [
          h('span.mdc-toolbar__title', [title()])
        ])
      ])
    ]
  );
};
