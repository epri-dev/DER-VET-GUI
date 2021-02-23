<template>
  <div class="container-fluid">
    <h3>Define your Components</h3>
    <hr>

    <h4>Technologies</h4>
    <div class="row align-items-center" v-for="tagItems in techSpecs" key:bind="tagItems.tag">
      <div class="col-md-4 buffer-bottom" v-for="techItem in filterNonActives(tagItems.items)">
        <b-button block size="lg"
                  :to="techPath(tagItems.path, techItem)"
                  v-bind:class="{ 'incomplete-btn': !techItem.complete }"
                  :key="techItem.id">
          {{getTechLabel(tagItems.shortHand, techItem)}}
        </b-button>
      </div>
    </div>
    <hr>

    <h4>Services</h4>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom" v-for="objectiveItem in objectives"  v-if="objectiveItem.show">
        <b-button block size="lg"
                  :to="objectiveItem.path"
                  v-bind:class="{ 'incomplete-btn': !objectiveItem.isComplete }">
          {{ objectiveItem.fullName }}
        </b-button>
      </div>
    </div>
    <hr>

    <h4>Financial</h4>
    <div class="row align-items-center">
      <div class="col-md-4 buffer-bottom" v-for="financialItem in financial"  v-if="financialItem.show">
        <b-button block size="lg"
                  :to="financialItem.path"
                  v-bind:class="{ 'incomplete-btn': isComplete(financialItem.pageKey, financialItem.pageName) }">
          {{ financialItem.fullName }}
        </b-button>
      </div>
    </div>

  </div>
</template>

<script>
  import technologySpecsMixin from '@/mixins/technologySpecsMixin';
  import objectivesMixin from '@/mixins/objectivesMixin';
  import financeMixin from '@/mixins/financeMixin';

  export default {
    mixins: [technologySpecsMixin, objectivesMixin, financeMixin],
    methods: {
      save() {
      },
    },
  };
</script>
