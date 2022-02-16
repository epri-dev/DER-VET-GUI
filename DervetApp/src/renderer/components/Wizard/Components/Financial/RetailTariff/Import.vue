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
          left-text="Cancel"
          right-text="Import"
          :error-text="error"
          :on-right-click="save"
          :on-left-click="save"
          :disabled="isImportDisabled()"
          :show-error="isImportDisabled()"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import NavButtons from '@/components/Shared/NavButtons';
  import CollectionTypes from '@/models/Project/CollectionTypes';
  import {
    validateRetailTariffCsv,
    csvToRetailTariff,
  } from '@/models/Project/Metadata/Finances/RetailTariffBillingPeriod';
  import * as a from '@/store/actionTypes';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF } from '@/router/constants';
  import { parseCsvFromEvent } from '@/util/file';
  import { trimEmptyRows } from '@/util/project';

  export default {
    components: { NavButtons },
    data() {
      return {
        data: null,
        error: null,
        importedFilePath: null,
        FINANCIAL_INPUTS_RETAIL_TARIFF,
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
        const validationError = validateRetailTariffCsv(this.data);
        if (validationError === null) {
          const retailTariff = csvToRetailTariff(this.data);
          this.addRetailTariffToProject(retailTariff)
            .then(this.navigateToRetailTariff());
        } else {
          this.error = validationError;
        }
      },
      addRetailTariffToProject(values) {
        const payload = this.makePayload(values);
        return this.$store.dispatch(a.REMOVE_ALL_COLLECTION_ITEMS, CollectionTypes.RetailTariff)
          .then(this.$store.dispatch(a.ADD_MANY_COLLECTION_ITEMS, payload));
      },
      navigateToRetailTariff() {
        this.$router.push({ path: FINANCIAL_INPUTS_RETAIL_TARIFF });
      },
      makePayload(valuesList) {
        return {
          collectionType: CollectionTypes.RetailTariff, valuesList,
        };
      },
    },
  };
</script>
