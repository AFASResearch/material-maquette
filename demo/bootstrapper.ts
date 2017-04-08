import {createRouter} from "../src/router";
import {createServices} from "../src/services";
import {createButtonPage} from "./button-page";

let services = createServices();
let router = createRouter({
  location: window.location,
  match: () => createButtonPage(services)
});

document.addEventListener('DOMContentLoaded', () => {
  let applicationElement = document.getElementById('application')!;
  services.projector.replace(applicationElement, router.renderMaquette);
});