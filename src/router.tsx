import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from '@src/routes';

const HomeView = lazy(() => import('@src/home/views/home-view'));

export const Router = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
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

function getViewComponentByViewName(viewName: string) {
  const View = {
    home: HomeView
  }[viewName];
  return (
    <Suspense fallback={<></>}>
      { View && <View />}
    </Suspense>
  );
}
