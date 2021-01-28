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
          continueText="Import Retail Tariff"
          :save="this.save"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';
  import RetailTariffBillingPeriodMetadata, { parsedCsvToBillingPeriods } from '@/models/RetailTariffBillingPeriod';
  import { parseCsvFromEvent } from '@/util/file';
  import SaveAndCancelButtons from '@/components/Shared/SaveAndCancelButtons';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF_PATH } from '@/router/constants';

  const metadata = RetailTariffBillingPeriodMetadata.getHardcodedMetadata();
  const validationz = metadata.toValidationSchema();

  export default {
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
        },
        excludingEndTime: {
          ...validationz.excludingEndTime,
          required: requiredIf(function isExcludingEndTimeRequired() {
            return !(this.excludingStartTime === null || this.excludingStartTime === '' || this.excludingStartTime === undefined);
          }),
        },
      };
    },
    beforeMount() {
      // this.$v.$reset();
      this.$v.$touch();
    },
    methods: {
      getDefaultData() {
        return metadata.getDefaultValues();
      },
      isRowComplete() {
        this.$v.$touch();
        if (this.$v.$anyError === true) {
          return false;
        }
        // secondary validation checks on allowed values
        if ((this.metadata.chargeType.allowedValues
          .find(type => type.value === this.chargeType) === undefined)
          || (this.metadata.weekday.allowedValues
            .find(type => type.value === this.weekday) === undefined)) {
          return false;
        }
        // secondary validation checks for dynamic fields
        if ((this.startMonth > this.endMonth)
          || (this.startTime > this.endTime)) {
          return false;
        }
        if (this.excludingStartTime) {
          if ((this.excludingStartTime > this.excludingEndTime)
            || (this.excludingStartTime < this.startTime)
            || (this.excludingStartTime > this.endTime)
            || (this.excludingEndTime < this.startTime)
            || (this.excludingEndTime > this.endTime)) {
            return false;
          }
        }
        return true;
      },
      onFileUpload(e) {
        const onSuccess = (results) => { this.parsedBillingPeriodCsv = results; };
        parseCsvFromEvent(e, onSuccess);
      },
      save() {
        const pds = parsedCsvToBillingPeriods(this.parsedBillingPeriodCsv);
        // validate each row, by setting complete to true or false
        Object.values(pds).forEach((row) => {
          // redefine data for each column of this row (needed for vuelidate to work)
          Object.keys(row).forEach((key) => {
            this[key] = row[key];
          });
          row.complete = this.isRowComplete();
        });
        // complete this mutation before navigation to next page
        this.$store.dispatch('replaceRetailTariffBillingPeriods', pds)
          .then(this.$router.push({ path: FINANCIAL_INPUTS_RETAIL_TARIFF_PATH }));
      },
    },
  };
</script>
