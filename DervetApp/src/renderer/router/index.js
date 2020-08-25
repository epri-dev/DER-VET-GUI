import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/Home/Index').default,
    },
    {
      path: '/new-project',
      component: require('@/components/Home/NewProject').default,
    },
    {
      path: '/import-project',
      component: require('@/components/Home/ImportProject').default,
    },
    {
      path: '/wizard',
      component: require('@/components/Wizard/Layout').default,
      children: [
        {
          path: '',
          component: require('@/components/Wizard/StartProject').default,
        },
        {
          path: 'start-project',
          component: require('@/components/Wizard/StartProject').default,
        },
        {
          path: 'technology-specs',
          component: require('@/components/Wizard/TechnologySpecs').default,
        },
        {
          path: 'technology-specs-solar-pv/:solarId',
          name: 'technologySpecsSolarPV',
          component: require('@/components/Wizard/TechnologySpecsSolarPV').default,
          props: true,
        },
        {
          path: 'technology-specs-solar-pv-upload/:solarId',
          name: 'technologySpecsSolarPVUpload',
          component: require('@/components/Wizard/TechnologySpecsSolarPVUpload').default,
          props: true,
        },
        {
          path: 'technology-specs-battery/:batteryId',
          name: 'technologySpecsBattery',
          component: require('@/components/Wizard/TechnologySpecsBattery').default,
          props: true,
        },
        {
          path: 'technology-specs-ice/:iceId',
          name: 'technologySpecsICE',
          component: require('@/components/Wizard/TechnologySpecsICE').default,
          props: true,
        },
        {
          path: 'financial-inputs-retail-tariff',
          name: 'financialInputsRetailTariff',
          component: require('@/components/Wizard/FinancialInputsRetailTariff').default,
        },
        {
          path: 'financial-inputs-retail-tariff-billing-period',
          name: 'financialInputsRetailTariffBillingPeriod',
          component: require('@/components/Wizard/FinancialInputsRetailTariffBillingPeriod').default,
        },
        {
          path: 'financial-inputs-retail-tariff-import',
          name: 'financialInputsRetailTariffImport',
          component: require('@/components/Wizard/FinancialInputsRetailTariffImport').default,
        },
        {
          path: 'objectives-parameters-deferral',
          name: 'objectivesParametersDeferral',
          component: require('@/components/Wizard/ObjectivesParametersDeferral').default,
        },
        {
          path: 'objectives-parameters-site-information',
          name: 'objectivesParametersSiteInformation',
          component: require('@/components/Wizard/ObjectivesParametersSiteInformation').default,
        },
        {
          path: 'objectives',
          component: require('@/components/Wizard/Objectives').default,
        },
        {
          path: 'objectives-parameters-da',
          component: require('@/components/Wizard/ObjectivesParametersDA').default,
        },
        {
          path: 'objectives-parameters-fr',
          component: require('@/components/Wizard/ObjectivesParametersFR').default,
        },
        {
          path: 'objectives-parameters-nsr',
          component: require('@/components/Wizard/ObjectivesParametersNSR').default,
        },
        {
          path: 'objectives-parameters-reliability',
          component: require('@/components/Wizard/ObjectivesParametersReliabilityTarget').default,
        },
        {
          path: 'objectives-parameters-sr',
          component: require('@/components/Wizard/ObjectivesParametersSR').default,
        },
        {
          path: 'objectives-parameters-user-defined',
          component: require('@/components/Wizard/ObjectivesParametersUserDefined').default,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
