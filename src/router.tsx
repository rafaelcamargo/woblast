import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from '@src/routes';

const HomeView = lazy(() => import('@src/home/views/home-view/home-view'));
const NewPlanView = lazy(() => import('@src/plans/views/new-plan-view/new-plan-view'));
const PlansView = lazy(() => import('@src/plans/views/plans-view/plans-view'));

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
    home: HomeView,
    'new-plan': NewPlanView,
    plans: PlansView
  }[viewName];
  return (
    <Suspense fallback={<></>}>
      { View && <View />}
    </Suspense>
  );
}
