import { h, VNode, VNodeChildren } from "maquette";

export interface ContentConfig {
  backgroundGray100?: boolean;
}

export let createContent = (config: ContentConfig) => {
  let {backgroundGray100} = config;

  return {
    wrap: (renderContent: () => VNodeChildren): VNode => h(
      'main.mdl-layout__content',
      {
        classes: { 'mdl-color--grey-100': backgroundGray100 }
      },
      renderContent()
    )
  };
};
