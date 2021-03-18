<template>
  <div>
    <h3>External Incentives: Add Data for Year</h3>
    <hr>
    <form class="form-horizontal form-buffer">

      <text-input v-model="year"
                  v-bind:field="metadata.year"
                  :isInvalid="submitted && $v.year.$error"
                  :errorMessage="getErrorMsg('year')">
      </text-input>

      <text-input v-model="taxCredit"
                  v-bind:field="metadata.taxCredit"
                  :isInvalid="submitted && $v.taxCredit.$error"
                  :errorMessage="getErrorMsg('taxCredit')">
      </text-input>

      <text-input v-model="otherIncentive"
                  v-bind:field="metadata.otherIncentive"
                  :isInvalid="submitted && $v.otherIncentive.$error"
                  :errorMessage="getErrorMsg('otherIncentive')">
      </text-input>
      <hr>

      <save-and-nav-buttons
        :displayError="submitted && $v.$anyError"
        :save="validatedSave"
        :continue-link="FINANCIAL_INPUTS_EXTERNAL_INCENTIVES"
        continue-text="Save and Back To External Incentives" />

    </form>
  </div>
</template>

<script>
  import { minValue } from 'vuelidate/lib/validators';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import ExternalIncentivesMetadata from '@/models/ExternalIncentives';
  import { FINANCIAL_INPUTS_EXTERNAL_INCENTIVES } from '@/router/constants';
  import { getSingleErrorMsg } from '@/util/validation';

  const metadata = ExternalIncentivesMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  const PAGEGROUP = 'components';
  const PAGEKEY = 'financial';
  const PAGE = 'externalIncentives';
  const TABLE_ITEM_NAME = 'external incentive periods';

  export default {
    props: ['incentiveId'],
    mixins: [wizardFormMixin],
    data() {
      if (this.isNewExternalIncentive()) {
        return {
          metadata,
          ...this.getDefaultData(),
          FINANCIAL_INPUTS_EXTERNAL_INCENTIVES,
        };
      }
      return {
        metadata,
        ...this.getDataFromProject(),
        FINANCIAL_INPUTS_EXTERNAL_INCENTIVES,
      };
    },
    validations() {
      return {
        ...validations,
        year: {
          ...validations.year,
          minValue: minValue(this.getMinimumYear()),
        },
      };
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (this.complete !== null) {
        this.submitted = true;
        this.$v.$touch();
      }
    },
    computed: {
      externalIncentives() {
        return this.$store.state.Project.externalIncentives;
      },
      errorMessage() {
        return getSingleErrorMsg(this.externalIncentives, TABLE_ITEM_NAME);
      },
    },
    methods: {
      getCompletenessPayload() {
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          completeness: this.complete,
        };
      },
      getErrorListPayload() {
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          errorList: this.errorMessage === '' ? [] : [this.errorMessage],
        };
      },
      getDefaultData() {
        return metadata.getDefaultValues();
      },
      getDataFromProject() {
        const incentive = this.$store.getters.getListFieldById('externalIncentives', this.incentiveId);
        return this.unpackData(incentive);
      },
      getErrorMsg(fieldName) {
        // this.metadata.year.minValue = `the project start year (${this.getMinimumYear()})`;
        this.metadata.year.minValue = this.getMinimumYear();
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getMinimumYear() {
        if (!this.$store.state.Project.startYear) {
          return 0;
        }
        return this.$store.state.Project.startYear + 1;
      },
      isNewExternalIncentive() {
        return this.incentiveId === 'null';
      },
      unpackData(source) {
        return {
          id: source.id,
          year: source.year,
          taxCredit: source.taxCredit,
          otherIncentive: source.otherIncentive,
          complete: source.complete,
        };
      },
      validatedSave() {
        this.$v.$touch();
        // set complete to true or false
        this.complete = !this.$v.$invalid;
        if (this.isNewExternalIncentive() && this.submitted !== true) {
          // add new row
          this.$store.dispatch('addExternalIncentive', this.buildExternalIncentives());
        } else {
          // replace a row
          const payload = {
            id: this.id,
            field: 'externalIncentives',
            newListItem: this.buildExternalIncentives(),
          };
          this.$store.dispatch('replaceListField', payload);
        }
        this.submitted = true;
        // set retail tariff completeness and errorList
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
      },
      // saveAndAdd() {
      // reload page ? (reset form)
      // },
      buildExternalIncentives() {
        return new ExternalIncentivesMetadata({
          year: this.year,
          taxCredit: this.taxCredit,
          otherIncentive: this.otherIncentive,
          id: this.id,
          complete: this.complete,
        });
      },
    },
  };
</script>
