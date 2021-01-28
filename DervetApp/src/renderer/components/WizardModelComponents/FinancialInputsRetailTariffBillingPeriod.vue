<template>
  <div>
    <h3>Retail Tariff: Add Billing Period</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="startMonth"
                  v-bind:field="metadata.startMonth"
                  :isInvalid="submitted && $v.startMonth.$error"
                  :errorMessage="getErrorMsg('startMonth')">
      </text-input>

      <text-input v-model="endMonth"
                  v-bind:field="metadata.endMonth"
                  :isInvalid="submitted && $v.endMonth.$error"
                  :errorMessage="getErrorMsg('endMonth')">
      </text-input>

      <text-input v-model="startTime"
                  v-bind:field="metadata.startTime"
                  :isInvalid="submitted && $v.startTime.$error"
                  :errorMessage="getErrorMsg('startTime')">
      </text-input>

      <text-input v-model="endTime"
                  v-bind:field="metadata.endTime"
                  :isInvalid="submitted && $v.endTime.$error"
                  :errorMessage="getErrorMsg('endTime')">
      </text-input>

      <radio-button-input v-model="weekday"
                  v-bind:field="metadata.weekday"
                  :isInvalid="submitted && $v.weekday.$error"
                  :errorMessage="getErrorMsg('weekday')">
      </radio-button-input>

      <radio-button-input v-model="chargeType"
                  v-bind:field="metadata.chargeType"
                  :isInvalid="submitted && $v.chargeType.$error"
                  :errorMessage="getErrorMsg('chargeType')">
      </radio-button-input>

      <text-input v-model="value"
                  v-bind:field="getMetadataValue()"
                  :isInvalid="submitted && $v.value.$error"
                  :errorMessage="getErrorMsg('value')">
      </text-input>

      <text-input v-model="excludingStartTime"
                  v-bind:field="metadata.excludingStartTime"
                  :isInvalid="submitted && $v.excludingStartTime.$error"
                  :errorMessage="getErrorMsg('excludingStartTime')">
      </text-input>

      <text-input v-model="excludingEndTime"
                  v-bind:field="metadata.excludingEndTime"
                  :isInvalid="submitted && $v.excludingEndTime.$error"
                  :errorMessage="getErrorMsg('excludingEndTime')">
      </text-input>

      <text-input v-model="name"
                  v-bind:field="metadata.name"
                  :isInvalid="submitted && $v.name.$error"
                  :errorMessage="getErrorMsg('name')">
      </text-input>

      <hr>

      <save-only-button
        :displayError="submitted && $v.$anyError"
        :save="validatedSave" />

      <nav-buttons
        :continue-link="FINANCIAL_INPUTS_RETAIL_TARIFF_PATH"
        continue-text="Back To Retail Tariff" />

    </form>
  </div>
</template>

<script>
  import { requiredIf, minValue, maxValue } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import RetailTariffBillingPeriodMetadata from '@/models/RetailTariffBillingPeriod';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF_PATH } from '@/router/constants';
  import SaveOnlyButton from '@/components/Shared/SaveOnlyButton';

  const metadata = RetailTariffBillingPeriodMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  const PAGEGROUP = 'components';
  const PAGEKEY = 'financial';
  const PAGE = 'retailTariff';

  export default {
    components: { SaveOnlyButton },
    props: ['billingPeriodId'],
    mixins: [wizardFormMixin],
    data() {
      if (this.isNewBillingPeriod()) {
        return {
          metadata,
          ...this.getDefaultData(),
          FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
        };
      }
      return {
        metadata,
        ...this.getDataFromProject(),
        FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
      };
    },
    validations() {
      return {
        ...validations,
        // the 2 excluding Time inputs must BOTH be valid, or BOTH be null/empty
        excludingStartTime: {
          ...validations.excludingStartTime,
          required: requiredIf(function isExcludingStartTimeRequired() {
            return !(this.excludingEndTime === null || this.excludingEndTime === '' || this.excludingEndTime === undefined);
          }),
          minValue: !this.valueInHourRange(this.startTime) ? 1 : minValue(this.startTime),
          maxValue: !this.valueInHourRange(this.endTime) ? 24 : maxValue(this.endTime),
        },
        excludingEndTime: {
          ...validations.excludingEndTime,
          required: requiredIf(function isExcludingEndTimeRequired() {
            return !(this.excludingStartTime === null || this.excludingStartTime === '' || this.excludingStartTime === undefined);
          }),
          minValue: !this.valueInHourRange(this.excludingStartTime)
            ? 1 : minValue(this.excludingStartTime),
          maxValue: !this.valueInHourRange(this.endTime) ? 24 : maxValue(this.endTime),
        },
        endMonth: {
          ...validations.endMonth,
          minValue: !this.valueInMonthRange(this.startMonth) ? 1 : minValue(this.startMonth),
        },
        endTime: {
          ...validations.endTime,
          minValue: !this.valueInHourRange(this.startTime) ? 1 : minValue(this.startTime),
        },
      };
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (this.complete !== null) {
        this.submitted = true;
        // if weekday is not one of its allowed values, then set it to it's default value
        //   this is needed for better validation handling
        this.setWeekdayValue();
        this.$v.$touch();
      }
    },
    methods: {
      getDefaultData() {
        const defaultValues = metadata.getDefaultValues();
        defaultValues.id = this.$store.getters.getNewRetailTariffBillingPeriodId;
        return defaultValues;
      },
      getDataFromProject() {
        // the prop can become a string, but needs to be a number for this to work here
        const pd = this.$store.getters.getListFieldById('retailTariffBillingPeriods', parseInt(this.billingPeriodId, 10));
        return this.unpackData(pd);
      },
      getDynamicExcludingEndTimeMinValue() {
        if (!this.valueInHourRange(this.excludingStartTime)) {
          if (!this.valueInHourRange(this.startTime)) {
            return 1;
          }
          return this.startTime;
        }
        return this.excludingStartTime;
      },
      getErrorMsg(fieldName) {
        // endMonth dynamic validation
        this.metadata.endMonth.minValue = !this.valueInMonthRange(this.startMonth)
          ? 1 : this.startMonth;
        // endTime dynamic validation
        this.metadata.endTime.minValue = !this.valueInHourRange(this.startTime)
          ? 1 : this.startTime;
        // excludingStartTime dynamic validation
        this.metadata.excludingStartTime.minValue = !this.valueInHourRange(this.startTime)
          ? 1 : this.startTime;
        this.metadata.excludingStartTime.maxValue = !this.valueInHourRange(this.endTime)
          ? 24 : this.endTime;
        // excludingEndTime dynamic validation
        this.metadata.excludingEndTime.minValue = this.getDynamicExcludingEndTimeMinValue();
        // this.metadata.excludingEndTime.minValue = !this.valueInHourRange(this.excludingStartTime)
        // ? 1 : this.excludingStartTime;
        this.metadata.excludingEndTime.maxValue = !this.valueInHourRange(this.endTime)
          ? 24 : this.endTime;
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getWeekdayFromValue() {
        return this.metadata.weekday.allowedValues.find(type => type.value === this.weekday);
      },
      getChargeTypeFromValue() {
        return this.metadata.chargeType.allowedValues.find(type => type.value === this.chargeType);
      },
      getCompletenessPayload() {
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          completeness: this.complete,
        };
      },
      getErrorListPayload() {
        const errors = [];
        errors.push(this.getSingleErrorMsg());
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          errorList: errors,
        };
      },
      setWeekdayValue() {
        // sets weekday to default value if it is not one of the allowed values
        const allowedValues = this.getWeekdayFromValue();
        if (allowedValues === undefined) {
          this.weekday = this.metadata.weekday.defaultValue;
        }
      },
      getMetadataValue() {
        const allowedValues = this.getChargeTypeFromValue();
        if (allowedValues !== undefined) {
          this.metadata.value.displayName = allowedValues.label;
          this.metadata.value.unit = allowedValues.unit;
        } else {
          this.metadata.value.displayName = this.metadata.value.initDisplayName;
          this.metadata.value.unit = this.metadata.value.initUnit;
          // also set chargeType to default to get proper error message
          this.chargeType = this.metadata.chargeType.defaultValue;
        }
        return this.metadata.value;
      },
      getNumberOfInvalidRows(rows) {
        let invalidRowsCount = 0;
        Object.values(rows).forEach((row) => {
          if (!row.complete) {
            invalidRowsCount += 1;
          }
        });
        return invalidRowsCount;
      },
      getSingleErrorMsg() {
        const billingPeriods = this.$store.state.Project.retailTariffBillingPeriods;
        if (billingPeriods.length === 0) {
          return 'There are no billing periods specified.';
        }
        const invalidRowCount = this.getNumberOfInvalidRows(billingPeriods);
        if (invalidRowCount === 0) {
          return '';
        }
        const pluralizeRow = (invalidRowCount === 1) ? '' : 's';
        return `There are errors with ${invalidRowCount} row${pluralizeRow} in the table.`;
      },
      isNewBillingPeriod() {
        return this.billingPeriodId === 'null';
      },
      unpackData(source) {
        return {
          id: source.id,
          startMonth: source.startMonth,
          endMonth: source.endMonth,
          startTime: source.startTime,
          endTime: source.endTime,
          excludingStartTime: source.excludingStartTime,
          excludingEndTime: source.excludingEndTime,
          weekday: source.weekday,
          value: source.value,
          chargeType: source.chargeType,
          name: source.name,
          complete: source.complete,
        };
      },
      validatedSave() {
        this.$v.$touch();
        // set complete to true or false
        this.complete = !this.$v.$invalid;
        if (this.isNewBillingPeriod() && this.submitted !== true) {
          // add new row
          this.$store.dispatch('addRetailTariffBillingPeriod', this.buildBillingPeriod());
        } else {
          // replace a row
          const payload = {
            id: this.id,
            field: 'retailTariffBillingPeriods',
            newListItem: this.buildBillingPeriod(),
          };
          this.$store.dispatch('replaceListField', payload);
        }
        this.submitted = true;
        // set retail tariff completeness and errorList
        // only do this when the current row is invalid
        // if (!this.complete) {
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        // }
        // TODO - AE: investigate why this happens:
        // the first time this validatedSave() occurs in a session, on any page,
        //   the page reloads after a delay of a few seconds, with a blank screen.
        //   the console displays this warning:
        //   [Violation] Forced reflow while executing JavaScript took 51ms
      },
      valueInRange(value, lowValue, highValue) {
        return (value >= lowValue && value <= highValue);
      },
      valueInHourRange(value) {
        return this.valueInRange(value, 1, 24);
      },
      valueInMonthRange(value) {
        return this.valueInRange(value, 1, 12);
      },
      // saveAndAdd() {
      // reload page ? (reset form)
      // },
      buildBillingPeriod() {
        return new RetailTariffBillingPeriodMetadata({
          startMonth: this.startMonth,
          endMonth: this.endMonth,
          startTime: this.startTime,
          endTime: this.endTime,
          excludingStartTime: this.excludingStartTime,
          excludingEndTime: this.excludingEndTime,
          weekday: this.weekday,
          value: this.value,
          chargeType: this.chargeType,
          name: this.name,
          id: this.id,
          complete: this.complete,
        });
      },
    },
  };
</script>
