<template>
  <div>
    <h3>Services: Demand Response</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <div class="form-group row">
        <div class="col-md-3">
          <label class="control-label" for="size">
            <b>Select all months when the demand response program will be active</b>
          </label>
        </div>
        <b-form-group class="col-md-7 form-control-static">
          <b-form-checkbox-group
            size="lg"
            v-model="drMonthsAppliedLabels"
            :options="monthsList"
            name="activeMonthsCheckboxes"
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div v-if="submitted && areZeroMonthsSelected"
          class="col-md-5 error-text-color">
          <span>{{ ZERO_MONTHS_ERROR_MSG }}</span>
          <br>
          <br>
        </div>
      </div>

      <text-input v-model="drNumberEvents"
                  v-bind:field="metadata.drNumberEvents"
                  :isInvalid="submitted && $v.drNumberEvents.$error"
                  :errorMessage="getErrorMsg('drNumberEvents')">
      </text-input>

      <radio-button-input
        v-model="drIncludeWeekends"
        v-bind:field="metadata.drIncludeWeekends"
        :isInvalid="submitted && $v.drIncludeWeekends.$error"
        :errorMessage="getErrorMsg('drIncludeWeekends')">
      </radio-button-input>

      <text-input v-model="drStartHour"
                  v-bind:field="metadata.drStartHour"
                  :isInvalid="submitted && $v.drStartHour.$error"
                  :errorMessage="getErrorMsg('drStartHour')">
      </text-input>

      <radio-button-input
        v-model="drEndMode"
        v-bind:field="metadata.drEndMode"
        :isInvalid="submitted && $v.drEndMode.$error"
        :errorMessage="getErrorMsg('drEndMode')">
      </radio-button-input>

      <text-input v-model="drEndHour"
                  v-if="!drEndMode"
                  v-bind:field="metadata.drEndHour"
                  :isInvalid="submitted && $v.drEndHour.$error"
                  :errorMessage="getErrorMsg('drEndHour')">
      </text-input>

      <text-input v-model="drEventLength"
                  v-if="drEndMode"
                  v-bind:field="metadata.drEventLength"
                  :isInvalid="submitted && $v.drEventLength.$error"
                  :errorMessage="getErrorMsg('drEventLength')">
      </text-input>

      <radio-button-input
        v-model="drProgramType"
        v-bind:field="metadata.drProgramType"
        :isInvalid="submitted && $v.drProgramType.$error"
        :errorMessage="getErrorMsg('drProgramType')">
      </radio-button-input>

      <text-input v-model="drGrowth"
                  v-bind:field="metadata.drGrowth"
                  :isInvalid="submitted && $v.drGrowth.$error"
                  :errorMessage="getErrorMsg('drGrowth')">
      </text-input>


      <monthly-data-upload
        chart-name="mtsDrCapacityPriceChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.mtsDrCapacityPrice.DataModel"
        :data-name="metadata.mtsDrCapacityPrice.displayName"
        :monthly-data="tsData('mtsDrCapacityPrice')"
        :errorMessage="getErrorMsgTS('mtsDrCapacityPrice')"
        :isInvalid="submitted && tsData('mtsDrCapacityPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('mtsDrCapacityPrice')"
        object-name="mtsDrCapacityPrice"
        @uploaded="receiveTimeseriesData"
      />

      <monthly-data-upload
        chart-name="mtsDrEnergyPriceChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.mtsDrEnergyPrice.DataModel"
        :data-name="metadata.mtsDrEnergyPrice.displayName"
        :monthly-data="tsData('mtsDrEnergyPrice')"
        :errorMessage="getErrorMsgTS('mtsDrEnergyPrice')"
        :isInvalid="submitted && tsData('mtsDrEnergyPrice').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('mtsDrEnergyPrice')"
        object-name="mtsDrEnergyPrice"
        @uploaded="receiveTimeseriesData"
      />

      <monthly-data-upload
        chart-name="mtsDrCapacityReservationChartUploaded"
        @click="receiveRemove"
        :DataModel="metadata.mtsDrCapacityReservation.DataModel"
        :data-name="metadata.mtsDrCapacityReservation.displayName"
        :monthly-data="tsData('mtsDrCapacityReservation')"
        :errorMessage="getErrorMsgTS('mtsDrCapacityReservation')"
        :isInvalid="submitted && tsData('mtsDrCapacityReservation').data.length === 0"
        @input="receiveUseExisting"
        :key="childKey('mtsDrCapacityReservation')"
        object-name="mtsDrCapacityReservation"
        @uploaded="receiveTimeseriesData"
      />
      <hr>

      <save-and-save-continue
        :displayError="submitted && ($v.$anyError || isTSError || areZeroMonthsSelected)"
        :save="validatedSaveStay"
        :save-continue="validatedSaveContinue"
      />

    </div>
  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import { projectMetadata } from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';
  import '@/assets/samples/Sample_DRCapacityPrice_Monthly_12.csv';
  import '@/assets/samples/Sample_DRCapacityReservation_Monthly_12.csv';
  import '@/assets/samples/Sample_DREnergyPrice_Monthly_12.csv';

  import { SET_DR_APPLIED_MONTHS } from '@/store/actionTypes';
  import DRMonthsAppliedMonthly from '@/models/Monthly/DRMonthsAppliedMonthly';

  import { WIZARD_COMPONENT as DESTINATION_PATH } from '@/router/constants';

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'DR';
  const FIELDS = c.DEMAND_RESPONSE_FIELDS;
  const TS_FIELDS = c.MTS_DR_FIELDS;

  const ALL_FIELDS = [...FIELDS, ...TS_FIELDS];
  const validations = projectMetadata.getValidationSchema(FIELDS);
  const ZERO_MONTHS_ERROR_MSG = 'At least one month must be selected';

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
        monthsList: MONTHS,
        ZERO_MONTHS_ERROR_MSG,
      };
    },
    validations: {
      ...validations,
      drEndHour: {
        ...validations.drEndHour,
        required: requiredIf(function isRequired() {
          return (!this.drEndMode);
        }),
      },
      drEventLength: {
        ...validations.drEventLength,
        required: requiredIf(function isRequired() {
          return (this.drEndMode);
        }),
      },
    },
    computed: {
      areZeroMonthsSelected() {
        return !this.drMonthsAppliedLabels.some((val) => val !== 0);
      },
      isRequiredTSFields() {
        // return an object of booleans for every TS_FIELD,
        //   indicating if each is required
        const isRequiredObject = {};
        (TS_FIELDS).forEach((tsField) => {
          isRequiredObject[tsField] = true;
        });
        return isRequiredObject;
      },
      monthsAppliedConvertedIntoOnesAndZeros() {
        if (this.drMonthsAppliedLabels.length > 0) {
          const mon = this.monthsList.map(mon => (this.drMonthsAppliedLabels.includes(mon) ? 1 : 0));
          return new DRMonthsAppliedMonthly(mon);
        }
        return null;
      },
    },
    methods: {
      getErrorListPayload() {
        const errorListPayload = csvUploadMixin.methods.getErrorListPayload.bind(this)();
        if (this.areZeroMonthsSelected) {
          errorListPayload.errorList.unshift(ZERO_MONTHS_ERROR_MSG);
        }
        return errorListPayload;
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      validatedSave() {
        this.$store.dispatch(SET_DR_APPLIED_MONTHS, this.monthsAppliedConvertedIntoOnesAndZeros);
        csvUploadMixin.methods.validatedSave.bind(this)();
      },
    },
  };
</script>
