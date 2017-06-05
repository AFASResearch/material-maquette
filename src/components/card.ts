import { h, VNode, VNodeChildren } from "maquette";

export interface CardConfig {
  cellColumns?: number;
  shadowDp?: number;
}

export interface CardMedia {
  type: 'media',
  title?: () => string,
  largeTitle?: true,
}

export interface CardPrimary {
  type: 'primary',
  title: () => string,
  subtitle?: () => string;
}

export interface CardSupportingText {
  type: 'supportingText',
  content: () => VNodeChildren;
}

export interface CardAction {
  text: () => string;
  onclick: () => void;
}

export interface CardActions {
  type: 'actions';
  actions?: () => CardAction[];
}

export type CardContent = CardMedia | CardPrimary | CardSupportingText | CardActions;

// NOTE: Not yet implemented all content types fully

export let createCard = (config: CardConfig) => {
  let {cellColumns, shadowDp } = config;

  let vnodeSelector = 'div.mdc-card';
  if (cellColumns) {
    vnodeSelector = `${vnodeSelector}.mdc-layout-grid__cell.mdc-layout-grid__cell--span-${cellColumns}`;
  }
  if (shadowDp) {
    vnodeSelector = `${vnodeSelector}.mdc-elevation--z${shadowDp}`;
  }

  return {
    wrap: (content: CardContent[]): VNode => h(
      vnodeSelector, [
        content.map(c => {
          switch (c.type) {
            case 'primary':
              return h('section.mdc-card__primary', [
                h('h1', [c.title()])
              ]);
            case 'supportingText':
              return h('section.mdc-card__supporting-text', [
                c.content()
              ]);
            default:
              throw new Error(c.type)
          }
        })
      ]
    )
  };
};
