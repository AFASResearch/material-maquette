import {MaterialMaquetteServicesBase} from "../src/services";
import {Page} from "../src/router";
import {createCard} from "../src/components/card";
import {createGrid} from "../src/components/grid";

export let createCardPage = (services: MaterialMaquetteServicesBase): Page => {

  let grid = createGrid({});

  let card1 = createCard({ shadowDp: 4, cellColumns: 12 });

  return {
    maxWidth: 1024,
    title: () => 'Card',
    backgroundColor: 'rgba(0,0,0,0.05)',
    content: () => grid.wrap(() => ([
      card1.wrap({
        primary: {
          title: () => 'Full width'
        },
        supportingText: {
          content: () => []
        }
      })
    ]))
  };
};
