import { h } from 'maquette';
import { ListItem, MaterialMaquetteServicesBase, Page, renderCard, renderList } from '../src';

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

  return {
    maxWidth: 640,
    renderTitle: () => 'List',
    renderContent: () => h('main', [
      renderCard({
        style: { elevation: 4 },
        content: {
          primary: {
            title: 'List'
          },
          supportingText: () => [
            renderList(services, {
              style: { avatarList: false },
              items: items
            })
          ]
        }
      })
    ])
  };
};
