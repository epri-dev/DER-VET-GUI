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

        <nav-buttons
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
  import { parsedCsvToBillingPeriods } from '@/models/RetailTariffBillingPeriod';
  import { parseCsvFromFile } from '@/util/file';
  import NavButtons from '@/components/Shared/NavButtons';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF_PATH } from '@/router/constants';


  export default {
    components: { NavButtons },
    data() {
      return {
        parsedBillingPeriodCsv: null,
        FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
      };
    },
    methods: {
      onFileUpload(e) {
        const onSuccess = (results) => { this.parsedBillingPeriodCsv = results; };
        parseCsvFromFile(e, onSuccess);
      },
      save() {
        const pds = parsedCsvToBillingPeriods(this.parsedBillingPeriodCsv);
        this.$store.dispatch('replaceRetailTariffBillingPeriods', pds);
      },
    },
  };
</script>
