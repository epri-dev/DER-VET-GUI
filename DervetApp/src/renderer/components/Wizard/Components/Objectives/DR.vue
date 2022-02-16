<template>
  <div>
    <h3>Services: Demand Response</h3>
    <hr>
    <div class="form-horizontal form-buffer">

      <div class="row">
        <div class="col-md-3">
          <label class="control-label" for="size">
            <b>Select all months when the demand response program will be active</b>
          </label>
        </div>
        <b-form-group class="col-md-6 form-control-static">
          <template v-slot="{ ariaDescribedBy }">
          <b-form-checkbox-group
            id="months"
            size="md"
            :aria-desribedby="ariaDescribedBy"
            v-model="selected"
            :options="MONTHS"
            name="activeMonthsCheckboxes">
          </b-form-checkbox-group>
          </template>
        </b-form-group>
        <b-form-group class="col-md-2 form-control-static">
          <template v-slot="label">
          <b-form-checkbox
            v-model="allSelected"
            aria-describedby="months"
            aria-controls="months"
            @change="toggleAll">
            {{ allSelected ? 'Deselect all' : 'Select all' }}
          </b-form-checkbox>
          </template>
        </b-form-group>
      </div>

      <div class="row">
        <div class="col-md-3"></div>
        <div
          v-if="showTimeSeriesErrorMessage()"
          class="col-md-5 error-text-color">
          <span>{{ timeSeriesErrors.mtsDrMonthsApplied }}</span>
          <br>
          <br>
        </div>
      </div>

      <text-input v-model="drNumberEvents"
                  :metadata="metadata.drNumberEvents"
                  :isInvalid="submitted && $v.drNumberEvents.$error"
                  :errorMessage="getErrorMsg('drNumberEvents')">
      </text-input>

      <radio-button-input
        v-model="drIncludeWeekends"
        :metadata="metadata.drIncludeWeekends"
        :isInvalid="submitted && $v.drIncludeWeekends.$error"
        :errorMessage="getErrorMsg('drIncludeWeekends')">
      </radio-button-input>

      <text-input v-model="drStartHour"
                  :metadata="metadata.drStartHour"
                  :isInvalid="submitted && $v.drStartHour.$error"
                  :errorMessage="getErrorMsg('drStartHour')">
      </text-input>

      <radio-button-input
        v-model="drEndMode"
        :metadata="metadata.drEndMode"
        :isInvalid="submitted && $v.drEndMode.$error"
        :errorMessage="getErrorMsg('drEndMode')">
      </radio-button-input>

      <text-input v-model="drEndHour"
                  v-if="!drEndMode"
                  :metadata="metadata.drEndHour"
                  :isInvalid="submitted && $v.drEndHour.$error"
                  :errorMessage="getErrorMsg('drEndHour')">
      </text-input>

      <text-input v-model="drEventLength"
                  v-if="drEndMode"
                  :metadata="metadata.drEventLength"
                  :isInvalid="submitted && $v.drEventLength.$error"
                  :errorMessage="getErrorMsg('drEventLength')">
      </text-input>

      <radio-button-input
        v-model="drProgramType"
        :metadata="metadata.drProgramType"
        :isInvalid="submitted && $v.drProgramType.$error"
        :errorMessage="getErrorMsg('drProgramType')">
      </radio-button-input>

      <text-input v-model="drGrowth"
                  :metadata="metadata.drGrowth"
                  :isInvalid="submitted && $v.drGrowth.$error"
                  :errorMessage="getErrorMsg('drGrowth')">
      </text-input>

      <time-series-upload
        :chartKey="chartKey"
        :data="mtsDrCapacityPrice"
        :metadata="metadata.mtsDrCapacityPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.mtsDrCapacityPrice"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="mtsDrEnergyPrice"
        :metadata="metadata.mtsDrEnergyPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.mtsDrEnergyPrice"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="mtsDrCapacityReservation"
        :metadata="metadata.mtsDrCapacityReservation"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.mtsDrCapacityReservation"
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
  import _ from 'lodash';
  import { requiredIf } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import CollectionTypes from '@/models/Project/CollectionTypes';
  import { MONTHS } from '@/util/time';

  export default {
    mixins: [wizardFormMixin],
    data() {
      const pageData = this.getData(CollectionTypes.Project, Page.ObjectivesDR);
      const selected = this.onesAndZerosToMonths(pageData.mtsDrMonthsApplied);
      return {
        ...pageData,
        selected,
        allSelected: this.areAllMonthsSelected(selected),
        MONTHS,
      };
    },
    validations() {
      return {
        ...this.validationSchema,
        drEndHour: {
          ...this.validationSchema.drEndHour,
          required: requiredIf(function isRequired() {
            return (!this.drEndMode);
          }),
        },
        drEventLength: {
          ...this.validationSchema.drEventLength,
          required: requiredIf(function isRequired() {
            return (this.drEndMode);
          }),
        },
      };
    },
    watch: {
      selected() {
        this.allSelected = this.areAllMonthsSelected(this.selected);
        this.mtsDrMonthsApplied = this.monthsToOnesAndZeros(this.selected);
      },
    },
    methods: {
      toggleAll(checked) {
        this.selected = checked ? this.MONTHS.slice() : [];
      },
      areAllMonthsSelected(selected) {
        return selected.length === MONTHS.length;
      },
      onesAndZerosToMonths(mtsDrMonthsApplied) {
        return _.reduce(mtsDrMonthsApplied, (result, val, idx) => {
          if (val) result.push(MONTHS[idx]);
          return result;
        }, []);
      },
      monthsToOnesAndZeros(selected) {
        return MONTHS.map(mon => (selected.includes(mon) ? 1 : 0));
      },
      resetAllNonRequired() {
        if (this.drEndMode === true) {
          this.resetNonRequired(['drEndHour']);
        } else if (this.drEndMode === false) {
          this.resetNonRequired(['drEventLength']);
        }
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        this.resetAllNonRequired();
        wizardFormMixin.methods.validatedSave.bind(this)();
      },
    },
  };
</script>
