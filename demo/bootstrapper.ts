import { createAllServices } from '../src/services';
import { createButtonPage } from './button-page';
import { createDialogPage } from './dialog-page';
import { createTextfieldPage } from './textfield-page';
import { createListPage } from './list-page';
import { createCardPage } from './card-page';
import { installErrorHandler } from '../src/utilities/error-handler';
import { Page } from '../src';
import { createDrawerService, DrawerItem } from '../src/services/drawer-service';

interface SitemapEntry {
  title: string;
  icon?: string;
  url: string;
  page: Page;
}

installErrorHandler(window);

let services = createAllServices(window);

let sitemap: SitemapEntry[] = [
  {
    title: 'Button',
    url: '/button',
    page: createButtonPage(services)
  },
  {
    title: 'Card',
    url: '/card',
    page: createCardPage(services)
  },
  {
    title: 'Dialog',
    url: '/dialog',
    page: createDialogPage(services)
  },
  {
    title: 'List',
    url: '/list',
    page: createListPage(services)
  },
  {
    title: 'Textfield',
    url: '/textfield',
    page: createTextfieldPage(services)
  }
];

services.routerService.start({
  match: (url: string) => {
    let entries = sitemap.filter(entry => entry.url === url);
    if (entries.length === 1) {
      return entries[0].page;
    }
  }
});

let drawerItems: DrawerItem[] = sitemap.map(entry => ({
  key: entry,
  selected: () => services.routerService.getCurrentPage() === entry.page,
  icon: entry.icon,
  text: () => entry.title,
  onclick: () => {
    services.routerService.navigate(entry.url);
  }
}));
let drawer = createDrawerService(services, {
  headerContent: () => 'Material Maquette Demo',
  items: () => drawerItems
});

document.addEventListener('DOMContentLoaded', () => {
  /* tslint:disable no-inner-html */
  services.projector.append(document.body, drawer.renderMaquette);
  services.projector.replace(document.querySelector('#menu-button')!, drawer.renderMenuButton);
  let titleElement = document.querySelector('#placeholder-title')!;
  titleElement.innerHTML = '';
  services.projector.merge(titleElement, services.routerService.renderTitle);
  let contentElement = document.querySelector('#placeholder-content')!;
  contentElement.innerHTML = '';
  services.projector.merge(contentElement, services.routerService.renderContent);
  /* tslint:enable no-inner-html */
});
