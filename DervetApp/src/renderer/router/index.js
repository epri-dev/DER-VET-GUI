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
          path: 'technology-specs-battery-storage',
          component: require('@/components/Wizard/TechnologySpecsBatteryStorage').default,
        },
        {
          path: 'technology-specs-ice/:iceId',
          name: 'technologySpecsICE',
          component: require('@/components/Wizard/TechnologySpecsICE').default,
          props: true,
        },
        {
          path: 'financial-inputs',
          name: 'financialInputs',
          component: require('@/components/Wizard/FinancialInputs').default,
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
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
