import {createRouter} from "../src/router";
import {createServices} from "../src/services";
import {createButtonPage} from "./button-page";

let services = createServices(window);
let router = createRouter({
  projector: services.projector,
  location: window.location,
  match: () => createButtonPage(services)
});

document.addEventListener('DOMContentLoaded', () => {
  let placholderElements = document.querySelectorAll('[id^="placeholder-"]') as Object as HTMLElement[];
  let placeholders: {[placeholderId: string]: HTMLElement} = {};
  for(let element of placholderElements) {
    placeholders[element.id.substr(12)] = element;
  }
  router.start(placeholders);
});