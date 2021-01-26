<template>
  <div>
    <h3>Import Retail Tariff</h3>
    <hr>
    <form>
      <div class="form-horizontal form-buffer">

        <!-- TODO provide example template for download -->

        <div class="form-group row">
          <div class="col-md-12">
            <span class="text-danger"><b>Note:</b> Importing will overwrite any existing retail tariff definition.</span>
          </div>
        </div>
        <hr>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="retail-tariff-file">Retail Tariff File</label>
          </div>
          <div class="col-md-9">
            <input
              type="file"
              class="form-control"
              id="retail-tariff-file"
              @change="onFileUpload">
          </div>
        </div>
        <hr>

        <save-and-cancel-buttons
          :back-link="FINANCIAL_INPUTS_RETAIL_TARIFF_PATH"
          backText="Cancel"
          :continueLink="FINANCIAL_INPUTS_RETAIL_TARIFF_PATH"
          continueText="Import Retail Tariff"
          :save="this.save"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import { requiredIf, minValue, maxValue } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import RetailTariffBillingPeriodMetadata, { parsedCsvToBillingPeriods } from '@/models/RetailTariffBillingPeriod';
  import { parseCsvFromEvent } from '@/util/file';
  import SaveAndCancelButtons from '@/components/Shared/SaveAndCancelButtons';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF_PATH } from '@/router/constants';

  const metadata = RetailTariffBillingPeriodMetadata.getHardcodedMetadata();
  const validationz = metadata.toValidationSchema();

  export default {
    mixins: [wizardFormMixin],
    components: { SaveAndCancelButtons },
    data() {
      return {
        metadata,
        ...this.getDefaultData(),
        parsedBillingPeriodCsv: null,
        FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
      };
    },
    validations() {
      return {
        ...validationz,
        // the 2 excluding Time inputs must BOTH be valid, or BOTH be null/empty
        excludingStartTime: {
          ...validationz.excludingStartTime,
          required: requiredIf(function isExcludingStartTimeRequired() {
            return !(this.excludingEndTime === null || this.excludingEndTime === '' || this.excludingEndTime === undefined);
          }),
          minValue: !this.valueInHourRange(this.startTime) ? 1 : minValue(this.startTime),
          maxValue: !this.valueInHourRange(this.endTime) ? 24 : maxValue(this.endTime),
        },
        excludingEndTime: {
          ...validationz.excludingEndTime,
          required: requiredIf(function isExcludingEndTimeRequired() {
            return !(this.excludingStartTime === null || this.excludingStartTime === '' || this.excludingStartTime === undefined);
          }),
          minValue: !this.valueInHourRange(this.excludingStartTime)
            ? 1 : minValue(this.excludingStartTime),
          maxValue: !this.valueInHourRange(this.endTime) ? 24 : maxValue(this.endTime),
        },
        endMonth: {
          ...validationz.endMonth,
          minValue: !this.valueInMonthRange(this.startMonth) ? 1 : minValue(this.startMonth),
        },
        endTime: {
          ...validationz.endTime,
          minValue: !this.valueInHourRange(this.startTime) ? 1 : minValue(this.startTime),
        },
      };
    },
    beforeMount() {
      this.$v.$touch();
    },
    methods: {
      valueInRange(value, lowValue, highValue) {
        return (value >= lowValue && value <= highValue);
      },
      valueInHourRange(value) {
        return this.valueInRange(value, 1, 24);
      },
      valueInMonthRange(value) {
        return this.valueInRange(value, 1, 12);
      },
      getDefaultData() {
        return metadata.getDefaultValues();
      },
      onFileUpload(e) {
        const onSuccess = (results) => { this.parsedBillingPeriodCsv = results; };
        parseCsvFromEvent(e, onSuccess);
      },
      save() {
        const pds = parsedCsvToBillingPeriods(this.parsedBillingPeriodCsv);
        this.$store.dispatch('replaceRetailTariffBillingPeriods', pds);

        // validate each row, by setting complete to true or false
        Object.values(pds).forEach((row) => {
          Object.keys(row).forEach((key) => {
            this[key] = row[key];
          });
          this.$v.$touch();
          const payload = {
            id: row.id,
            isRowComplete: !this.$v.$anyError,
          };
          this.$store.dispatch('setRowCompletenessRetailTariffBillingPeriod', payload);
        });
      },
    },
  };
</script>
