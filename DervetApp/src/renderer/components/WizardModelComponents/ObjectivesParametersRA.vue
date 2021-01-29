<template>
  <div>
    <h3>Services: Load Following</h3>
    <hr>
    <form class="form-horizontal form-buffer">
       <div class="row form-group">
        <div class="col-md-4 checkboxes" v-for="month in monthsList">
          <b-form-checkbox size='lg' v-model="monthsAppliedLabels" value="month"><b>{{month}}</b></b-form-checkbox>
        </div>

      </div>

      <text-input v-model="raNumberEvents"
                  v-bind:field="metadata.raNumberEvents"
                  :isInvalid="submitted && $v.raNumberEvents.$error"
                  :errorMessage="getErrorMsg('raNumberEvents')">
      </text-input>

      <text-input v-model="raEventLength"
                  v-bind:field="metadata.raEventLength"
                  :isInvalid="submitted && $v.raEventLength.$error"
                  :errorMessage="getErrorMsg('raEventLength')">
      </text-input>

      <radio-button-input
        v-model="raDispatchMode"
        v-bind:field="metadata.raDispatchMode"
        :isInvalid="submitted && $v.raDispatchMode.$error"
        :errorMessage="getErrorMsg('raDispatchMode')">
      </radio-button-input>

      <radio-button-input
        v-model="raEventSelectionMethod"
        v-bind:field="metadata.raEventSelectionMethod"
        :isInvalid="submitted && $v.raEventSelectionMethod.$error"
        :errorMessage="getErrorMsg('raEventSelectionMethod')">
      </radio-button-input>

      <monthly-data-upload
        chart-name="chartUploadedCapacityAwardsTimeSeries"
        :data-name="capacityAwardsName"
        units="$/kW"
        :DataModel="RACapacityAdwardsMonthly"
        @uploaded="receiveMonthlyData"
        :data-time-series="capacityAwards"
        key="1"
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
  import RACapacityAdwardsMonthly from '@/models/Monthly/RACapacityAdwardsMonthly';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import {
    SET_RA_CAPACITY_PRICE,
    SET_RA_DISPATCH_MODE,
    SET_RA_EVENT_LENGTH,
    SET_RA_EVENT_SELECTION_METHOD,
    SET_RA_NUMBER_EVENTS,
  } from '@/store/actionTypes';
  import MonthlyDataUpload from '@/components/Shared/MonthlyDataUpload';


  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.RESOURCE_ADEQUACY_FIELDS);
  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'RA';

  export default {
    components: { MonthlyDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        capacityAwards: p.raCapacityAwards,
        capacityAwardsName: 'monthly value of resource adequacy',

        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT_PATH,
        RACapacityAdwardsMonthly,
      };
    },
    validations: {
      ...validations,
    },
    computed: {
      errorList() {
        return this.$store.state.Application.errorList[PAGEGROUP][PAGEKEY][PAGE];
      },
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (this.errorList !== null || this.errorList !== undefined) {
        this.submitted = true;
        this.$v.$touch();
      }
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getDataFromProject() {
        return operateOnKeysList(this.$store.state.Project, c.RESOURCE_ADEQUACY_FIELDS, f => f);
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
        if (this.inputMonthly[this.capacityAwardsName] !== undefined) {
          this.$store.dispatch(SET_RA_CAPACITY_PRICE, this.inputMonthly[this.capacityAwardsName]);
        }

        this.$store.dispatch(SET_RA_DISPATCH_MODE, this[c.RA_DISPATCH_MODE]);
        this.$store.dispatch(SET_RA_EVENT_LENGTH, this[c.RA_EVENT_LENGTH]);
        this.$store.dispatch(SET_RA_EVENT_SELECTION_METHOD, this[c.RA_EVENT_SELECTION_METHOD]);
        this.$store.dispatch(SET_RA_NUMBER_EVENTS, this[c.RA_NUMBER_EVENTS]);
      },
    },
  };
</script>
