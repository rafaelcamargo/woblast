import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from '@src/routes';
import useCustomHistoryModule from '@src/base/hooks/use-custom-history';

const HomeView = lazy(() => import('@src/home/views/home-view/home-view'));
const PlansViews = lazy(() => import('@src/plans'));

export const Router = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <CustomHistory />
      <Routes>
        {routes.map(({ path, name }) => (
          <Route
            path={path}
            element={getViewComponentByViewName(name)}
            key={name}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

function CustomHistory() {
  useCustomHistoryModule.useCustomHistory();
  return null;
}

function getViewComponentByViewName(viewName: string) {
  const View = {
    home: HomeView,
    plans: PlansViews
  }[viewName];
  return (
    <Suspense fallback={<></>}>
      { View && <View />}
    </Suspense>
  );
}
