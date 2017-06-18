import { h, VNode, VNodeChildren } from 'maquette';
import { CellConfig, toCellClassNamesSuffix } from './grid';
import { createSelector } from '../utilities';

export interface CardConfig {
  cell?: CellConfig;
  elevation?: number;
  dark?: true;
}

export interface CardMedia {
  largeTitle?: () => string;
  title?: () => string;
  dark?: true;
  extraClasses?: string[];
  /**
   * For convenience
   */
  background?: string;
}

export interface CardPrimary {
  title: () => string;
  subtitle?: () => string;
}

export interface CardAction {
  text: () => string;
  onclick: () => void;
}

/**
 * NOTE: the order of the keys will determine the order of the parts
 */
export interface CardContent {
  primary?: CardPrimary;
  media?: CardMedia;
  supportingText?: () => VNodeChildren;
  actions?: () => CardAction[];
}

// NOTE: Not yet implemented all content types fully

export let createCard = (config: CardConfig) => {
  let { cell, elevation, dark } = config;

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

  return {
    wrap: (content: CardContent): VNode => h(
      vnodeSelector, [
        Object.keys(content).map(type => {
          switch (type) {
            case 'primary':
              return h('section.mdc-card__primary', [
                h('h1', [content.primary!.title()])
              ]);
            case 'media':
              let media = content.media!;
              let selector = createSelector('section.mdc-card__media', undefined, media.extraClasses);
              return h(selector,
                {
                  styles: { background: media.background },
                  classes: { 'mdc-card--theme-dark': media.dark }
                }, [
                  media.largeTitle ? h('h1.mdc-card__title.mdc-card__title--large', [media.largeTitle()]) : undefined,
                  media.title ? h('h1.mdc-card__title.mdc-card__title--large', [media.title()]) : undefined
                ]
              );
            case 'supportingText':
              return h('section.mdc-card__supporting-text', [
                content.supportingText!()
              ]);
            case 'actions': {
              return h('section.mdc-card__actions', content.actions!().map(
                action => h(
                  'button.mdc-button.mdc-button--compact.mdc-card__action.mdc-button--raised.mdc-button--primary',
                  { onclick: action.onclick },
                  [action.text()]
                ) // FIX: preventDefault
              ));
            }
            default:
              throw new Error(type);
          }
        })
      ]
    )
  };
};
