import { createRouter } from '../src/router';
import { createAllServices } from '../src/services';
import { createButtonPage } from './button-page';
import { createDialogPage } from './dialog-page';
import { createTextfieldPage } from './textfield-page';
import { createListPage } from "./list-page";

let services = createAllServices(window);

let router = createRouter(services, {
  projector: services.projector,
  document: window.document,
  match: (url: string) => {
    switch (url) {
      case '/button':
        return createButtonPage(services);
      case '/dialog':
        return createDialogPage(services);
      case '/textfield':
        return createTextfieldPage(services);
      case '/list':
        return createListPage(services);
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  router.start({
    titleElement: document.querySelector('#placeholder-title')!,
    contentElement: document.querySelector('#placeholder-content')!
  });
});
