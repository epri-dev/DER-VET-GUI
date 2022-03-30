<template>
  <div>
    <h3>Services: Day Ahead Energy Price</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <text-input v-model="daGrowth"
                  :metadata="metadata.daGrowth"
                  :isInvalid="submitted && $v.daGrowth.$error"
                  :errorMessage="getErrorMsg('daGrowth')">
      </text-input>

      <hr>

      <time-series-upload
        :chartKey="chartKey"
        :data="tsDaPrice"
        :metadata="metadata.tsDaPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsDaPrice"
        @data="setData"
      />

      <nav-buttons
        :show-error="showSaveButtonErrorMessage()"
        :on-left-click="validatedSave"
        :on-right-click="validatedSaveContinue"
      />
    </div>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import { CollectionType } from '@/models/Project/CollectionType';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return this.getData(CollectionType.Project, Page.ObjectivesDA);
    },
  };
</script>
