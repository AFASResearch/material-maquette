import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { renderGrid, toCellClassNamesSuffix } from '../src/components/grid';
import { h } from 'maquette';
import { CardStyle, renderCard } from '../src';

export let createCardPage = (services: MaterialMaquetteServicesBase): Page => {
  let card1: CardStyle = { elevation: 4, cell: { span: 12 } };

  let card2: CardStyle = { elevation: 4, cell: { span: 4, alignTop: true } };
  let card3: CardStyle = { elevation: 4, cell: { span: 4, alignTop: true } };
  let card4: CardStyle = { elevation: 4, cell: { span: 4, alignTop: true } };
  let card5: CardStyle = { elevation: 4, cell: { span: 4, alignTop: true } };
  let card6: CardStyle = { elevation: 4, cell: { span: 4, alignTop: true } };

  return {
    maxWidth: 800,
    title: () => 'Card',
    backgroundColor: 'rgba(0,0,0,0.05)',
    content: () => renderGrid({}, [

      renderCard({
        style: card1, content: {
          primary: {
            title: 'Files changed: 4'
          },
          supportingText: () => []
        }
      }),

      renderCard({
        style: card2, content: {
          media: {
            largeTitle: 'Formatter',
            background: '#3f51b5',
            dark: true
          },
          supportingText: () => [
            h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold' }, ['0']),
            h('div', {}, ['Unformatted files'])
          ],
          actions: () => [
            {
              text: 'Fix',
              onclick: () => undefined,
              primary: true,
              raised: true
            }
          ]
        }
      }),

      renderCard({
        style: card3, content: {
          media: {
            largeTitle: 'Compiler',
            background: '#3f51b5',
            dark: true
          },
          supportingText: () => [
            h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold; color: red' }, ['20']),
            h('div', {}, ['Errors'])
          ],
          actions: () => []
        }
      }),

      renderCard({
        style: card4, content: {
          media: {
            largeTitle: 'Unit tests',
            background: '#3f51b5',
            dark: true
          },
          supportingText: () => [
            h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold; color: green' }, ['0']),
            h('div', {}, ['Failures'])
          ]
        }
      }),

      renderCard({
        style: card5, content: {
          media: {
            largeTitle: 'Linter',
            background: '#3f51b5',
            dark: true
          },
          supportingText: () => [
            h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold; color: red' }, ['3']),
            h('div', {}, ['Problems'])
          ],
          actions: () => [
            {
              text: 'Fix 2',
              onclick: () => undefined,
              primary: true,
              raised: true
            }
          ]
        }
      }),

      h(`div${toCellClassNamesSuffix({ span: 4 })}`),

      renderCard({
        style: card6, content: {
          media: {
            largeTitle: 'Coverage',
            background: '#3f51b5',
            dark: true
          },
          supportingText: () => [
            h('div', { style: 'font-size: 42px; line-height:56px; font-weight: bold; color: orange' }, ['99.9']),
            h('div', {}, ['Percent'])
          ]
        }
      })
    ])
  };
};
