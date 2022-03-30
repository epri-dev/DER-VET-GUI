<template>
  <div>
    <h3>External Incentives: Add Data for Year</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="year"
                  :metadata="metadata.year"
                  :isInvalid="submitted && $v.year.$error"
                  :errorMessage="getErrorMsg('year')">
      </text-input>

      <text-input v-model="taxCredit"
                  :metadata="metadata.taxCredit"
                  :isInvalid="submitted && $v.taxCredit.$error"
                  :errorMessage="getErrorMsg('taxCredit')">
      </text-input>

      <text-input v-model="otherIncentive"
                  :metadata="metadata.otherIncentive"
                  :isInvalid="submitted && $v.otherIncentive.$error"
                  :errorMessage="getErrorMsg('otherIncentive')">
      </text-input>
      <hr>

      <nav-buttons
        :show-error="showSaveButtonErrorMessage()"
        :on-left-click="validatedSave"
        :on-right-click="validatedSaveContinue"
        continue-text="Save and Back To External Incentives" />

    </form>
  </div>
</template>

<script>
  import { minValue } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import { FINANCIAL_INPUTS_EXTERNAL_INCENTIVES } from '@/router/constants';
  import { CollectionType } from '@/models/Project/CollectionType';

  export default {
    props: ['id'],
    mixins: [wizardFormMixin],
    data() {
      return this.getData(
        CollectionType.ExternalIncentive,
        CollectionType.ExternalIncentive,
        FINANCIAL_INPUTS_EXTERNAL_INCENTIVES,
      );
    },
    validations() {
      return {
        ...this.validationSchema,
        year: {
          ...this.validationSchema.year,
          minValue: minValue(this.getMinimumYear()),
        },
      };
    },
    methods: {
      getErrorMsg(fieldName) {
        this.metadata.year.minValue = this.getMinimumYear();
        return this.getErrorMsgWrapped(this.validationSchema, this.$v, fieldName);
      },
      getMinimumYear() {
        if (!this.$store.state.Project.startYear) {
          return 0;
        }
        return this.$store.state.Project.startYear + 1;
      },
      validatedSave() {
        // TODO Do null reset for '' values?
        wizardFormMixin.methods.validatedSave.bind(this)();
      },
      save() {
        this.saveCollectionItem();
      },
    },
  };
</script>
