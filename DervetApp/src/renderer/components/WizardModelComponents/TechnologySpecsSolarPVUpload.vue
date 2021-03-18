<template>
  <div>
    <h3>Technology Specs: Solar PV Generation Profile Upload</h3>
    <hr>
    <div class="form-horizontal form-buffer">

    <timeseries-data-upload
      chart-name="tsSolarPVGenerationProfileChartUploaded"
      @click="receiveRemove"
      :DataModel="metadata.tsSolarPVGenerationProfile.DataModel"
      :data-name="metadata.tsSolarPVGenerationProfile.displayName"
      :data-time-series="tsData('tsSolarPVGenerationProfile')"
      :errorMessage="getErrorMsgTS('tsSolarPVGenerationProfile')"
      :isInvalid="submitted && tsData('tsSolarPVGenerationProfile').data.length === 0"
      @input="receiveUseExisting"
      :key="childKey('tsSolarPVGenerationProfile')"
      object-name="tsSolarPVGenerationProfile"
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
  import TechnologyMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
  import { TS_SOLARPV_GENERATION_PROFILE as TS } from '@/models/Project/constants';
  import '@/assets/samples/Sample_PVGeneration_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_PVGeneration_TimeSeries_8784.csv';

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
    props: ['solarId'],
    data() {
      return {
        metadata: this.getMetadata(TechnologyMetadata.getHardcodedMetadata(), ALL_FIELDS),
        ...this.getAssociatedInputs(
          TS_FIELDS,
          this.$store.getters.getSolarPVById(this.solarId).associatedInputs,
        ),
        ...this.getTSInputDefaultDataFromProject(TS_FIELDS),
        ...this.getChildKeys(TS_FIELDS),
        ...this.getUseExistingDefaults(TS_FIELDS),
        CONSTANTS,
        id: this.solarId,
      };
    },
    validations: {
      ...validations,
    },
  };
</script>
