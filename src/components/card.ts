import { h, VNode, VNodeChildren } from "maquette";

export interface CardConfig {
  cellColumns?: number;
  shadowDp?: number;
  headerAlignsWithDataTable?: boolean;
}

export interface CardContent {
  title: () => string;
  media?: () => VNodeChildren;
  supportingText?: () => VNodeChildren;
  actions?: () => VNodeChildren;
}

// NOTE: Not yet fully converted from mdl to mdc

export let createCard = (config: CardConfig) => {
  let {cellColumns, shadowDp, headerAlignsWithDataTable} = config;

  let vnodeSelector = 'div.mdc-card';
  if (cellColumns) {
    vnodeSelector = `${vnodeSelector}.mdc-cell.mdc-cell--${cellColumns}-col`;
  }
  if (shadowDp) {
    vnodeSelector = `${vnodeSelector}.mdc-shadow--${shadowDp}dp`;
  }

  return {
    wrap: (content: CardContent): VNode => h(
      vnodeSelector, [
        h('div.mdc-card__title', {styles: {paddingLeft: headerAlignsWithDataTable ? '24px' : undefined}}, [
          h('h2.mdc-card__title-text', content.title())
        ]),
        content.media ? h('div.mdc-card__media', content.media()) : undefined,
        content.supportingText ? h('div.mdc-card__supporting-text', content.supportingText()) : undefined
      ]
    )
  };
};
