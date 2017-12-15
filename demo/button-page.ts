import { MaterialMaquetteServicesBase } from '../src/services';
import { Page, renderButton, renderCard, renderContent } from '../src';

export let createButtonPage = (services: MaterialMaquetteServicesBase): Page => {
  return {
    renderTitle: () => 'Button',
    renderContent: () => renderContent({ backgroundGray100: true }, [
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
    ])
  };
};
