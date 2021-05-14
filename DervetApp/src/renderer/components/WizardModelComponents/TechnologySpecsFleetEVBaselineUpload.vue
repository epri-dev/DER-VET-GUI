<template>
  <div>
    <h3>Technology Specs: Fleet EV Baseline Load Profile Upload</h3>
    <hr>
    <div class="form-horizontal form-buffer">

    <timeseries-data-upload
      chart-name="tsFleetEVBaselineLoadProfileChartUploaded"
      @click="receiveRemove"
      :DataModel="metadata.tsFleetEVBaselineLoadProfile.DataModel"
      :data-name="metadata.tsFleetEVBaselineLoadProfile.displayName"
      :data-time-series="tsData('tsFleetEVBaselineLoadProfile')"
      :errorMessage="getErrorMsgTS('tsFleetEVBaselineLoadProfile')"
      :isInvalid="submitted && tsData('tsFleetEVBaselineLoadProfile').data.length === 0"
      @input="receiveUseExisting"
      :key="childKey('tsFleetEVBaselineLoadProfile')"
      object-name="tsFleetEVBaselineLoadProfile"
      @uploaded="receiveTimeseriesData"
    />
    <hr>

    <save-and-save-continue
      :displayError="submitted && ($v.$anyError || isTSError)"
      :save="validatedSaveStay"
      :save-continue="validatedSaveContinue"
    />

    </div>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import associatedInputsMixin from '@/mixins/associatedInputsMixin';
  import TechnologyMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsFleetEV';
  import { TS_FLEETEV_BASELINE_LOAD_PROFILE as TS } from '@/models/Project/constants';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const FIELDS = [];
  const TS_FIELDS = [TS];
  const ALL_FIELDS = [...FIELDS, ...TS_FIELDS];
  const validations = [];

  const CONSTANTS = {
    DESTINATION_PATH,
    FIELDS,
    TS_FIELDS,
  };

  export default {
    // NOTE: the ordering of mixins below is intentional here; associatedInputs should be last
    mixins: [csvUploadMixin, wizardFormMixin, associatedInputsMixin],
    props: ['id'],
    data() {
      return {
        metadata: this.getMetadata(TechnologyMetadata.getHardcodedMetadata(), ALL_FIELDS),
        ...this.getAssociatedInputs(
          TS_FIELDS,
          this.$store.getters.getFleetEVById(this.id).associatedInputs,
        ),
        ...this.getTSInputDefaultDataFromProject(TS_FIELDS),
        ...this.getChildKeys(TS_FIELDS),
        ...this.getUseExistingDefaults(TS_FIELDS),
        CONSTANTS,
      };
    },
    validations: {
      ...validations,
    },
  };
</script>
