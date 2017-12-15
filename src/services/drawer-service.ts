import { createMdcComponentManager } from '../';
import { h, VNode, VNodeChild } from 'maquette';
import { drawer } from 'material-components-web/dist/material-components-web';
import { createSelector } from '../utilities';

export interface DrawerService {
  openDrawer(): void;
}

export interface Drawer extends DrawerService {
  renderMenuButton(): VNode;
  renderMaquette(): VNode;
}

export interface DrawerItem {
  key: object;
  icon?: string;
  selected?(): boolean;
  text(): string;
  onclick(): void;
}

export interface DrawerConfig {
  extraClasses?: string[];
  headerContent(): VNodeChild;
  items(): DrawerItem[];
}

export let createDrawerService = (deps: {}, config: DrawerConfig): Drawer => {
  let { headerContent, items, extraClasses } = config;
  let mdcComponent: any; // There may only be one

  let manager = createMdcComponentManager(drawer.MDCTemporaryDrawer);

  let handleAfterCreate = (element: Element) => {
    manager.handleAfterCreate(element);
    mdcComponent = manager.getComponent(element);
  };

  let selector = createSelector('aside.mdc-temporary-drawer', undefined, extraClasses);

  let handleMenuButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    openDrawer();
  };

  let openDrawer = () => {
    mdcComponent.open = true;
  };

  return {
    /**
     * To be rendered inside .toolbar-row > section.mdc-toolbar__section.mdc-toolbar__section--align-start
     */
    renderMenuButton: () => {
      return h('a.material-icons.mdc-toolbar__icon--menu.mm-menu-button', { href: '#', onclick: handleMenuButtonClick }, ['menu']);
    },
    renderMaquette: () => {
      return h(selector, { afterCreate: handleAfterCreate, afterRemoved: manager.handleAfterRemoved }, [
        h('nav.mdc-temporary-drawer__drawer', [
          h('header.mdc-temporary-drawer__header', [
            h('div.mdc-temporary-drawer__header-content', [headerContent()])
          ]),
          h('nav.mdc-temporary-drawer__content.mdc-list', [
            items().map((item: DrawerItem) => h('a.mdc-list-item', {
              'data-item': item,
              onclick: (evt: MouseEvent) => {
                evt.preventDefault();
                item.onclick();
                mdcComponent.open = false;
              },
              href: '#',
              classes: {
                'mdc-temporary-drawer--selected': item.selected && item.selected()
              },
              key: item.key
            }, [
                item.icon ? h('i.material-icons.mdc-list-item__start-detail', { 'aria-hidden': 'true' }, [item.icon]) : undefined,
                item.text()
              ]))
          ])
        ])
      ]);
    },
    openDrawer
  };
};
