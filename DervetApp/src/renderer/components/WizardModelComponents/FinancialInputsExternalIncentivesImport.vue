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
            <label class="control-label" for="external-incentives-file">External Incentives File</label>
          </div>
          <div class="col-md-9">
            <input
              type="file"
              class="form-control"
              id="external-incentives-file"
              @change="onFileUpload">
          </div>
        </div>
        <hr>

        <cancel-and-save-buttons
          :backLink="FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH"
          backText="Cancel"
          :disabled="importDisabled()"
          continueText="Import External Incentives"
          :displayError="importDisabled()"
          :errorText="importError"
          :save="this.save"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import ExternalIncentivesMetadata, { parsedCsvToExternalIncentives } from '@/models/ExternalIncentives';
  import { parseCsvFromEvent } from '@/util/file';
  import CancelAndSaveButtons from '@/components/Shared/CancelAndSaveButtons';
  import { FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH } from '@/router/constants';

  const metadata = ExternalIncentivesMetadata.getHardcodedMetadata();
  const validationz = metadata.toValidationSchema();

  export default {
    components: { CancelAndSaveButtons },
    data() {
      return {
        metadata,
        ...this.getDefaultData(),
        parsedExternalIncentivesCsv: null,
        importError: undefined,
        importedFilePath: null,
        FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH,
      };
    },
    validations() {
      return {
        ...validationz,
      };
    },
    beforeMount() {
      this.$v.$touch();
    },
    methods: {
      compileImportNotes(importNotes) {
        // add source (file path) to the list
        importNotes.push(`source: ${this.importedFilePath}`);
        return importNotes;
      },
      getDefaultData() {
        return metadata.getDefaultValues();
      },
      getMinimumYear() {
        if (!this.$store.state.Project.startYear) {
          return 0;
        }
        return this.$store.state.Project.startYear + 1;
      },
      isRowComplete() {
        this.$v.$touch();
        if (this.$v.$anyError === true) {
          return false;
        }
        // secondary validation checks for dynamic fields
        if (this.year < this.getMinimumYear()) {
          return false;
        }
        return true;
      },
      onFileUpload(e) {
        const onSuccess = (results, importedFilePath, errors) => {
          // 1st argument is data
          this.parsedExternalIncentivesCsv = results;
          // 2nd argument is the full path of the imported file
          this.importedFilePath = importedFilePath;
          // 3rd argument will remain undefined when file is successfully imported
          this.importError = errors;
        };
        parseCsvFromEvent(e, onSuccess);
      },
      importDisabled() {
        return this.importError !== undefined;
      },
      save() {
        // obtain data and import notes
        const eisObject = parsedCsvToExternalIncentives(this.parsedExternalIncentivesCsv);
        const fileImportNotes = this.compileImportNotes(eisObject.fileImportNotes);
        const eis = eisObject.csvValues;
        if (eis.length > 0) {
          // validate each row, by setting complete to true or false
          Object.values(eis).forEach((row) => {
            // redefine data for each column of this row (needed for vuelidate to work)
            Object.keys(row).forEach((key) => {
              this[key] = row[key];
            });
            row.complete = this.isRowComplete();
          });
        }
        // complete this mutation before navigation to next page
        this.$store.dispatch('replaceExternalIncentives', eis)
          .then(this.$store.dispatch('replaceExternalIncentivesFileImportNotes', fileImportNotes))
          .then(this.$router.push({ path: FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH }));
      },
    },
  };
</script>
