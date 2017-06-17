import { Component, h, VNodeProperties } from 'maquette';
import { MaterialMaquetteServicesBase } from '../services';
import {createSelector} from "../utilities";

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
  itemEnterAnimation?: (element: Element, properties?: VNodeProperties) => void;
  itemExitAnimation?: (element: Element, removeElement: () => void, properties?: VNodeProperties) => void;
}

export let createList = (context: MaterialMaquetteServicesBase, config: ListConfig): Component => {
  let { getItems, avatarList, itemEnterAnimation, itemExitAnimation } = config;

  let renderItem = (item: ListItem) => {
    return h('li.mdc-list-item', { key: item.key, enterAnimation: itemEnterAnimation, exitAnimation: itemExitAnimation }, [
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
