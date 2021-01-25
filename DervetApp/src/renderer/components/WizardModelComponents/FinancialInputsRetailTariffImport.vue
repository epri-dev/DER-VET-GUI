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
  import RetailTariffBillingPeriodMetadata, { parsedCsvToBillingPeriods } from '@/models/RetailTariffBillingPeriod';
  import { parseCsvFromEvent } from '@/util/file';
  import SaveAndCancelButtons from '@/components/Shared/SaveAndCancelButtons';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF_PATH } from '@/router/constants';

  const metadata = RetailTariffBillingPeriodMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  export default {
    components: { SaveAndCancelButtons },
    data() {
      return {
        parsedBillingPeriodCsv: null,
        FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
      };
    },
    validations() {
      return {
        ...validations,
      };
    },
    methods: {
      onFileUpload(e) {
        const onSuccess = (results) => { this.parsedBillingPeriodCsv = results; };
        parseCsvFromEvent(e, onSuccess);
        console.log('-------> e');
        console.log(typeof e);
        console.log(e);
        console.log('-------> onSuccess');
        console.log(typeof onSuccess);
        console.log(onSuccess);
      },
      save() {
        console.log('-------> this.parsedBillingPeriodCsv');
        console.log(typeof this.parsedBillingPeriodCsv);
        console.log(this.parsedBillingPeriodCsv);
        const pds = parsedCsvToBillingPeriods(this.parsedBillingPeriodCsv);
        console.log('-------> pds');
        console.log(typeof pds);
        console.log(pds);
        // validate each row, by setting complete to true or false
        // pds[0].complete = true;
        Object.values(pds).forEach((row) => {
          row.complete = this.isValidRow(row);
        });

        this.$store.dispatch('replaceRetailTariffBillingPeriods', pds);
      },
      isValidRow(row) {
        this.$v.$reset();
        console.log(JSON.stringify(row));
        console.log(JSON.stringify(this.startMonth));
        this.$v.startMonth.$model = row.startMonth;
        console.log(JSON.stringify(this.$v.startMonth.$model));
        this.$v.$touch();
        console.log(JSON.stringify(this.$v.startMonth.$model));
        console.log(JSON.stringify(this.$v.startMonth.$dirty));
        console.log(JSON.stringify(this.$v.$dirty));

        // this.startMonth = row.startMonth;
        // this.$v.$reset();
        console.log('-------> this.$v 0');
        console.log(typeof this.$v);
        console.log(this.$v);
        // this.$v.$touch();
        // console.log('-------> this.$v 1');
        // console.log(typeof this.$v);
        // console.log(this.$v);
        if (row.startMonth === 1) {
          return true;
        }
        return !(this.$v.$invalid);
      },
    },
  };
</script>
