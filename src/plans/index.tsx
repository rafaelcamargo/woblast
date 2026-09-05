import '@src/plans/index.styl';
import { Route, Routes } from 'react-router-dom';
import routes from '@src/plans/routes';
import NewPlanView from '@src/plans/views/new-plan-view/new-plan-view';
import PlanDetailsView from '@src/plans/views/plan-details-view/plan-details-view';
import PlansView from '@src/plans/views/plans-view/plans-view';

type ViewName = 'new-plan' | 'plan-details' | 'plans';

const PlansViews = () => {
  return (
    <Routes>
      {routes.map(({ path, name }) => (
        <Route
          path={path}
          element={getViewComponentByViewName(name as ViewName)}
          key={name}
        />
      ))}
    </Routes>
  );
};

function getViewComponentByViewName(viewName: ViewName) {
  const View = {
    'new-plan': NewPlanView,
    'plan-details': PlanDetailsView,
    plans: PlansView
  }[viewName];
  return <View />;
}

export default PlansViews;
