<template>
  <div>
    <h3>Services: Demand Response</h3>
    <hr>
    <form class="form-horizontal form-buffer">
      <div class="form-group row">
        <div class="col-md-3">
          <label class="control-label" for="size">
            <b>Select all months when the demand response program will be active</b>
          </label>
        </div>
        <b-form-group class="col-md-7 form-control-static">
          <b-form-checkbox-group
            size="lg"
            v-model="monthsAppliedLabels"
            :options="monthsList"
            name="activeMonthsCheckboxes"
          ></b-form-checkbox-group>
        </b-form-group>
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

      <text-input v-model="drEndHour"
                  v-bind:field="metadata.drEndHour"
                  :isInvalid="submitted && $v.drEndHour.$error"
                  :errorMessage="getErrorMsg('drEndHour')">
      </text-input>

      <text-input v-model="drEventLength"
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

      <monthly-data-upload
        chart-name="chartUploadedCapacityAwardsTimeSeries"
        :data-name="capacityAwardsName"
        units="$/kW"
        :DataModel="DRCapacityAdwardsMonthly"
        @uploaded="receiveMonthlyData"
        :monthly-data="capacityAwards"
        key="1"
      />
      <monthly-data-upload
        chart-name="chartUploadedEnergyAwardsTimeSeries"
        :data-name="energyAwardsName"
        units="$/kWh"
        :DataModel="DREnergyAwardsMonthly"
        @uploaded="receiveMonthlyData"
        :monthly-data="energyAwards"
        key="2"
      />
      <monthly-data-upload
        chart-name="chartUploadedReservationTimeSeries"
        :data-name="capacityReservationName"
        units="kW"
        :DataModel="DRCapacityReservationMonthly"
        @uploaded="receiveMonthlyData"
        :monthly-data="capacityReservation"
        key="3"
      />
      <hr>

      <save-buttons
        :continue-link="WIZARD_COMPONENT_PATH"
        :displayError="submitted && $v.$anyError"
        :save="validatedSave" />

    </form>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import * as p from '@/models/Project/Project';
  import * as c from '@/models/Project/constants';
  import operateOnKeysList from '@/util/object';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import DRCapacityReservationMonthly from '@/models/Monthly/DRCapacityReservationMonthly';
  import DREnergyAwardsMonthly from '@/models/Monthly/DREnergyAwardsMonthly';
  import DRCapacityAdwardsMonthly from '@/models/Monthly/DRCapacityAdwardsMonthly';
  import DRMonthsMonthly from '@/models/Monthly/DRMonthsMonthly';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import {
    SET_DR_NUMBER_EVENTS,
    SET_DR_INCLUDE_WEEKENDS,
    SET_DR_START_HOUR,
    SET_DR_END_HOUR,
    SET_DR_EVENT_LENGTH,
    SET_DR_PROGRAM_TYPE,
    SET_DR_APPLIED_MONTHS,
    SET_DR_APPLIED_MONTHS_LABELS,
    SET_DR_CAPACITY_RESERVATION,
    SET_DR_CAPACITY_AWARDS,
    SET_DR_ENERGY_AWARDS,
  } from '@/store/actionTypes';
  import MonthlyDataUpload from '@/components/Shared/MonthlyDataUpload';
  import { isNotNullAndNotUndefined } from '@/util/logic';


  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.DEMAND_RESPONSE_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'DR';

  export default {
    components: { MonthlyDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        monthsAppliedLabels: p.drMonthsAppliedLabels,
        capacityReservation: p.drCapacityReservation,
        capacityReservationName: 'power that will be commited to the demand response program',
        capacityAwards: p.drCapacityAwards,
        capacityAwardsName: 'award for reducing demand during demand response events',
        energyAwards: p.drEnergyAwards,
        energyAwardsName: 'award for reducing energy consumption during demand response events',
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT_PATH,
        DRCapacityReservationMonthly,
        DREnergyAwardsMonthly,
        DRCapacityAdwardsMonthly,
        DRMonthsMonthly,
        monthsList: MONTHS,
      };
    },
    validations: {
      ...validations,
    },
    computed: {
      errorList() {
        return this.$store.state.Application.errorList[PAGEGROUP][PAGEKEY][PAGE];
      },
      monthsAppliedConvertedIntoOnesAndZeros() {
        return this.monthsList.map(month => (this.monthsAppliedLabels.includes(month) ? 1 : 0));
      },
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (isNotNullAndNotUndefined(this.errorList)) {
        this.submitted = true;
        this.$v.$touch();
      }
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getDataFromProject() {
        return operateOnKeysList(this.$store.state.Project, c.DEMAND_RESPONSE_FIELDS, f => f);
      },
      getErrorListPayload() {
        const errors = [];
        Object.keys(this.$v).forEach((key) => {
          if (key.charAt(0) !== '$' && this.$v[key].$invalid) {
            errors.push(this.getErrorMsg(key));
          }
        });
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          errorList: errors,
        };
      },
      validatedSave() {
        this.submitted = true;
        this.$v.$touch();
        // set errorList
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        return this.save();
      },
      save() {
        this.$store.dispatch(SET_DR_APPLIED_MONTHS, this.monthsAppliedConvertedIntoOnesAndZeros);
        this.$store.dispatch(SET_DR_APPLIED_MONTHS_LABELS, this.monthsAppliedLabels);

        if (this.inputMonthly[this.capacityReservationName] !== undefined) {
          this.$store.dispatch(
            SET_DR_CAPACITY_RESERVATION,
            this.inputMonthly[this.capacityReservationName],
          );
        }
        if (this.inputMonthly[this.capacityAwardsName] !== undefined) {
          this.$store.dispatch(SET_DR_CAPACITY_AWARDS, this.inputMonthly[this.capacityAwardsName]);
        }
        if (this.inputMonthly[this.energyAwardsName] !== undefined) {
          this.$store.dispatch(SET_DR_ENERGY_AWARDS, this.inputMonthly[this.energyAwardsName]);
        }

        this.$store.dispatch(SET_DR_NUMBER_EVENTS, this[c.DR_NUMBER_EVENTS]);
        this.$store.dispatch(SET_DR_INCLUDE_WEEKENDS, this[c.DR_INCLUDE_WEEKENDS]);
        this.$store.dispatch(SET_DR_START_HOUR, this[c.DR_START_HOUR]);
        this.$store.dispatch(SET_DR_END_HOUR, this[c.DR_END_HOUR]);
        this.$store.dispatch(SET_DR_EVENT_LENGTH, this[c.DR_EVENT_LENGTH]);
        this.$store.dispatch(SET_DR_PROGRAM_TYPE, this[c.DR_PROGRAM_TYPE]);
      },
    },
  };
</script>
