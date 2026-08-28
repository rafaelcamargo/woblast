import '@src/plans/index.styl';
import { Logo } from '@src/base/components/logo/logo';
import { Topbar } from '@src/base/components/topbar/topbar';
import { ViewContainer } from '@src/base/components/view-container/view-container';
import { PlanRetirementWizard } from '@src/plans/components/plan-retirement-wizard/plan-retirement-wizard';

const PlansNewView = () => {
  return (
    <>
      <Topbar rightSlot={<Logo />} />
      <ViewContainer>
        <PlanRetirementWizard />
      </ViewContainer>
    </>
  );
};

export default PlansNewView;
