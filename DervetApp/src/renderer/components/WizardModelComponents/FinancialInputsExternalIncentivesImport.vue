<template>
  <div>
    <h3>Import External Incentives</h3>
    <hr>
    <form>
      <div class="form-horizontal form-buffer">

        <!-- TODO provide example template for download -->

        <div class="form-group row">
          <div class="col-md-12">
            <span class="text-danger"><b>Note:</b> Importing will overwrite any existing external incentives.</span>
          </div>
        </div>
        <hr>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="retail-tariff-file">External Incentives File</label>
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
          :backLink="FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH"
          backText="Cancel"
          :continueLink="FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH"
          continueText="Import External Incentives"
          :save="this.save"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import { parsedCsvToExternalIncentives } from '@/models/ExternalIncentives';
  import { parseCsvFromEvent } from '@/util/file';
  import NavButtons from '@/components/Shared/NavButtons';
  import { FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH } from '@/router/constants';

  export default {
    components: { NavButtons },
    data() {
      return {
        parsedExternalIncentiveCsv: null,
        FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH,
      };
    },
    methods: {
      onFileUpload(e) {
        const onSuccess = (results) => { this.parsedExternalIncentiveCsv = results; };
        parseCsvFromEvent(e, onSuccess);
      },
      save() {
        const eis = parsedCsvToExternalIncentives(this.parsedExternalIncentiveCsv);
        this.$store.dispatch('replaceExternalIncentives', eis);
      },
    },
  };
</script>
