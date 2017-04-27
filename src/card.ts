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

export let createCard = (config: CardConfig) => {
  let {cellColumns, shadowDp, headerAlignsWithDataTable} = config;

  let vnodeSelector = 'div.mdl-card';
  if (cellColumns) {
    vnodeSelector = `${vnodeSelector}.mdl-cell.mdl-cell--${cellColumns}-col`;
  }
  if (shadowDp) {
    vnodeSelector = `${vnodeSelector}.mdl-shadow--${shadowDp}dp`;
  }

  return {
    wrap: (content: CardContent): VNode => h(
      vnodeSelector, [
        h('div.mdl-card__title', {styles: {paddingLeft: headerAlignsWithDataTable ? '24px' : undefined}}, [
          h('h2.mdl-card__title-text', content.title())
        ]),
        content.media ? h('div.mdl-card__media', content.media()) : undefined,
        content.supportingText ? h('div.mdl-card__supporting-text', content.supportingText()) : undefined
      ]
    )
  };
};
