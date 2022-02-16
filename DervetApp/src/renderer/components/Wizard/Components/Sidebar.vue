<template>
  <div class="left-sidebar">
    <b-nav vertical>
      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{ current: isActual(this.paths.WIZARD_COMPONENT) }"
                   :to="this.paths.WIZARD_COMPONENT">
        Overview
      </router-link>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isCurrent(`${this.paths.WIZARD_COMPONENT}/technology-specs`),
          incomplete: !isPageComplete(Page.Technologies) }"
                   :to="this.paths.TECH_SPECS">
        Technologies
      </router-link>

      <div v-for="techItem in technologyItemsFlattened">
        <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                     :to="techItem.path"
                     :key="techItem.id"
                     v-if="techItem.active"
                     v-bind:class="{
                      current: isCurrent(techItem.path),
                      incomplete: !techItem.complete }">
          {{ techItem.name }}
        </router-link>
      </div>

      <router-link class="nav nav-sidebar sidebar-root-el text-decoration-none"
                   v-bind:class="{
          current: isCurrent(`${this.paths.WIZARD_COMPONENT}/objectives`),
          incomplete: !isPageComplete(Page.Objectives) }"
                   :to="this.paths.OBJECTIVES">
        Services
      </router-link>
      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-for="objectiveItem in objectives"
                   v-if="objectiveItem.active"
                   v-bind:class="{ current: isCurrent(objectiveItem.path), incomplete: !objectiveItem.complete }"
                   :to="objectiveItem.path"
                   :key="objectiveItem.page">
        {{ objectiveItem.name }}
      </router-link>

      <div class="nav nav-sidebar sidebar-root-el text-decoration-none"
           v-bind:class="{ current: isCurrent(`${this.paths.WIZARD_COMPONENT}/financial`) }">
        Finances
      </div>

      <router-link class="nav nav-sidebar sidebar-indent text-decoration-none"
                   v-for="financialItem in financial"  v-if="financialItem.active"
                   :key="financialItem.pageName" :to="financialItem.path"
                   v-bind:class="{ current: isCurrent(financialItem.path),
                   incomplete: !financialItem.complete }">
        {{ financialItem.name }}
      </router-link>

    </b-nav>
  </div>
</template>


<script>
  import * as paths from '@/router/constants';
  import pagesMixin from '@/mixins/pagesMixin';
  import Page from '@/models/Application/Page';

  export default {
    mixins: [pagesMixin],
    data() {
      return {
        paths,
        Page,
      };
    },
    methods: {
      isCurrent(path) {
        const splitPath = this.$route.path.split('/');
        let uniqueId = null;
        if (splitPath.length > 2) {
          uniqueId = splitPath.pop();
        }
        return RegExp(path).test(this.$route.path)
          || (uniqueId && RegExp(uniqueId).test(path));
      },
      isActual(path) {
        // TODO combine with isCurrent for clarity?
        return path === this.$route.path;
      },
    },
  };
</script>
