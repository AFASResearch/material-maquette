import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { renderButton } from '../src/components/button';
import { createContent } from '../src/components/content';
import { renderCard } from '../src';

export let createButtonPage = (services: MaterialMaquetteServicesBase): Page => {
  let content = createContent({ backgroundGray100: true });

  return {
    title: () => 'Button',
    content: () => content.wrap(() => ([
      renderCard({
        style: { elevation: 4 }, content: {
          primary: {
            title: 'Normal buttons'
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
        }
      })
    ]))
  };
};
