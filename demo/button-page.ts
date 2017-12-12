import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { renderButton } from '../src/components/button';
import { createContent } from '../src/components/content';
import { createCardTemplate } from '../src/components/card';

export let createButtonPage = (services: MaterialMaquetteServicesBase): Page => {
  let content = createContent({ backgroundGray100: true });

  let card1 = createCardTemplate({ elevation: 4 });

  return {
    title: () => 'Button',
    content: () => content.wrap(() => ([
      card1.wrap({
        primary: {
          title: () => 'Normal buttons'
        },
        supportingText: () => [
          renderButton(services, {
            style: {
              raised: true
            },
            text: 'button1',
            onClick: () => alert('You clicked button1')
          })
        ]
      })
    ]))
  };
};
