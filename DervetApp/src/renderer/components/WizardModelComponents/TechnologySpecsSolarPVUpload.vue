<template>
  <div>
    <h3>Technology Specs: Solar PV Generation Profile Upload</h3>
    <hr>
    <div class="form-horizontal form-buffer">

    <timeseries-data-upload
      chart-name="tsSolarPVGenerationProfileChartUploaded"
      @click="receiveRemove"
      :data-exists="tsData('tsSolarPVGenerationProfile').data.length !== 0"
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
  import cloneDeep from 'lodash/cloneDeep';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import TechnologySpecsSolarPVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
  import { TS_SOLARPV_GENERATION_PROFILE } from '@/models/Project/constants';
  import '@/assets/samples/Sample_PVGeneration_TimeSeries_8760.csv';
  import '@/assets/samples/Sample_PVGeneration_TimeSeries_8784.csv';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';
  // TECH_SPECS_PV (go back to tech) ?

  const FIELDS = [];
  const TS_FIELDS = [TS_SOLARPV_GENERATION_PROFILE];

  const ALL_FIELDS = [...FIELDS, ...TS_FIELDS];
  // const validations = TechnologySpecsSolarPVMetadata.getHardcodedMetadata().toValidationSchema();
  const validations = [];

  const CONSTANTS = {
    DESTINATION_PATH,
    FIELDS,
    TS_FIELDS,
  };

  export default {
    mixins: [csvUploadMixin, wizardFormMixin],
    props: ['solarId'],
    data() {
      return {
        metadata: this.getMetadata(TechnologySpecsSolarPVMetadata.getHardcodedMetadata(), ALL_FIELDS),
        // ...this.getDataFromProject(ALL_FIELDS),
        // ...this.getSolarFromStore(),
        ...this.getAssociatedInputs(TS_FIELDS),
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
      isComplete() {
        // return this.complete;
        return !this.isTSError;
      },
      // this property is triggered when there are no non-TS errors to the inputs on the page,
      //   and submitted is true
      isTSError() {
        let isError = false;
        (this.CONSTANTS.TS_FIELDS).forEach((field) => {
          if (this.getErrorListTS(field).length !== 0) {
            isError = true;
          }
        });
        return isError;
      },
    },
    methods: {
      getAssociatedInputs(fields) {
        const aiArray = this.$store.getters.getSolarPVById(this.solarId).associatedInputs;
        const aiObject = {};
        (fields).forEach((field, index) => {
          aiObject[field] = aiArray[index].ts;
        });
        return aiObject;
      },
      getDataFromProject(fields) {
        const tsObject = {};
        (fields).forEach((tsField) => {
          tsObject[tsField] = TechnologySpecsSolarPVMetadata
            .getHardcodedMetadata().getDefaultValues()[tsField];
        });
        return tsObject;
      },
      getErrorListTS(tsField) {
        const errors = [];
        const errorMsgTS = this.getErrorMsgTSFromProject(tsField);
        if (errorMsgTS.length !== 0) {
          errors.push(errorMsgTS);
        }
        return errors;
      },
      getSolarFromStore() {
        return this.$store.getters.getSolarPVById(this.solarId);
      },
      getTS(tsField) {
        const solarPVSpecs = this.$store.getters.getSolarPVById(this.solarId);
        return solarPVSpecs[tsField];
      },
      tsSave(tsFields) {
        // only save uploaded data (if it exists, and useExisting is true)
        tsFields.forEach((tsField) => {
          if (this[this.inputField(tsField)] !== null && this[this.useExistingField(tsField)]) {
            this.$store.dispatch(
              this.metadata[tsField].actionSetName,
              this.tsPayload(tsField),
            );
          }
        });
      },
      receiveRemove(payload) {
        const { objectName } = payload;
        // remove data by overwriting with an empty data object
        const emptyData = cloneDeep(this[objectName]);
        emptyData.data = [];
        // set input Data object to null
        this[this.inputField(objectName)] = null;
        const tsPayload = this.tsPayload(objectName);
        tsPayload.data.ts = emptyData;
        this.$store.dispatch(this.metadata[objectName].actionSetName, tsPayload);
        this[objectName] = cloneDeep(emptyData);
      },
      tsPayload(tsField) {
        const ts = (this[this.inputField(tsField)] !== null
          && this[this.useExistingField(tsField)])
          ? this[this.inputField(tsField)] : undefined;
        const payloadComplete = (ts !== undefined);
        const data = {
          errorList: payloadComplete ? [] : [this.requiredDataLabel(tsField)],
          complete: payloadComplete,
        };
        if (payloadComplete) {
          data.ts = ts;
        }
        return {
          index: 0,
          id: this.solarId,
          data,
        };
      },
      validatedSave() {
        this.submitted = true;
        this.$v.$touch();
        // save
        this.tsSave(this.CONSTANTS.TS_FIELDS);
      },
    },
  };
</script>
