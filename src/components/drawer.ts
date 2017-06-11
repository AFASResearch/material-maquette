import { h, VNodeChild } from 'maquette';
import { MaterialMaquetteServicesBase } from "../services";
import { drawer } from "material-components-web/dist/material-components-web";

export interface DrawerItem {
  key: object;
  selected?(): boolean;
  icon?: string;
  text(): string;
  onclick(): void;
}

export interface DrawerConfig {
  headerContent(): VNodeChild;
  items(): DrawerItem[];
}

export let createDrawer = (context: MaterialMaquetteServicesBase, config: DrawerConfig) => {
  let { mdcService } = context;
  let { headerContent, items } = config;

  let enhancer = mdcService.createEnhancer(drawer.MDCTemporaryDrawer);

  let handleMenuButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    openDrawer();
  };

  let openDrawer = () => {
    enhancer.getComponent().open = true;
  };

  let handleItemClick = (evt: MouseEvent) => {
    evt.preventDefault();
    let item: DrawerItem = (evt.target as any)['data-item'];
    item.onclick();
    enhancer.getComponent().open = false;
  };

  return {
    /**
     * To be rendered inside .toolbar-row > section.mdc-toolbar__section.mdc-toolbar__section--align-start
     */
    renderMenuButton: () => {
      return h('a.material-icons.mdc-toolbar__icon--menu.mm-menu-button', { href: '#', onclick: openDrawer }, ['menu']);
    },
    renderMaquette: () => {
      return h('aside.mdc-temporary-drawer', { afterCreate: enhancer.handleCreate, afterUpdate: enhancer.handleUpdate }, [
        h('nav.mdc-temporary-drawer__drawer', [
          h('header.mdc-temporary-drawer__header', [
            h('div.mdc-temporary-drawer__header-content', headerContent())
          ]),
          h('nav.mdc-temporary-drawer__content.mdc-list', [
            items().map(item => h('a.mdc-list-item', {
              'data-item': item,
              onclick: handleItemClick,
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
      ])
    },
    openDrawer
  }
};
