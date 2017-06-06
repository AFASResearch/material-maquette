import { h, VNode, VNodeChildren } from 'maquette';

export interface ContentConfig {
  backgroundGray100?: boolean;
}

// NOTE: Not yet fully converted from mdl to mdc

export let createContent = (config: ContentConfig) => {
  let { backgroundGray100 } = config;

  return {
    wrap: (renderContent: () => VNodeChildren): VNode => h(
      'main.mdc-layout__content',
      {
        classes: { 'mdc-color--grey-100': backgroundGray100 }
      },
      renderContent()
    )
  };
};
