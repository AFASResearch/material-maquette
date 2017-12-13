import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { h } from 'maquette';
import { createList, ListItem } from '../src/components/list';
import { renderCard } from '../src';

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

  return {
    maxWidth: 640,
    title: () => 'List',
    content: () => h('main', [
      renderCard({
        style: { elevation: 4 },
        content: {
          primary: {
            title: 'List'
          },
          supportingText: () => [
            list1.renderMaquette()
          ]
        }
      })
    ])
  };
};
