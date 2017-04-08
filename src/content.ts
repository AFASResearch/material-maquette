import {Component, h, VNode} from "maquette";

export interface ContentConfig {
  backgroundGray100?: boolean;
  contents: (() => VNode | null | undefined)[];
}

export let createContent = (config: ContentConfig) => {
  let {backgroundGray100, contents} = config;

  return {
    renderMaquette: () => h(
      'main.mdl-layout__content',
      { classes: { 'mdl-color--grey-100': backgroundGray100 } },
      contents.map(c => c())
    )
  };
};
