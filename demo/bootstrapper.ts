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
  let placholderElements = document.querySelectorAll('[id^="placeholder-"]') as Object as HTMLElement[];
  let placeholders: {[placeholderId: string]: HTMLElement} = {};
  for(let element of placholderElements) {
    placeholders[element.id.substr(12)] = element;
  }
  router.start(placeholders);
});