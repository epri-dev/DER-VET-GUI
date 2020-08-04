import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'newProject',
    //   component: require('@/components/Home/NewProject').default,
    // },
    {
      path: '/',
      name: 'StartProject',
      component: require('@/components/Wizard/StartProject').default,
    },
    {
      path: '/landing',
      name: 'landingPage',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
