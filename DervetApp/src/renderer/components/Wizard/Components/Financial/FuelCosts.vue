<template>
  <div>
    <h3>Fuel Costs</h3>
    <hr>

    <div class="align-center error-text-color" v-if="!(isGasRequired || isLiquidRequired || isOtherRequired)">
      <br>
      Please select <b>Fuel Type</b> in fuel-consuming technologies.
    </div>

    <form class="form-horizontal form-buffer">
      <div v-if="isGasRequired">
        <text-input v-model="fuelPriceGas"
                    :metadata="metadata.fuelPriceGas"
                    :isInvalid="submitted && $v.fuelPriceGas.$error"
                    :errorMessage="getErrorMsg('fuelPriceGas')">
        </text-input>
      </div>

      <div v-if="isLiquidRequired">
        <text-input v-model="fuelPriceLiquid"
                    :metadata="metadata.fuelPriceLiquid"
                    :isInvalid="submitted && $v.fuelPriceLiquid.$error"
                    :errorMessage="getErrorMsg('fuelPriceLiquid')">
        </text-input>
      </div>

      <div v-if="isOtherRequired">
        <text-input v-model="fuelPriceOther"
                    :metadata="metadata.fuelPriceOther"
                    :isInvalid="submitted && $v.fuelPriceOther.$error"
                    :errorMessage="getErrorMsg('fuelPriceOther')">
        </text-input>
      </div>

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
  import { requiredIf } from 'vuelidate/lib/validators';
  import { mapGetters } from 'vuex';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import { CollectionType } from '@/models/Project/CollectionType';
  import { FuelType } from '@/models/Project/Metadata/AllowedValues/constants';

  export default {
    mixins: [wizardFormMixin],
    data() { return this.getData(CollectionType.Project, Page.FuelCosts); },
    validations() {
      return {
        ...this.validationSchema,
        fuelPriceGas: {
          ...this.validationSchema.fuelPriceGas,
          required: requiredIf(function isRequired() {
            return this.isGasRequired;
          }),
        },
        fuelPriceLiquid: {
          ...this.validationSchema.fuelPriceLiquid,
          required: requiredIf(function isRequired() {
            return this.isLiquidRequired;
          }),
        },
        fuelPriceOther: {
          ...this.validationSchema.fuelPriceOther,
          required: requiredIf(function isRequired() {
            return this.isOtherRequired;
          }),
        },
      };
    },
    computed: {
      ...mapGetters({ isFuelPriceRequired: 'isFuelPriceRequired' }),
      isGasRequired() { return this.isFuelPriceRequired(FuelType.Gas); },
      isLiquidRequired() { return this.isFuelPriceRequired(FuelType.Liquid); },
      isOtherRequired() { return this.isFuelPriceRequired(FuelType.Other); },
    },
  };
</script>
