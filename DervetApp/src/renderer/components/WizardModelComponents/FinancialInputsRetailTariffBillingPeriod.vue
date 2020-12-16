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

      <save-buttons
        :continue-link="`${FINANCIAL_INPUTS_RETAIL_TARIFF_PATH}-billing-period/null`"
        continue-text="Save and Add Another Billing Period"
        :displayError="submitted && $v.$anyError"
        :save="validatedSave" />

      <nav-buttons
        :continue-link="FINANCIAL_INPUTS_RETAIL_TARIFF_PATH"
        continue-text="Back To Retail Tariff" />

    </form>
  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import RetailTariffBillingPeriodMetadata from '@/models/RetailTariffBillingPeriod';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF_PATH } from '@/router/constants';
  import RetailTariffButtons from '@/components/Shared/RetailTariffButtons';

  const metadata = RetailTariffBillingPeriodMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  export default {
    components: { RetailTariffButtons },
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
    validations: {
      ...validations,
      // the 2 excluding Time inputs must BOTH be valid, or BOTH be null/empty
      excludingStartTime: {
        ...validations.excludingStartTime,
        required: requiredIf(function isExcludingStartTimeRequired() {
          return !(this.excludingEndTime === null || this.excludingEndTime === '' || this.excludingEndTime === undefined);
        }),
      },
      excludingEndTime: {
        ...validations.excludingEndTime,
        required: requiredIf(function isExcludingEndTimeRequired() {
          return !(this.excludingStartTime === null || this.excludingStartTime === '' || this.excludingStartTime === undefined);
        }),
      },
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (this.complete !== null) {
        this.submitted = true;
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
        const pd = this.$store.getters.getListFieldById('retailTariffBillingPeriods', this.billingPeriodId);
        return this.unpackData(pd);
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getChargeTypeFromValue() {
        return this.metadata.chargeType.allowedValues.find(type => type.value === this.chargeType);
      },
      getMetadataValue() {
        const allowedValues = this.getChargeTypeFromValue();
        if (allowedValues !== undefined) {
          this.metadata.value.displayName = allowedValues.label;
          this.metadata.value.unit = allowedValues.unit;
        } else {
          this.metadata.value.displayName = this.metadata.value.initDisplayName;
          this.metadata.value.unit = this.metadata.value.initUnit;
        }
        return this.metadata.value;
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
