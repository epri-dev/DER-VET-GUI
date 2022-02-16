<template>
  <div class="left-sidebar">
    <b-nav vertical>

      <div v-for="overviewItem in overviewPages">
        <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                     v-bind:class="{
            current: isActive(overviewItem.path),
            incomplete: !overviewItem.complete }"
                     :to="overviewItem.path">
          {{overviewItem.name}}
        </router-link>
      </div>

      <!--  descripe page and what you do here: use full name California Communities Environmental Health Screening Tool (for california users only) -->
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isActive(CAL_ENVIRO_SCREEN) }"
                   :to="CAL_ENVIRO_SCREEN">
        CalEnviroScreen
      </router-link>
    </b-nav>
  </div>
</template>


<script>
  import { CAL_ENVIRO_SCREEN } from '@/router/constants';
  import pagesMixin from '@/mixins/pagesMixin';

  export default {
    mixins: [pagesMixin],
    data() {
      return { CAL_ENVIRO_SCREEN };
    },
    methods: {
      // TODO consolidate in mixin (separate sidebar mixin?)
      isActive(path) {
        return path === this.$route.path;
      },
    },
  };
</script>
