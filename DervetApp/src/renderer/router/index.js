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
      component: require('@/components/Home/ProjectImported').default,
    },
    {
      path: '/new-project',
      component: require('@/components/Home/NewProject').default,
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
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
