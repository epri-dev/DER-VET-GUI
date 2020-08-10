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
      component: require('@/components/Home/PlaceholderNewProject').default,
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
          path: 'technology-specs-solar-pv',
          component: require('@/components/Wizard/TechnologySpecsSolarPV').default,
        },
        {
          path: 'technology-specs-battery-storage',
          component: require('@/components/Wizard/TechnologySpecsBatteryStorage').default,
        },
        {
          path: 'technology-specs-ice',
          component: require('@/components/Wizard/TechnologySpecsICE').default,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
