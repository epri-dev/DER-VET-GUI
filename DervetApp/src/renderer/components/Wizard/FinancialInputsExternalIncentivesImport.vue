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
          backLink="/wizard/financial-inputs-external-incentives"
          backText="Cancel"
          continueLink="/wizard/financial-inputs-external-incentives"
          continueText="Import External Incentives"
          :save="this.save"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import { parsedCsvToExternalIncentives } from '@/models/ExternalIncentives';
  import { parseCsvFromFile } from '@/util/helpers';
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    data() {
      return {
        parsedExternalIncentiveCsv: null,
      };
    },
    methods: {
      onFileUpload(e) {
        const onSuccess = (results) => { this.parsedExternalIncentiveCsv = results; };
        parseCsvFromFile(e, onSuccess);
      },
      save() {
        const eis = parsedCsvToExternalIncentives(this.parsedExternalIncentiveCsv);
        this.$store.dispatch('replaceExternalIncentives', eis);
      },
    },
  };
</script>
