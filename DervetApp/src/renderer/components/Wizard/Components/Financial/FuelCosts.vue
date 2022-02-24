<template>
  <div>
    <h3>Fuel Costs</h3>
    <hr>
    <form class="form-horizontal form-buffer">
      <!-- https://www.digitalocean.com/community/tutorials/how-to-create-reusable-blocks-of-code-with-vue-single-file-components -->
      <text-input v-model="fuelPriceGas"
                  :metadata="metadata.fuelPriceGas"
                  :isInvalid="submitted && $v.fuelPriceGas.$error"
                  :errorMessage="getErrorMsg('fuelPriceGas')">
      </text-input>

      <text-input v-model="fuelPriceLiquid"
                  :metadata="metadata.fuelPriceLiquid"
                  :isInvalid="submitted && $v.fuelPriceLiquid.$error"
                  :errorMessage="getErrorMsg('fuelPriceLiquid')">
      </text-input>

      <text-input v-model="fuelPriceOther"
                  :metadata="metadata.fuelPriceOther"
                  :isInvalid="submitted && $v.fuelPriceOther.$error"
                  :errorMessage="getErrorMsg('fuelPriceOther')">
      </text-input>

      <hr>

      <nav-buttons
        :show-error="showSaveButtonErrorMessage()"
        :on-left-click="validatedSave"
        :on-right-click="validatedSaveContinue"
      />
    </form>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import CollectionTypes from '@/models/Project/CollectionTypes';

  export default {
    mixins: [wizardFormMixin],
    data() { return this.getData(CollectionTypes.Project, Page.FuelCosts); },
  };
</script>
