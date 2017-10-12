import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { createCardTemplate } from '../src/components/card';
import { h } from 'maquette';
import { createList, ListItem } from '../src/components/list';

export let createListPage = (services: MaterialMaquetteServicesBase): Page => {
  let items: ListItem[] = [
    {
      key: 1,
      text: 'One'
    },
    {
      key: 2,
      text: 'Two'
    },
    {
      key: 3,
      text: 'Three'
    }
  ];

  let list1 = createList(services, {
    avatarList: false,
    getItems: () => items
  });

  let card1 = createCardTemplate({ elevation: 4 });

  return {
    maxWidth: 640,
    title: () => 'List',
    content: () => h('main', [
      card1.wrap({
        primary: {
          title: () => 'List'
        },
        supportingText: () => [
          list1.renderMaquette()
        ]
      })
    ])
  };
};
