import {createRouter} from "../src/router";
import {createAllServices} from "../src/services";
import {createButtonPage} from "./button-page";
import { createDialogPage } from './dialog-page';

let services = createAllServices(window);

let router = createRouter(services, {
  projector: services.projector,
  document: window.document,
  match: (url: string) => {
    switch (url) {
      case '/button':
        return  createButtonPage(services);
      case '/dialog':
        return  createDialogPage(services);
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  router.start({
    titleElement: document.querySelector('#placeholder-title')!,
    contentElement: document.querySelector('#placeholder-content')!
  });
});
