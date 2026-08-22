import { I18nProvider as PolangI18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'pt-BR', name: 'Português' },
];

type I18nProviderProps = {
  children: React.ReactNode
};

export const I18nProvider = ({ children }: I18nProviderProps) => {
  return (
    <PolangI18nProvider locales={locales}>
      {children}
    </PolangI18nProvider>
  );
};
