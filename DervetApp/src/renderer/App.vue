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
  import isEmpty from 'lodash/isEmpty';
  import TopNavBar from '@/components/Shared/TopNavBar';

  export default {
    components: { TopNavBar },
    name: 'DER-VET',
    beforeMount() {
      if (this.$store.state.CalEnviroScreen.cesScores === null) {
        this.$store.dispatch('loadCesScores');
      }
      if (isEmpty(this.$store.state.OpenEI.utilities)) {
        this.$store.dispatch('loadUtilities', this.$store.state.OpenEI.apiKey)
          .catch(() => null);
      }
    },
  };
</script>
