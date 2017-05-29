import {MaterialMaquetteServicesBase} from "../src/services";
import {Page} from "../src/router";
import {createButton} from "../src/components/button";
import {createContent} from "../src/components/content";
import {h} from "maquette";
import {createGrid} from "../src/components/grid";
import {createCard} from "../src/components/card";

export let createButtonPage = (services: MaterialMaquetteServicesBase): Page => {

  let content = createContent({ backgroundGray100: true });

  let button1 = createButton(services, {
    text: 'button1',
    raised: true,
    onClick: () => alert('You clicked button1')
  });

  let grid = createGrid({ maxWidth: 1024 });

  let card1 = createCard({ shadowDp: 4, cellColumns: 12 });

  return {
    renderPlaceholders: {
      title: () => h('div', ['Button']),
      content: () => content.wrap(() => ([
        grid.wrap(() => [
          card1.wrap({
            title: () => 'Normal buttons',
            supportingText: () => [
              button1.renderMaquette()
            ]
          })
        ])
      ]))
    }
  };
};