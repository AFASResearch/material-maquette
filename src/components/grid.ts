import { h, VNode, VNodeChildren } from "maquette";

export interface GridConfig {
  maxWidth?: number;
}

// NOTE: Not yet fully converted from mdl to mdc

export let createGrid = (config: GridConfig) => {
  let {maxWidth} = config;

  return {
    wrap: (renderContent: () => VNodeChildren): VNode => h(
      'div.mdc-grid',
      {
        styles: { maxWidth: maxWidth ? maxWidth + 'px' : undefined},
      },
      renderContent()
    )
  };
};
