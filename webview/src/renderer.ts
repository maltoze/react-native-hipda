import { render as litRender, TemplateResult } from 'lit-html';

const render = (template: (_data: []) => TemplateResult) => {
  const appContainer = document.getElementById('root') as HTMLElement;
  const getBootstrapData = () =>
    JSON.parse(appContainer?.getAttribute('data-bootstrap') ?? '[]');

  const render_ = () => litRender(template(getBootstrapData()), appContainer);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.attributeName === 'data-bootstrap' && render_();
    });
  });
  observer.observe(appContainer, { attributeFilter: ['data-bootstrap'] });

  render_();
};

export default render;
