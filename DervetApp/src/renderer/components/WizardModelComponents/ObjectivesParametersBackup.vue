<template>
  <div>
    <h3>Services: Backup Power</h3>
    <div class="form-horizontal form-buffer">

      <monthly-data-upload
        chart-name="mtsBackupEnergyPriceChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.mtsBackupEnergyPrice.DataModel"
        :data-name="metadata.mtsBackupEnergyPrice.displayName"
        :monthly-data="tsData('mtsBackupEnergyPrice')"
        :errorMessage="getErrorMsgTS('mtsBackupEnergyPrice')"
        :isInvalid="submitted && tsData('mtsBackupEnergyPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('mtsBackupEnergyPrice')"
        object-name="mtsBackupEnergyPrice"
        @uploaded="receiveTimeseriesData"
      />

      <monthly-data-upload
        chart-name="mtsBackupEnergyReservationChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.mtsBackupEnergyReservation.DataModel"
        :data-name="metadata.mtsBackupEnergyReservation.displayName"
        :monthly-data="tsData('mtsBackupEnergyReservation')"
        :errorMessage="getErrorMsgTS('mtsBackupEnergyReservation')"
        :isInvalid="submitted && tsData('mtsBackupEnergyReservation').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('mtsBackupEnergyReservation')"
        object-name="mtsBackupEnergyReservation"
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
  const PAGE = 'backup';
  const FIELDS = [];
  const TS_FIELDS = c.MTS_BACKUP_FIELDS;

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
