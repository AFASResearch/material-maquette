import { h, VNode, VNodeProperties } from 'maquette';
import { MaterialMaquetteServicesBase } from '../services';
import { createSelector } from '../utilities';

export interface ListItem {
  /**
   * To make sure items do not morph
   */
  key: object | string | number;
  startIcon?: string;
  text: string;
  secondaryText?: string;
}

export interface ListStyle {
  avatarList?: boolean;
  extraClasses?: string[];
}

export interface ListConfig {
  style: ListStyle;
  items: ListItem[];
  itemEnterAnimation?(element: Element, properties?: VNodeProperties): void;
  itemExitAnimation?(element: Element, removeElement: () => void, properties?: VNodeProperties): void;
}

export let renderList = (context: MaterialMaquetteServicesBase, config: ListConfig): VNode => {
  let { items, style: { avatarList, extraClasses }, itemEnterAnimation, itemExitAnimation } = config;

  let renderItem = (item: ListItem) => {
    return h('li.mdc-list-item', { key: item.key, enterAnimation: itemEnterAnimation, exitAnimation: itemExitAnimation }, [
      item.startIcon ? h('span.mdc-list-item__start-detail.gray-bg', [
        h('i.material-icons', { 'aria-hidden': 'true' }, [item.startIcon])
      ]) : undefined,
      h('span.mdc-list-item__text', [
        item.text,
        item.secondaryText ? h('span.mdc-list-item__text__secondary', [item.secondaryText]) : undefined
      ])
    ]);
  };

  let selector = createSelector('ul.mdc-list', { 'mdc-list--avatar-list': avatarList === true }, extraClasses);
  return h(selector, items.map(renderItem));
};
