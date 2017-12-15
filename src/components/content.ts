import { h, VNode, VNodeChildren } from 'maquette';

export interface ContentConfig {
  backgroundGray100?: boolean;
}

// NOTE: Not yet fully converted from mdl to mdc

export let renderContent = (config: ContentConfig, content: VNodeChildren): VNode => {
  let { backgroundGray100 } = config;

  return h(
    'main.mdc-layout__content',
    {
      classes: { 'mdc-color--grey-100': backgroundGray100 }
    },
    [content]
  );
};
