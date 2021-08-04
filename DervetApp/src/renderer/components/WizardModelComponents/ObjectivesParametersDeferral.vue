<template>
  <div>
    <h3>Services: Deferral</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <text-input v-model="deferralPlannedLoadLimit"
                  v-bind:field="metadata.deferralPlannedLoadLimit"
                  :isInvalid="submitted && $v.deferralPlannedLoadLimit.$error"
                  :errorMessage="getErrorMsg('deferralPlannedLoadLimit')">
      </text-input>

      <text-input v-model="deferralReversePowerFlowLimit"
                  v-bind:field="metadata.deferralReversePowerFlowLimit"
                  :isInvalid="submitted && $v.deferralReversePowerFlowLimit.$error"
                  :errorMessage="getErrorMsg('deferralReversePowerFlowLimit')">
      </text-input>

      <text-input v-model="deferralGrowth"
                  v-bind:field="metadata.deferralGrowth"
                  :isInvalid="submitted && $v.deferralGrowth.$error"
                  :errorMessage="getErrorMsg('deferralGrowth')">
      </text-input>

      <text-input v-model="deferralPrice"
                  v-bind:field="metadata.deferralPrice"
                  :isInvalid="submitted && $v.deferralPrice.$error"
                  :errorMessage="getErrorMsg('deferralPrice')">
      </text-input>

      <timeseries-data-upload
        chart-name="tsDeferralLoadChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.tsDeferralLoad.DataModel"
        :data-name="metadata.tsDeferralLoad.displayName"
        :data-time-series="tsData('tsDeferralLoad')"
        :errorMessage="getErrorMsgTS('tsDeferralLoad')"
        :isInvalid="submitted && tsData('tsDeferralLoad').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('tsDeferralLoad')"
        object-name="tsDeferralLoad"
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
  import { projectMetadata } from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'deferral';
  const FIELDS = c.DEFERRAL_FIELDS;
  const TS_FIELDS = c.TS_DEFERRAL_FIELDS;

  const ALL_FIELDS = [...FIELDS, ...TS_FIELDS];
  const validations = projectMetadata.getValidationSchema(FIELDS);

  const CONSTANTS = {
    DESTINATION_PATH,
    PAGEGROUP,
    PAGEKEY,
    PAGE,
    FIELDS,
    TS_FIELDS,
  };

  export default {
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      return {
        metadata: this.getMetadata(projectMetadata, ALL_FIELDS),
        ...this.getDataFromProject(ALL_FIELDS),
        ...this.getTSInputDefaultDataFromProject(TS_FIELDS),
        ...this.getChildKeys(TS_FIELDS),
        ...this.getUseExistingDefaults(TS_FIELDS),
        CONSTANTS,
      };
    },
    validations: {
      ...validations,
    },
    computed: {
      isRequiredTSFields() {
        // return an object of booleans for every TS_FIELD,
        //   indicating if each is required
        const isRequiredObject = {};
        (TS_FIELDS).forEach((tsField) => {
          isRequiredObject[tsField] = true;
        });
        return isRequiredObject;
      },
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
    },
  };
</script>
