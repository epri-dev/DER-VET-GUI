<template>
  <div>
    <h3>Retail Tariff: Add Billing Period</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="startMonth"
                  :metadata="metadata.startMonth"
                  :isInvalid="submitted && $v.startMonth.$error"
                  :errorMessage="getErrorMsg('startMonth')">
      </text-input>

      <text-input v-model="endMonth"
                  :metadata="metadata.endMonth"
                  :isInvalid="submitted && $v.endMonth.$error"
                  :errorMessage="getErrorMsg('endMonth')">
      </text-input>

      <text-input v-model="startTime"
                  :metadata="metadata.startTime"
                  :isInvalid="submitted && $v.startTime.$error"
                  :errorMessage="getErrorMsg('startTime')">
      </text-input>

      <text-input v-model="endTime"
                  :metadata="metadata.endTime"
                  :isInvalid="submitted && $v.endTime.$error"
                  :errorMessage="getErrorMsg('endTime')">
      </text-input>

      <radio-button-input v-model="weekday"
                  :metadata="metadata.weekday"
                  :isInvalid="submitted && $v.weekday.$error"
                  :errorMessage="getErrorMsg('weekday')">
      </radio-button-input>

      <radio-button-input v-model="chargeType"
                  :metadata="metadata.chargeType"
                  :isInvalid="submitted && $v.chargeType.$error"
                  :errorMessage="getErrorMsg('chargeType')">
      </radio-button-input>

      <text-input v-model="value"
                  :metadata="getValueMetadata()"
                  :isInvalid="submitted && $v.value.$error"
                  :errorMessage="getErrorMsg('value')">
      </text-input>

      <text-input v-model="excludingStartTime"
                  :metadata="metadata.excludingStartTime"
                  :isInvalid="submitted && $v.excludingStartTime.$error"
                  :errorMessage="getErrorMsg('excludingStartTime')">
      </text-input>

      <text-input v-model="excludingEndTime"
                  :metadata="metadata.excludingEndTime"
                  :isInvalid="submitted && $v.excludingEndTime.$error"
                  :errorMessage="getErrorMsg('excludingEndTime')">
      </text-input>

      <text-input v-model="name"
                  :metadata="metadata.name"
                  :isInvalid="submitted && $v.name.$error"
                  :errorMessage="getErrorMsg('name')">
      </text-input>

      <hr>

      <nav-buttons
        :show-error="showSaveButtonErrorMessage()"
        :on-left-click="validatedSave"
        :on-right-click="validatedSaveContinue"
        continue-text="Save and Back To Retail Tariff"
      />

    </form>
  </div>
</template>

<script>
  import { requiredIf, minValue, maxValue } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF } from '@/router/constants';
  import { CollectionType } from '@/models/Project/CollectionType';
  import { valueInHourRange, valueInMonthRange } from '@/util/validation';

  export default {
    props: ['id'],
    mixins: [wizardFormMixin],
    data() {
      return this.getData(
        CollectionType.RetailTariff, CollectionType.RetailTariff, FINANCIAL_INPUTS_RETAIL_TARIFF,
      );
    },
    validations() {
      return {
        ...this.validationSchema,
        // the 2 excluding Time inputs must BOTH be valid, or BOTH be null/empty
        excludingStartTime: {
          ...this.validationSchema.excludingStartTime,
          required: requiredIf(function isExcludingStartTimeRequired() { // DONE
            return !(this.excludingEndTime === null || this.excludingEndTime === '' || this.excludingEndTime === undefined);
          }),
          minValue: !valueInHourRange(this.startTime) ? 1 : minValue(this.startTime),
          maxValue: !valueInHourRange(this.endTime) ? 24 : maxValue(this.endTime),
        },
        excludingEndTime: {
          ...this.validationSchema.excludingEndTime,
          required: requiredIf(function isExcludingEndTimeRequired() {
            return !(this.excludingStartTime === null || this.excludingStartTime === '' || this.excludingStartTime === undefined);
          }),
          minValue: !valueInHourRange(this.excludingStartTime)
            ? 1 : minValue(this.excludingStartTime),
          maxValue: !valueInHourRange(this.endTime) ? 24 : maxValue(this.endTime),
        },
        endMonth: {
          ...this.validationSchema.endMonth,
          minValue: !valueInMonthRange(this.startMonth) ? 1 : minValue(this.startMonth),
        },
        endTime: {
          ...this.validationSchema.endTime,
          minValue: !valueInHourRange(this.startTime) ? 1 : minValue(this.startTime),
        },
      };
    },
    computed: {
      billingPeriods() {
        return this.$store.state.Project.retailTariffBillingPeriods;
      },
    },
    methods: {
      getDynamicExcludingEndTimeMinValue() {
        if (!valueInHourRange(this.excludingStartTime)) {
          if (!valueInHourRange(this.startTime)) {
            return 1;
          }
          return this.startTime;
        }
        return this.excludingStartTime;
      },
      getErrorMsg(fieldName) {
        // endMonth dynamic validation
        this.metadata.endMonth.minValue = !valueInMonthRange(this.startMonth)
          ? 1 : this.startMonth;
        // endTime dynamic validation
        this.metadata.endTime.minValue = !valueInHourRange(this.startTime)
          ? 1 : this.startTime;
        // excludingStartTime dynamic validation
        this.metadata.excludingStartTime.minValue = !valueInHourRange(this.startTime)
          ? 1 : this.startTime;
        this.metadata.excludingStartTime.maxValue = !valueInHourRange(this.endTime)
          ? 24 : this.endTime;
        // excludingEndTime dynamic validation
        this.metadata.excludingEndTime.minValue = this.getDynamicExcludingEndTimeMinValue();
        // this.metadata.excludingEndTime.minValue = !valueInHourRange(this.excludingStartTime)
        // ? 1 : this.excludingStartTime;
        this.metadata.excludingEndTime.maxValue = !valueInHourRange(this.endTime)
          ? 24 : this.endTime;
        return this.getErrorMsgWrapped(this.validationSchema, this.$v, fieldName);
      },
      getWeekdayFromValue() {
        return this.metadata.weekday.allowedValues.find(type => type.value === this.weekday);
      },
      getChargeTypeFromValue() {
        return this.metadata.chargeType.allowedValues.find(type => type.value === this.chargeType);
      },
      getValueMetadata() {
        // This function changes the unit and label of the "value" field depending on
        // what charge type is selected (energy or demand)
        const chargeTypeAllowedValue = this.getChargeTypeFromValue();
        if (chargeTypeAllowedValue !== undefined) {
          this.metadata.value.displayName = chargeTypeAllowedValue.label;
          this.metadata.value.unit = chargeTypeAllowedValue.unit;
        }
        return this.metadata.value;
      },
      validatedSave() {
        // TODO Do null reset for '' values?
        wizardFormMixin.methods.validatedSave.bind(this)();
      },
      save() {
        this.saveCollectionItem();
      },
    },
  };
</script>
