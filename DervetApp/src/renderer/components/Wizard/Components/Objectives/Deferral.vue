<template>
  <div>
    <h3>Services: Deferral</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="deferralPlannedLoadLimit"
                  :metadata="metadata.deferralPlannedLoadLimit"
                  :isInvalid="submitted && $v.deferralPlannedLoadLimit.$error"
                  :errorMessage="getErrorMsg('deferralPlannedLoadLimit')">
      </text-input>

      <text-input v-model="deferralReversePowerFlowLimit"
                  :metadata="metadata.deferralReversePowerFlowLimit"
                  :isInvalid="submitted && $v.deferralReversePowerFlowLimit.$error"
                  :errorMessage="getErrorMsg('deferralReversePowerFlowLimit')">
      </text-input>

      <text-input v-model="deferralGrowth"
                  :metadata="metadata.deferralGrowth"
                  :isInvalid="submitted && $v.deferralGrowth.$error"
                  :errorMessage="getErrorMsg('deferralGrowth')">
      </text-input>

      <text-input v-model="deferralPrice"
                  :metadata="metadata.deferralPrice"
                  :isInvalid="submitted && $v.deferralPrice.$error"
                  :errorMessage="getErrorMsg('deferralPrice')">
      </text-input>

      <hr>

      <time-series-upload
        :chartKey="chartKey"
        :data="tsDeferralLoad"
        :metadata="metadata.tsDeferralLoad"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.tsDeferralLoad"
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
      return this.getData(CollectionType.Project, Page.ObjectivesDeferral);
    },
  };
</script>
