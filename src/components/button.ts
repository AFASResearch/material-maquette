import { h, Component, Projector } from 'maquette';
import { ripple } from 'material-components-web/dist/material-components-web';
import { MDCService } from '../mdc-service';
import { createSelector } from '../utilities';

export interface ButtonConfig {
  text: () => string;
  disabled?: () => boolean;
  accentColor?: boolean;
  raised?: true;
  primary?: true;
  extraClasses?: string[];
  onClick(): void;
}

export let createButton = (dependencies: { projector: Projector, mdcService: MDCService }, config: ButtonConfig): Component => {
  let { mdcService } = dependencies;
  let { disabled, onClick, text, accentColor, raised, primary, extraClasses } = config;

  let handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    onClick();
  };

  let enhancer = mdcService.createEnhancer(ripple.MDCRipple);

  let selector = createSelector('button.mdc-button', undefined, extraClasses);

  return {
    renderMaquette: () => {
      return h(selector, {
        classes: {
          'mdc-button--accent': accentColor,
          'mdc-button--raised': raised,
          'mdc-button--primary': primary
        },
        key: handleClick,
        onclick: handleClick,
        afterCreate: enhancer.handleCreate,
        afterUpdate: enhancer.handleUpdate,
        disabled: disabled && disabled() === true
      }, [
          text()
        ]);
    }
  };
};
