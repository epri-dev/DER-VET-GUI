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

        <nav-buttons
          left-text="Cancel"
          right-text="Import"
          :error-text="error"
          :on-left-click="navigateToExternalIncentives"
          :on-right-click="save"
          :disabled="isImportDisabled()"
          :show-error="isImportDisabled()"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import NavButtons from '@/components/Shared/NavButtons';
  import {
    validateExternalIncentivesCsv,
    csvToExternalIncentives,
  } from '@/models/Project/Metadata/Finances/ExternalIncentives';
  import { CollectionType } from '@/models/Project/CollectionType';
  import { FINANCIAL_INPUTS_EXTERNAL_INCENTIVES } from '@/router/constants';
  import * as a from '@/store/actionTypes';
  import { parseCsvFromEvent } from '@/util/file';
  import { trimEmptyRows } from '@/util/project';

  export default {
    components: { NavButtons },
    data() {
      return {
        data: null,
        error: null,
        importedFilePath: null,
        FINANCIAL_INPUTS_EXTERNAL_INCENTIVES,
      };
    },
    methods: {
      isImportDisabled() {
        return this.error !== undefined || this.importedFilePath === null;
      },
      onFileUpload(e) {
        const onSuccess = (results, importedFilePath, errors) => {
          this.data = trimEmptyRows(results);
          this.importedFilePath = importedFilePath;
          this.error = errors;
        };
        parseCsvFromEvent(e, onSuccess);
      },
      save() {
        const validationError = validateExternalIncentivesCsv(this.data);
        if (validationError === null) {
          const externalIncentives = csvToExternalIncentives(this.data);
          this.addImportedExternalIncentivesToProject(externalIncentives)
            .then(this.navigateToExternalIncentives());
        } else {
          this.error = validationError;
        }
      },
      addImportedExternalIncentivesToProject(externalIncentives) {
        const payload = this.makeExternalIncentivesPayload(externalIncentives);
        return this.$store.dispatch(a.REMOVE_ALL_COLLECTION_ITEMS, CollectionType.ExternalIncentive)
          .then(this.$store.dispatch(a.ADD_MANY_COLLECTION_ITEMS, payload));
      },
      navigateToExternalIncentives() {
        this.$router.push({ path: FINANCIAL_INPUTS_EXTERNAL_INCENTIVES });
      },
      makeExternalIncentivesPayload(incentives) {
        return {
          collectionType: CollectionType.ExternalIncentive,
          valuesList: incentives,
        };
      },
    },
  };
</script>
