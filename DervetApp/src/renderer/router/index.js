import Vue from 'vue';
import Router from 'vue-router';

import * as c from '@/router/constants';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: c.INDEX,
      component: require('@/components/Home/Index').default,
    },
    {
      path: '/import-project',
      component: require('@/components/Home/ImportProject').default,
    },
    {
      path: '/about',
      component: require('@/components/Home/About').default,
    },
    {
      path: c.WIZARD_OVERVIEW,
      component: require('@/components/Wizard/Overview/Layout').default,
      children: [
        {
          path: '',
          redirect: 'project-configuration',
          component: require('@/components/Wizard/Overview/ProjectConfiguration').default,
        },
        {
          path: 'project-configuration',
          component: require('@/components/Wizard/Overview/ProjectConfiguration').default,
        },
        {
          path: 'technology-specs',
          component: require('@/components/Wizard/Overview/TechnologySpecs').default,
        },
        {
          path: 'objectives',
          component: require('@/components/Wizard/Overview/Objectives').default,
        },
        {
          path: 'cal-enviro-screen',
          component: require('@/components/Wizard/Overview/CalEnviroScreen/Layout').default,
        },
      ],
    },
    {
      path: c.WIZARD_COMPONENT,
      component: require('@/components/Wizard/Components/Layout').default,
      children: [
        {
          path: '',
          component: require('@/components/Wizard/Components/Map').default,
        },
        {
          path: 'technology-specs-solar-pv/:id',
          name: 'technologySpecsSolarPV',
          component: require('@/components/Wizard/Components/Technologies/SolarPV').default,
          props: true,
        },
        {
          path: 'technology-specs-battery/:id',
          name: 'technologySpecsBattery',
          component: require('@/components/Wizard/Components/Technologies/Battery').default,
          props: true,
        },
        {
          path: 'technology-specs-ice/:id',
          name: 'technologySpecsICE',
          component: require('@/components/Wizard/Components/Technologies/ICE').default,
          props: true,
        },
        {
          path: 'technology-specs-diesel-gen/:id',
          name: 'technologySpecsDieselGen',
          component: require('@/components/Wizard/Components/Technologies/DieselGen').default,
          props: true,
        },
        {
          path: 'technology-specs-controllable-load/:id',
          name: 'technologySpecsControllableLoad',
          component: require('@/components/Wizard/Components/Technologies/ControllableLoad').default,
          props: true,
        },
        {
          path: 'technology-specs-single-ev/:id',
          name: 'technologySpecsSingleEV',
          component: require('@/components/Wizard/Components/Technologies/SingleEV').default,
          props: true,
        },
        {
          path: 'technology-specs-fleet-ev/:id',
          name: 'technologySpecsFleetEV',
          component: require('@/components/Wizard/Components/Technologies/FleetEV').default,
          props: true,
        },
        {
          path: 'objectives-parameters-backup',
          component: require('@/components/Wizard/Components/Objectives/Backup').default,
        },
        {
          path: 'objectives-parameters-da',
          component: require('@/components/Wizard/Components/Objectives/DA').default,
        },
        {
          path: 'objectives-parameters-dr',
          component: require('@/components/Wizard/Components/Objectives/DR').default,
        },
        {
          path: 'objectives-parameters-fr',
          component: require('@/components/Wizard/Components/Objectives/FR').default,
        },
        {
          path: 'objectives-parameters-lf',
          component: require('@/components/Wizard/Components/Objectives/LF').default,
        },
        {
          path: 'objectives-parameters-nsr',
          component: require('@/components/Wizard/Components/Objectives/NSR').default,
        },
        {
          path: 'objectives-parameters-ra',
          component: require('@/components/Wizard/Components/Objectives/RA').default,
        },
        {
          path: 'objectives-parameters-reliability',
          component: require('@/components/Wizard/Components/Objectives/ReliabilityTarget').default,
        },
        {
          path: 'objectives-parameters-sr',
          component: require('@/components/Wizard/Components/Objectives/SR').default,
        },
        {
          path: 'objectives-parameters-user-defined',
          component: require('@/components/Wizard/Components/Objectives/UserDefined').default,
        },
        {
          path: 'objectives-parameters-deferral',
          name: 'objectivesParametersDeferral',
          component: require('@/components/Wizard/Components/Objectives/Deferral').default,
        },
        {
          path: 'objectives-parameters-site-information',
          name: 'objectivesParametersSiteInformation',
          component: require('@/components/Wizard/Components/Objectives/SiteInformation').default,
        },
        {
          path: 'objectives-parameters-system-information',
          name: 'objectivesParametersSystemInformation',
          component: require('@/components/Wizard/Components/Objectives/SystemInformation').default,
        },
        {
          path: 'financial-inputs-fuel-costs',
          name: 'financialInputsFuelCosts',
          component: require('@/components/Wizard/Components/Financial/FuelCosts').default,
        },
        {
          path: 'financial-inputs-retail-tariff',
          name: 'financialInputsRetailTariff',
          component: require('@/components/Wizard/Components/Financial/RetailTariff/Main').default,
        },
        {
          path: 'financial-inputs-retail-tariff-billing-period/:id',
          name: 'financialInputsRetailTariffBillingPeriod',
          component: require('@/components/Wizard/Components/Financial/RetailTariff/AddBillingPeriod').default,
          props: true,
        },
        {
          path: 'financial-inputs-retail-tariff-import',
          name: 'financialInputsRetailTariffImport',
          component: require('@/components/Wizard/Components/Financial/RetailTariff/Import').default,
        },
        {
          path: 'financial-inputs-retail-tariff-open-ei',
          name: 'financialInputsRetailTariffOpenEI',
          component: require('@/components/Wizard/Components/Financial/RetailTariff/OpenEI/Layout').default,
        },
        {
          path: 'financial-inputs-miscellaneous',
          name: 'financialInputsMiscellaneous',
          component: require('@/components/Wizard/Components/Financial/Miscellaneous').default,
        },
        {
          path: 'financial-inputs-external-incentives',
          name: 'financialInputsExternalIncentives',
          component: require('@/components/Wizard/Components/Financial/ExternalIncentives/Main').default,
        },
        {
          path: 'financial-inputs-external-incentives-year/:id',
          name: 'financialInputsExternalIncentivesYear',
          component: require('@/components/Wizard/Components/Financial/ExternalIncentives/AddYear').default,
          props: true,
        },
        {
          path: 'financial-inputs-external-incentives-import',
          name: 'financialInputsExternalIncentivesImport',
          component: require('@/components/Wizard/Components/Financial/ExternalIncentives/Import').default,
        },
      ],
    },
    {
      path: c.WIZARD_RUN_CASE,
      component: require('@/components/Wizard/Run/Layout').default,
      children: [
        {
          path: '',
          name: '',
          component: require('@/components/Wizard/Run/Summary').default,
        },
        {
          path: 'summary',
          name: 'summary',
          component: require('@/components/Wizard/Run/Summary').default,
        },
        {
          path: 'run-analysis',
          name: 'runAnalysis',
          component: require('@/components/Wizard/Run/RunAnalysis').default,
        },
      ],
    },
    {
      path: c.RESULTS,
      component: require('@/components/Results/Layout').default,
      children: [
        {
          path: '',
          component: require('@/components/Results/Summary').default,
        },
        {
          path: 'design',
          component: require('@/components/Results/Design').default,
        },
        {
          path: 'reliability',
          name: 'resultsReliability',
          component: require('@/components/Results/Reliability').default,
        },
        {
          path: 'deferral',
          name: 'resultsDeferral',
          component: require('@/components/Results/Deferral').default,
        },
        {
          path: 'financial',
          component: require('@/components/Results/Financial').default,
        },
        {
          path: 'dispatch',
          name: 'resultsDispatch',
          component: require('@/components/Results/Dispatch').default,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
