import { h, ProjectorService, VNode } from 'maquette';
import { ripple } from 'material-components-web/dist/material-components-web';
import { createSelector } from '../utilities';
import { createMdcComponentManager } from '../utilities/mdc-component-manager';

export interface ButtonDependencies {
  projector: ProjectorService;
}

export interface ButtonConfig {
  style: {
    raised?: boolean;
    unelevated?: boolean;
    stroked?: boolean;
    dense?: boolean;
    compact?: boolean;
    extraClasses?: string[];
  };
  text: string;
  icon?: string;
  disabled?: boolean;

  onClick(): void;
}

let buttonManager = createMdcComponentManager(ripple.MDCRipple);

export let renderButton = (dependencies: ButtonDependencies, config: ButtonConfig): VNode => {
  let { style: { raised, unelevated, stroked, dense, compact, extraClasses }, disabled, onClick, text } = config;

  let handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    onClick();
  };

  let selector = createSelector('button.mdc-button', undefined, extraClasses);

  return h(
    selector,
    {
      classes: {
        'mdc-button--raised': raised,
        'mdc-button--unelevated': unelevated,
        'mdc-button--stroked': stroked,
        'mdc-button--dense': dense,
        'mdc-button--compact': compact
      },
      key: handleClick,
      onclick: handleClick,
      afterCreate: buttonManager.handleAfterCreate,
      afterRemoved: buttonManager.handleAfterRemoved,
      disabled: disabled === true
    },
    [
      text
    ]
  );
};
