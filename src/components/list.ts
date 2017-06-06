import { Component, h, VNodeProperties } from 'maquette';
import { MaterialMaquetteServicesBase } from '../services';

export interface ListItem {
  /**
   * To make sure items do not morph
   */
  key: Object;
  startIcon?: string;
  text: string;
}

export interface ListConfig {
  avatarList?: boolean;
  extraClasses?: string[];
  getItems(): ListItem[];
  itemEnterAnimation: (element: Element, properties?: VNodeProperties) => void;
}

let createSelector = (base: string, configured: { [className: string]: boolean }, extraClasses?: string[]) => {
  let result = base;
  let addClass = (className: string) => {
    result += `.${className}`;
  };
  Object.keys(configured).forEach(className => {
    if (configured[className]) {
      addClass(className);
    }
    if (extraClasses) {
      extraClasses.forEach(addClass);
    }
  });
  return result;
};

export let createList = (context: MaterialMaquetteServicesBase, config: ListConfig): Component => {
  let { getItems, avatarList, itemEnterAnimation } = config;

  let renderItem = (item: ListItem) => {
    return h('li.mdc-list-item', { key: item.key, itemEnterAnimation }, [
      item.startIcon ? h('span.mdc-list-item__start-detail.gray-bg', [
        h('i.material-icons', { 'aria-hidden': 'true' }, [item.startIcon])
      ]) : undefined,
      h('span.mdc-list-item__text', [item.text])
    ]);
  };

  let selector = createSelector('ul.mdc-list', { 'mdc-list--avatar-list': !!avatarList }, config.extraClasses);
  return {
    renderMaquette: () => {
      return h(selector, getItems().map(renderItem));
    }
  };
};
