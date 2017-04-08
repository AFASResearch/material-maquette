import {h, Component} from "maquette";
import {upgradeElement} from "./util";

export interface ButtonConfig {
  text: string;
  disabled?: () => boolean;
  ripple?: boolean;
  colored?: boolean;
  accentColor?: boolean;
  raised?: boolean;
  onClick(): void;
}

export let createButton = (config: ButtonConfig): Component => {
  let {disabled, onClick, text, ripple, colored, accentColor, raised} = config;

  let handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
    onClick();
  };

  return {
    renderMaquette: () => {
      return h('button.mdl-button.mdl-js-button', {
        classes: {
          'mdl-js-ripple-effect': ripple,
          'mdl-button--colored': colored,
          'mdl-button--accent': accentColor,
          'mdl-button--raised': raised
        },
        key: handleClick,
        onclick: handleClick,
        afterCreate: upgradeElement,
        disabled: disabled && disabled() === true
      }, [
        text
      ])
    }
  }
};
