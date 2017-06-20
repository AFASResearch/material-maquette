import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { createCard } from '../src/components/card';
import { createGrid, toCellClassNamesSuffix } from '../src/components/grid';
import { h } from 'maquette';

export let createCardPage = (services: MaterialMaquetteServicesBase): Page => {

  let row1 = createGrid({});

  let card1 = createCard({ elevation: 4, cell: { span: 12 } });

  let card2 = createCard({ elevation: 4, cell: { span: 4, alignTop: true } });
  let card3 = createCard({ elevation: 4, cell: { span: 4, alignTop: true } });
  let card4 = createCard({ elevation: 4, cell: { span: 4, alignTop: true } });
  let card5 = createCard({ elevation: 4, cell: { span: 4, alignTop: true } });
  let card6 = createCard({ elevation: 4, cell: { span: 4, alignTop: true } });

  return {
    maxWidth: 800,
    title: () => 'Card',
    backgroundColor: 'rgba(0,0,0,0.05)',
    content: () => row1.wrap(() => ([

      card1.wrap({
        primary: {
          title: () => 'Files changed: 4'
        },
        supportingText: () => []
      }),

      card2.wrap({
        media: {
          largeTitle: () => 'Formatter',
          background: '#3f51b5',
          dark: true
        },
        supportingText: () => [
          h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold' }, ['0']),
          h('div', {}, ['Unformatted files'])
        ],
        actions: () => [
          {
            text: () => 'Fix',
            onclick: () => undefined,
            primary: true,
            raised: true
          }
        ]
      }),

      card3.wrap({
        media: {
          largeTitle: () => 'Compiler',
          background: '#3f51b5',
          dark: true
        },
        supportingText: () => [
          h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold; color: red' }, ['20']),
          h('div', {}, ['Errors'])
        ],
        actions: () => []
      }),

      card4.wrap({
        media: {
          largeTitle: () => 'Unit tests',
          background: '#3f51b5',
          dark: true
        },
        supportingText: () => [
          h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold; color: green' }, ['0']),
          h('div', {}, ['Failures'])
        ]
      }),

      card5.wrap({
        media: {
          largeTitle: () => 'Linter',
          background: '#3f51b5',
          dark: true
        },
        supportingText: () => [
          h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold; color: red' }, ['3']),
          h('div', {}, ['Problems'])
        ],
        actions: () => [
          {
            text: () => 'Fix 2',
            onclick: () => undefined,
            primary: true,
            raised: true
          }
        ]
      }),

      h(`div${toCellClassNamesSuffix({ span: 4 })}`),

      card6.wrap({
        media: {
          largeTitle: () => 'Coverage',
          background: '#3f51b5',
          dark: true
        },
        supportingText: () => [
          h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold; color: orange' }, ['99.9']),
          h('div', {}, ['Percent'])
        ]
      })
    ]))
  };
};
