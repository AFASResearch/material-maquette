import {MaquetteMDLServices} from "../src/services";
import {Page} from "../src/router";
import {createButton} from "../src/button";
import {createContent} from "../src/content";
import {h} from "maquette";

export let createButtonPage = (services: MaquetteMDLServices): Page => {

  let content = createContent({
    contents: [
      () => h('h1', ['Button']),

      createButton({
        text: 'button1',
        raised: true,
        colored: true,
        onClick: () => alert('You clicked button1')
      }).renderMaquette
    ]
  });

  return {
    renderMaquette: content.renderMaquette
  };
};