import { createRouter, Page } from '../src/router';
import { createAllServices } from '../src/services';
import { createButtonPage } from './button-page';
import { createDialogPage } from './dialog-page';
import { createTextfieldPage } from './textfield-page';
import { createListPage } from './list-page';
import { createDrawer, DrawerItem } from '../src/components/drawer';
import { createCardPage } from './card-page';

interface SitemapEntry {
  title: string;
  icon?: string;
  url: string;
  page: Page;
}

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

let router = createRouter(services, {
  projector: services.projector,
  document: window.document,
  match: (url: string) => {
    let entries = sitemap.filter(entry => entry.url === url);
    if (entries.length === 1) {
      return entries[0].page;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {

  let drawerItems: DrawerItem[] = sitemap.map(entry => ({
    key: entry,
    selected: () => router.getCurrentPage() === entry.page,
    icon: entry.icon,
    text: () => entry.title,
    onclick: () => {
      router.navigate(entry.url);
    }
  }));
  let drawer = createDrawer(services, {
    headerContent: () => 'Material Maquette Demo',
    items: () => drawerItems
  });
  services.projector.append(document.body, drawer.renderMaquette);
  services.projector.replace(document.querySelector('#menu-button')!, drawer.renderMenuButton);

  router.start({
    titleElement: document.querySelector('#placeholder-title')!,
    contentElement: document.querySelector('#placeholder-content')!
  });
});
