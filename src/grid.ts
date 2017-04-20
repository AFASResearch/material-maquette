import {h, VNodeChildren} from "maquette";

export interface GridConfig {
  maxWidth?: number;
}

export let createGrid = (config: GridConfig) => {
  let {maxWidth} = config;

  return {
    wrap: (renderContent: () => VNodeChildren) => h(
      'div.mdl-grid',
      {
        styles: { maxWidth: maxWidth ? maxWidth + 'px' : undefined},
      },
      renderContent()
    )
  };
};
