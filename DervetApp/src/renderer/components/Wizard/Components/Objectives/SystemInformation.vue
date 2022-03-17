<template>
  <div>
    <h3>Services: System Information</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <time-series-upload
        :chartKey="chartKey"
        :data="tsSystemLoad"
        :metadata="metadata.tsSystemLoad"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsSystemLoad"
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
      return this.getData(CollectionType.Project, Page.ObjectivesSystemInformation);
    },
  };
</script>
