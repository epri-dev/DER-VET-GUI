<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isActual(this.paths.WIZARD_COMPONENT_PATH) }"
                   :to="this.paths.WIZARD_COMPONENT_PATH">
        Overview
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isCurrent(`${this.paths.WIZARD_COMPONENT_PATH}/technology-specs`),
          incomplete: isCompleteOverview('technologySpecs') }"
                   :to="this.paths.TECH_SPECS_PATH">
        Technologies
      </router-link>

      <div v-for="techTag in techSpecs">
        <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                     v-for="techItem in filterNonActives(techTag.items)"
                     :to="techPath(techTag.path, techItem)"
                     :key="techItem.id"
                     v-bind:class="{
            current: isCurrent(techPath(techTag.path, techItem)),
            incomplete: !techItem.complete }">
          {{ getTechLabel(techTag.shortHand, techItem) }}
        </router-link>
      </div>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isCurrent(this.paths.OBJECTIVES_PATH),
          incomplete: isCompleteOverview('objectives') }"
                   :to="this.paths.OBJECTIVES_PATH">
        Services
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-for="objectiveItem in objectives"  v-if="objectiveItem.show"
                   v-bind:class="{ current: isCurrent(objectiveItem.path),
                   incomplete: !objectiveItem.isComplete }"
                   :to="objectiveItem.path" :key="objectiveItem.pageName">
        {{ objectiveItem.fullName }}
      </router-link>

      <div class="nav nav-sidebar sidebar-root-el text-decoration-none"
           v-bind:class="{ current: isCurrent(`${this.paths.WIZARD_COMPONENT_PATH}/financial`) }">
        Finances
      </div>

      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-for="financialItem in financial"  v-if="financialItem.show"
                   :key="financialItem.pageName" :to="financialItem.path"
                   v-bind:class="{ current: isCurrent(financialItem.path),
                   incomplete: isComplete(financialItem.pageKey, financialItem.pageName) }">
        {{ financialItem.fullName }}
      </router-link>

      <!-- <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isCurrent(this.paths.SENSITIVITY_ANALYSIS_PATH) }"
                   :to="this.paths.SENSITIVITY_ANALYSIS_PATH">
        Scenario Analysis
      </router-link> -->

    </b-nav>
  </div>
</template>


<script>
  import * as paths from '@/router/constants';
  import technologySpecsMixin from '@/mixins/technologySpecsMixin';
  import objectivesMixin from '@/mixins/objectivesMixin';
  import financeMixin from '@/mixins/financeMixin';

  export default {
    mixins: [technologySpecsMixin, objectivesMixin, financeMixin],
    data() {
      return {
        paths,
      };
    },
    methods: {
      isCompleteOverview(page) {
        return !this.$store.state.Application.pageCompleteness.overview[page];
      },
      isCurrent(path) {
        return RegExp(path).test(this.$route.path);
      },
      isActual(path) {
        return path === this.$route.path;
      },
    },
  };
</script>
