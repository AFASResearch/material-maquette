import { h, VNode, VNodeChild } from 'maquette';
import { CellConfig, toCellClassNamesSuffix } from './grid';
import { createSelector } from '../utilities';

export interface CardMedia {
  dark?: true;
  extraClasses?: string[];
  /**
   * For convenience
   */
  background?: string;
  largeTitle?: string;
  title?: string;
}

export interface CardPrimary {
  title: string;
  subtitle?: string;
}

export interface CardAction {
  raised?: true;
  primary?: true;
  text: string;

  onclick(): void;
}

export interface CardStyle {
  cell?: CellConfig;
  elevation?: number;
  dark?: boolean;
}

export interface CardConfig {
  style: CardStyle;
  /**
   * In case the Card is used as a 'stamp' to render multiple cards, the key makes cards distinguishable
   */
  key?: object;
  /**
   * NOTE: the order of the keys will determine the order of the parts
   */
  content: {
    primary?: CardPrimary;
    media?: CardMedia;
    supportingText?(): VNodeChild;
    actions?(): CardAction[];
  };
}

// NOTE: Not yet implemented all content types fully

export let renderCard = (config: CardConfig): VNode => {
  let { style: { cell, elevation, dark }, key, content } = config;

  let vnodeSelector = 'div.mdc-card.mm-card';
  if (cell) {
    vnodeSelector = `${vnodeSelector}${toCellClassNamesSuffix(cell)}`;
  }
  if (elevation) {
    vnodeSelector = `${vnodeSelector}.mdc-elevation--z${elevation}`;
  }
  if (dark) {
    vnodeSelector = `${vnodeSelector}.mdc-card--theme-dark`;
  }

  return h(
    vnodeSelector, { key: key || config }, [
      Object.keys(content).map(type => {
        switch (type) {
          case 'primary':
            let primary = content.primary!;
            return h('section.mdc-card__primary', [
              h('h1.mdc-card__title.mdc-card__title--large', [primary.title]),
              primary.subtitle ? h('h2.mdc-card__subtitle', [primary.subtitle]) : undefined
            ]);
          case 'media':
            let media = content.media!;
            let selector = createSelector('section.mdc-card__media', undefined, media.extraClasses);
            return h(selector,
              {
                styles: { background: media.background },
                classes: { 'mdc-card--theme-dark': media.dark }
              }, [
                media.largeTitle ? h('h1.mdc-card__title.mdc-card__title--large', [media.largeTitle]) : undefined,
                media.title ? h('h1.mdc-card__title.mdc-card__title--large', [media.title]) : undefined
              ]
            );
          case 'supportingText':
            return h('section.mdc-card__supporting-text', [
              content.supportingText!()
            ]);
          case 'actions': {
            return h('section.mdc-card__actions', content.actions!().map(
              action => h(
                'button.mdc-button.mdc-button--compact.mdc-card__action',
                {
                  key: action,
                  'data-action': action,
                  onclick: (evt: Event) => {
                    evt.preventDefault();
                    action.onclick();
                  },
                  classes: { 'mdc-button--primary': action.primary, 'mdc-button--raised': action.raised }
                },
                [action.text]
              )
            ));
          }
          case 'key':
            return undefined;
          default:
            throw new Error(type);
        }
      })
    ]
  );
};
