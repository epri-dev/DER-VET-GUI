import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: require('@/components/Home/Index').default,
    },
    {
      path: '/import-project',
      component: require('@/components/Home/ImportProject').default,
    },
    {
      path: '/wizard-overview',
      component: require('@/components/WizardOverview/Layout').default,
      children: [
        {
          path: '',
          component: require('@/components/WizardOverview/StartProject').default,
        },
        {
          path: 'start-project',
          component: require('@/components/WizardOverview/StartProject').default,
        },
        {
          path: 'technology-specs',
          component: require('@/components/WizardOverview/TechnologySpecs').default,
        },
        {
          path: 'objectives',
          component: require('@/components/WizardOverview/Objectives').default,
        },
        {
          path: 'cal-enviro-screen',
          component: require('@/components/WizardOverview/CalEnviroScreen/Layout').default,
        },
      ],
    },
    {
      path: '/wizard-model-components',
      component: require('@/components/WizardModelComponents/Layout').default,
      children: [
        {
          path: '',
          component: require('@/components/WizardModelComponents/Map').default,
        },
        {
          path: 'technology-specs-solar-pv/:solarId',
          name: 'technologySpecsSolarPV',
          component: require('@/components/WizardModelComponents/TechnologySpecsSolarPV').default,
          props: true,
        },
        {
          path: 'technology-specs-solar-pv-upload/:solarId',
          name: 'technologySpecsSolarPVUpload',
          component: require('@/components/WizardModelComponents/TechnologySpecsSolarPVUpload').default,
          props: true,
        },
        {
          path: 'technology-specs-battery/:batteryId',
          name: 'technologySpecsBattery',
          component: require('@/components/WizardModelComponents/TechnologySpecsBattery').default,
          props: true,
        },
        {
          path: 'technology-specs-battery-cycle/:batteryId',
          name: 'technologySpecsBatteryCycle',
          component: require('@/components/WizardModelComponents/TechnologySpecsBatteryCycleLifeCurve').default,
          props: true,
        },
        {
          path: 'technology-specs-ice/:iceId',
          name: 'technologySpecsICE',
          component: require('@/components/WizardModelComponents/TechnologySpecsICE').default,
          props: true,
        },
        {
          path: 'technology-specs-diesel-gen/:dieselGenId',
          name: 'technologySpecsDieselGen',
          component: require('@/components/WizardModelComponents/TechnologySpecsDieselGen').default,
          props: true,
        },
        {
          path: 'objectives-parameters-da',
          component: require('@/components/WizardModelComponents/ObjectivesParametersDA').default,
        },
        {
          path: 'objectives-parameters-fr',
          component: require('@/components/WizardModelComponents/ObjectivesParametersFR').default,
        },
        {
          path: 'objectives-parameters-nsr',
          component: require('@/components/WizardModelComponents/ObjectivesParametersNSR').default,
        },
        {
          path: 'objectives-parameters-reliability',
          component: require('@/components/WizardModelComponents/ObjectivesParametersReliabilityTarget').default,
        },
        {
          path: 'objectives-parameters-sr',
          component: require('@/components/WizardModelComponents/ObjectivesParametersSR').default,
        },
        {
          path: 'objectives-parameters-user-defined',
          component: require('@/components/WizardModelComponents/ObjectivesParametersUserDefined').default,
        },
        {
          path: 'objectives-parameters-deferral',
          name: 'objectivesParametersDeferral',
          component: require('@/components/WizardModelComponents/ObjectivesParametersDeferral').default,
        },
        {
          path: 'objectives-parameters-site-information',
          name: 'objectivesParametersSiteInformation',
          component: require('@/components/WizardModelComponents/ObjectivesParametersSiteInformation').default,
        },
        {
          path: 'financial-inputs-retail-tariff',
          name: 'financialInputsRetailTariff',
          component: require('@/components/WizardModelComponents/FinancialInputsRetailTariff').default,
        },
        {
          path: 'financial-inputs-retail-tariff-billing-period/:billingPeriodId',
          name: 'financialInputsRetailTariffBillingPeriod',
          component: require('@/components/WizardModelComponents/FinancialInputsRetailTariffBillingPeriod').default,
          props: true,
        },
        {
          path: 'financial-inputs-retail-tariff-import',
          name: 'financialInputsRetailTariffImport',
          component: require('@/components/WizardModelComponents/FinancialInputsRetailTariffImport').default,
        },
        {
          path: 'financial-inputs',
          name: 'financialInputs',
          component: require('@/components/WizardModelComponents/FinancialInputs').default,
        },
        {
          path: 'financial-inputs-external-incentives',
          name: 'financialInputsExternalIncentives',
          component: require('@/components/WizardModelComponents/FinancialInputsExternalIncentives').default,
        },
        {
          path: 'financial-inputs-external-incentives-year/:incentiveId',
          name: 'financialInputsExternalIncentivesYear',
          component: require('@/components/WizardModelComponents/FinancialInputsExternalIncentivesYear').default,
          props: true,
        },
        {
          path: 'financial-inputs-external-incentives-import',
          name: 'financialInputsExternalIncentivesImport',
          component: require('@/components/WizardModelComponents/FinancialInputsExternalIncentivesImport').default,
        },
        {
          path: 'sensitivity-analysis',
          component: require('@/components/WizardModelComponents/SensitivityAnalysis').default,
        },
      ],
    },
    {
      path: '/wizard-run-case',
      component: require('@/components/WizardRunCase/Layout').default,
      children: [
        {
          path: '',
          name: '',
          component: require('@/components/WizardRunCase/Summary').default,
        },
        {
          path: 'summary',
          name: 'summary',
          component: require('@/components/WizardRunCase/Summary').default,
        },
        {
          path: 'run-analysis',
          name: 'runAnalysis',
          component: require('@/components/WizardRunCase/RunAnalysis').default,
        },
      ],
    },
    {
      path: '/results',
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
