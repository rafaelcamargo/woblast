import '@src/plans/index.styl';
import { Logo } from '@src/base/components/logo/logo';
import { Topbar } from '@src/base/components/topbar/topbar';
import { ViewContainer } from '@src/base/components/view-container/view-container';
import { RetirementPlanWizard } from '@src/plans/components/retirement-plan-wizard/retirement-plan-wizard';

const PlansNew = () => {
  return (
    <>
      <Topbar rightSlot={<Logo />} />
      <ViewContainer>
        <RetirementPlanWizard />
      </ViewContainer>
    </>
  );
};

export default PlansNew;
