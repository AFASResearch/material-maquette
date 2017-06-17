import { h, VNode, VNodeChildren } from 'maquette';

export interface CardConfig {
  cellColumns?: number;
  shadowDp?: number;
}

export interface CardMedia {
  title?: () => string;
  largeTitle?: true;
}

export interface CardPrimary {
  title: () => string;
  subtitle?: () => string;
}

export interface CardSupportingText {
  content: () => VNodeChildren;
}

export interface CardAction {
  text: () => string;
  onclick: () => void;
}

export interface CardActions {
  actions?: () => CardAction[];
}

/**
 * NOTE: the order of the keys will determine the order of the parts
 */
export interface CardContent {
  primary?: CardPrimary;
  media?: CardMedia;
  supportingText?: CardSupportingText;
  actions?: CardActions;
}

// NOTE: Not yet implemented all content types fully

export let createCard = (config: CardConfig) => {
  let { cellColumns, shadowDp } = config;

  let vnodeSelector = 'div.mdc-card';
  if (cellColumns) {
    vnodeSelector = `${vnodeSelector}.mdc-layout-grid__cell.mdc-layout-grid__cell--span-${cellColumns}`;
  }
  if (shadowDp) {
    vnodeSelector = `${vnodeSelector}.mdc-elevation--z${shadowDp}`;
  }

  return {
    wrap: (content: CardContent): VNode => h(
      vnodeSelector, [
        Object.keys(content).map(type => {
          switch (type) {
            case 'primary':
              return h('section.mdc-card__primary', [
                h('h1', [content.primary!.title()])
              ]);
            case 'supportingText':
              return h('section.mdc-card__supporting-text', [
                content.supportingText!.content()
              ]);
            default:
              throw new Error(type);
          }
        })
      ]
    )
  };
};
