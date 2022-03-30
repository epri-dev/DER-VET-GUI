<template>
  <div>
    <h3>Services: Spinning Reserve Price</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="srGrowth"
                  :metadata="metadata.srGrowth"
                  :isInvalid="submitted && $v.srGrowth.$error"
                  :errorMessage="getErrorMsg('srGrowth')">
      </text-input>

      <text-input v-model="srDuration"
                  :metadata="metadata.srDuration"
                  :isInvalid="submitted && $v.srDuration.$error"
                  :errorMessage="getErrorMsg('srDuration')">
      </text-input>

      <hr>

      <time-series-upload
        :chartKey="chartKey"
        :data="tsSrPrice"
        :metadata="metadata.tsSrPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsSrPrice"
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
      return this.getData(CollectionType.Project, Page.ObjectivesSR);
    },
  };
</script>
