import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from '@src/base/providers/i18n/i18n';
export * from '@testing-library/react';

export function customRender(component: React.ReactNode){
  const user = userEvent.setup();
  const result = render(
    <I18nProvider>
      {component}
    </I18nProvider>
  );
  return { user, ...result };
}

export function mockRoute(path: string){
  window.history.pushState({}, '', path);
}
