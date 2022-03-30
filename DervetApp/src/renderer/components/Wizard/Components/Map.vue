<template>
  <div class="container-fluid">
    <h3>Define Components</h3>
    <hr>

    <h4>Technologies</h4>
    <div class="row align-items-center" v-for="items in technologyItems">
      <div class="col-md-4 buffer-bottom" v-for="techItem in filterNonActives(items)">
        <b-button 
                  v-if="techItem.active"
                  block size="lg"
                  :to="techItem.path"
                  v-bind:class="{ 'incomplete-btn': !techItem.complete }"
                  :key="techItem.id">
          {{ techItem.name }}
        </b-button>
      </div>
    </div>
    <hr>

    <h4>Services</h4>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom" v-for="objectiveItem in objectives"  v-if="objectiveItem.active">
        <b-button block size="lg"
                  :to="objectiveItem.path"
                  v-bind:class="{ 'incomplete-btn': !objectiveItem.complete }">
          {{ objectiveItem.name }}
        </b-button>
      </div>
    </div>
    <hr>

    <h4>Financial</h4>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom" v-for="financialItem in financial"  v-if="financialItem.active">
        <b-button block size="lg"
                  :to="financialItem.path"
                  v-bind:class="{ 'incomplete-btn': !financialItem.complete }">
          {{ financialItem.name }}
        </b-button>
      </div>
    </div>
    <hr>

    <nav-buttons
      :show-left="false"
      :on-right-click="() => this.$router.push({ path: SUMMARY })"
      right-text="Done Defining Components"
    />
  </div>
</template>

<script>
  import { SUMMARY } from '@/router/constants';
  import NavButtons from '@/components/Shared/NavButtons';
  import pagesMixin from '@/mixins/pagesMixin';

  export default {
    components: { NavButtons },
    mixins: [pagesMixin],
    data() {
      return { SUMMARY };
    },
  };
</script>
