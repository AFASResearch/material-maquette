import {MaquetteMDLServices} from "../src/services";
import {Page} from "../src/router";
import {createButton} from "../src/button";
import {createContent} from "../src/content";
import {h} from "maquette";
import {createGrid} from "../src/grid";
import {createCard} from "../src/card";

export let createButtonPage = (services: MaquetteMDLServices): Page => {

  let content = createContent({});

  let button1 = createButton({
    text: 'button1',
    raised: true,
    colored: true,
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