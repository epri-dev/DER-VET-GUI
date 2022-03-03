<template>
  <div>
    <h3>CBA Inputs</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="financeDiscountRate"
                  :metadata="metadata.financeDiscountRate"
                  :isInvalid="submitted && $v.financeDiscountRate.$error"
                  :errorMessage="getErrorMsg('financeDiscountRate')">
      </text-input>

      <text-input v-model="financeInflationRate"
                  :metadata="metadata.financeInflationRate"
                  :isInvalid="submitted && $v.financeInflationRate.$error"
                  :errorMessage="getErrorMsg('financeInflationRate')">
      </text-input>

      <text-input v-model="financeFederalTaxRate"
                  :metadata="metadata.financeFederalTaxRate"
                  :isInvalid="submitted && $v.financeFederalTaxRate.$error"
                  :errorMessage="getErrorMsg('financeFederalTaxRate')">
      </text-input>

      <text-input v-model="financeStateTaxRate"
                  :metadata="metadata.financeStateTaxRate"
                  :isInvalid="submitted && $v.financeStateTaxRate.$error"
                  :errorMessage="getErrorMsg('financeStateTaxRate')">
      </text-input>

      <text-input v-model="financePropertyTaxRate"
                  :metadata="metadata.financePropertyTaxRate"
                  :isInvalid="submitted && $v.financePropertyTaxRate.$error"
                  :errorMessage="getErrorMsg('financePropertyTaxRate')">
      </text-input>
      <!-- add an "other tax" box -->
      <!-- add an "hide federal/state" box -->

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
  import { CollectionType } from '@/models/Project/CollectionType';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return this.getData(CollectionType.Project, Page.Financial);
    },
  };
</script>
