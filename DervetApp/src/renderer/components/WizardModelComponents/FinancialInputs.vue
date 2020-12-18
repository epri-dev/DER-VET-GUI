<template>
  <div>
    <h3>CBA Inputs</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="financeDiscountRate"
                  v-bind:field="metadata.financeDiscountRate"
                  :isInvalid="submitted && $v.financeDiscountRate.$error"
                  :errorMessage="getErrorMsg('financeDiscountRate')">
      </text-input>

      <text-input v-model="financeInflationRate"
                  v-bind:field="metadata.financeInflationRate"
                  :isInvalid="submitted && $v.financeInflationRate.$error"
                  :errorMessage="getErrorMsg('financeInflationRate')">
      </text-input>

      <text-input v-model="financeFederalTaxRate"
                  v-bind:field="metadata.financeFederalTaxRate"
                  :isInvalid="submitted && $v.financeFederalTaxRate.$error"
                  :errorMessage="getErrorMsg('financeFederalTaxRate')">
      </text-input>

      <text-input v-model="financeStateTaxRate"
                  v-bind:field="metadata.financeStateTaxRate"
                  :isInvalid="submitted && $v.financeStateTaxRate.$error"
                  :errorMessage="getErrorMsg('financeStateTaxRate')">
      </text-input>

      <text-input v-model="financePropertyTaxRate"
                  v-bind:field="metadata.financePropertyTaxRate"
                  :isInvalid="submitted && $v.financePropertyTaxRate.$error"
                  :errorMessage="getErrorMsg('financePropertyTaxRate')">
      </text-input>

      <hr>

      <save-buttons
        :continue-link="WIZARD_COMPONENT_PATH"
        :displayError="submitted && $v.$anyError"
        :save="validatedSave" />

    </form>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import * as p from '@/models/Project/Project';
  import * as c from '@/models/Project/constants';
  import operateOnKeysList from '@/util/object';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.FINANCE_FIELDS);

  export default {
    mixins: [wizardFormMixin],
    data() {
      return {
        metadata,
        ...this.getDataFromProject(),
        WIZARD_COMPONENT_PATH,
      };
    },
    validations: {
      ...validations,
    },
    computed: {
      complete() {
        return this.$store.state.Application.pageCompleteness.components.financial.inputs;
      },
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (this.complete !== null && this.complete !== undefined) {
        this.submitted = true;
        this.$v.$touch();
      }
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getDataFromProject() {
        return operateOnKeysList(this.$store.state.Project, c.FINANCE_FIELDS, f => f);
      },
      getCompletenessPayload() {
        return {
          pageGroup: 'components',
          pageKey: 'financial',
          page: 'inputs',
          completeness: !this.$v.$invalid,
        };
      },
      getErrorListPayload() {
        const errors = [];
        Object.keys(this.$v).forEach((key) => {
          if (key.charAt(0) !== '$' && this.$v[key].$invalid) {
            errors.push(this.getErrorMsg(key));
          }
        });
        return {
          pageGroup: 'components',
          pageKey: 'financial',
          page: 'inputs',
          errorList: errors,
        };
      },
      validatedSave() {
        // set completeness
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.submitted = true;
        this.$v.$touch();
        // set errorList
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        return this.save();
      },
      save() {
        this.$store.dispatch('setDiscountRate', this.financeDiscountRate);
        this.$store.dispatch('setInflationRate', this.financeInflationRate);
        this.$store.dispatch('setFederalTaxRate', this.financeFederalTaxRate);
        this.$store.dispatch('setStateTaxRate', this.financeStateTaxRate);
        this.$store.dispatch('setPropertyTaxRate', this.financePropertyTaxRate);
      },
    },
  };
</script>
