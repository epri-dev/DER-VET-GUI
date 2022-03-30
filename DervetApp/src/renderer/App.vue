<template>
  <div id="app">
    <!-- TODO replace with vue-fontawesome plugin -->
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
    <top-nav-bar></top-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import _ from 'lodash';

  import isEmpty from 'lodash/isEmpty';
  import TopNavBar from '@/components/Shared/TopNavBar';

  import * as a from '@/store/actionTypes';

  export default {
    components: { TopNavBar },
    name: 'DER-VET',
    beforeMount() {
      if (this.$store.state.CalEnviroScreen.cesScores === null) {
        this.$store.dispatch('loadCesScores');
      }
      if (isEmpty(this.$store.state.OpenEI.utilities)) {
        this.$store.dispatch(`OpenEI/${a.LOAD_UTILITIES}`, this.$store.state.OpenEI.apiKey)
          .catch(() => null);
      }
      this.$store.subscribeAction({
        after: (action) => {
          const triggerValidation = _.includes(a.ACTIONS_THAT_TRIGGER_VALIDATION, action.type);
          if (triggerValidation) {
            // Trigger reset values to default
            this.$store.dispatch(a.RESET_VALUES_TO_DEFAULT);
            this.$store.dispatch(a.VALIDATE_PROJECT_AND_SET_ERRORS);
          }
        },
      });
    },
  };
</script>
