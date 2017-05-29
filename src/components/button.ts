import {h, Component, Projector} from "maquette";
import {ripple} from "material-components-web";
import {MDCService} from "../mdc-service";

export interface ButtonConfig {
  text: string;
  disabled?: () => boolean;
  accentColor?: boolean;
  raised?: boolean;
  onClick(): void;
}

export let createButton = (dependencies: {projector: Projector, mdcService: MDCService}, config: ButtonConfig): Component => {
  let {mdcService} = dependencies;
  let {disabled, onClick, text, accentColor, raised} = config;

  let handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    onClick();
  };

  let enhancer = mdcService.createEnhancer(ripple.MDCRipple);

  return {
    renderMaquette: () => {
      return h('button.mdc-button', {
        classes: {
          'mdc-button--accent': accentColor,
          'mdc-button--raised': raised
        },
        key: handleClick,
        onclick: handleClick,
        afterCreate: enhancer.handleCreate,
        afterUpdate: enhancer.handleUpdate,
        disabled: disabled && disabled() === true
      }, [
        text
      ])
    }
  }
};
