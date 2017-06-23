import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { createButton } from '../src/components/button';
import { createContent } from '../src/components/content';
import { createCard } from '../src/components/card';

export let createButtonPage = (services: MaterialMaquetteServicesBase): Page => {

  let content = createContent({ backgroundGray100: true });

  let button1 = createButton(services, {
    text: () => 'button1',
    raised: true,
    onClick: () => alert('You clicked button1')
  });

  let card1 = createCard({ elevation: 4 });

  return {
    title: () => 'Button',
    content: () => content.wrap(() => ([
      card1.wrap({
        primary: {
          title: () => 'Normal buttons'
        },
        supportingText: () => [
          button1.renderMaquette()
        ]
      })
    ]))
  };
};
