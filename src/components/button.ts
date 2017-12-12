import { h, Projector, VNode } from 'maquette';
import { ripple } from 'material-components-web/dist/material-components-web';
import { MDCService } from '../mdc-service';
import { createSelector } from '../utilities';

/* Pure function
 *   Like react, but easier and more vanilla js. Just pass state & callbacks
 *   No lifecycle to worry about
 */

export interface ButtonDependencies {
  projector: Projector;
  mdcService: MDCService;
}

export interface ButtonConfig {
  style: {
    accentColor?: boolean;
    raised?: true;
    primary?: true;
    extraClasses?: string[];
  };
  text: string;
  disabled?: boolean;
  onClick(): void;
}

export let renderButton = (dependencies: ButtonDependencies, config: ButtonConfig): VNode => {
  let { mdcService } = dependencies;
  let { style: { accentColor, raised, extraClasses, primary }, disabled, onClick, text } = config;

  let handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    onClick();
  };

  let enhancer = mdcService.createEnhancer(ripple.MDCRipple);

  let selector = createSelector('button.mdc-button', undefined, extraClasses);

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
    disabled: disabled === true
  }, [
      text
    ]);
};
