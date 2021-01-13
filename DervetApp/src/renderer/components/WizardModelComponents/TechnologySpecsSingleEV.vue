<template>
  <div>
    <h3>Technology Specs: Internal Combustion Engine Generator</h3>
    <hr />
    <form>
      <div class="form-horizontal form-buffer container">

        <!-- TODO
          - DRY more by just passing the field and generating parameters
          - use nameData.getErrorMsg
        -->
        <text-input
          v-model="name"
          v-bind:field="metadata.name"
          :isInvalid="submitted && $v.name.$error"
          :errorMessage="getErrorMsg('name')">
        </text-input>

        <text-input
          v-model="numGenerators"
          v-bind:field="metadata.numGenerators"
          :isInvalid="submitted && $v.numGenerators.$error"
          :errorMessage="getErrorMsg('numGenerators')">
        </text-input>

        <radio-button-input
          v-model="shouldSize"
          v-bind:field="metadata.shouldSize"
          :isInvalid="submitted && $v.shouldSize.$error"
          :errorMessage="getErrorMsg('shouldSize')">
        </radio-button-input>

        <div v-if="shouldSize === false">
          <text-input
            v-model="ratedCapacity"
            v-bind:field="metadata.ratedCapacity"
            :isInvalid="submitted && $v.ratedCapacity.$error"
            :errorMessage="getErrorMsg('ratedCapacity')">
          </text-input>
        </div>

        <div v-if="shouldSize === true">
          <radio-button-input
            v-model="includeSizeLimits"
            v-bind:field="metadata.includeSizeLimits"
            :isInvalid="submitted && $v.includeSizeLimits.$error"
            :errorMessage="getErrorMsg('includeSizeLimits')">
          </radio-button-input>

          <div v-if="includeSizeLimits === true">
            <text-input
              v-model="ratedCapacityMaximum"
              v-bind:field="metadata.ratedCapacityMaximum"
              :isInvalid="submitted && $v.ratedCapacityMaximum.$error"
              :errorMessage="getErrorMsg('ratedCapacityMaximum')">
            </text-input>

            <text-input
              v-model="ratedCapacityMinimum"
              v-bind:field="metadata.ratedCapacityMinimum"
              :isInvalid="submitted && $v.ratedCapacityMinimum.$error"
              :errorMessage="getErrorMsg('ratedCapacityMinimum')">
            </text-input>
          </div>
        </div>

        <text-input
          v-model="minimumPower"
          v-bind:field="metadata.minimumPower"
          :isInvalid="submitted && $v.minimumPower.$error"
          :errorMessage="getErrorMsg('minimumPower')">
        </text-input>

        <text-input
          v-model="efficiency"
          v-bind:field="metadata.efficiency"
          :isInvalid="submitted && $v.efficiency.$error"
          :errorMessage="getErrorMsg('efficiency')">
        </text-input>

        <text-input
          v-model="fuelCost"
          v-bind:field="metadata.fuelCost"
          :isInvalid="submitted && $v.fuelCost.$error"
          :errorMessage="getErrorMsg('fuelCost')">
        </text-input>

        <fieldset class="section-group">
          <legend>Cost Function</legend>

          <text-input
            v-model="capitalCost"
            v-bind:field="metadata.capitalCost"
            :isInvalid="submitted && $v.capitalCost.$error"
            :errorMessage="getErrorMsg('capitalCost')">
          </text-input>

          <text-input
            v-model="capitalCostPerkW"
            v-bind:field="metadata.capitalCostPerkW"
            :isInvalid="submitted && $v.capitalCostPerkW.$error"
            :errorMessage="getErrorMsg('capitalCostPerkW')">
          </text-input>

        </fieldset>

        <text-input
          v-model="variableOMCost"
          v-bind:field="metadata.variableOMCost"
          :isInvalid="submitted && $v.variableOMCost.$error"
          :errorMessage="getErrorMsg('variableOMCost')">
        </text-input>

        <text-input
          v-model="fixedOMCostIncludingExercise"
          v-bind:field="metadata.fixedOMCostIncludingExercise"
          :isInvalid="submitted && $v.fixedOMCostIncludingExercise.$error"
          :errorMessage="getErrorMsg('fixedOMCostIncludingExercise')">
        </text-input>

        <text-input
          v-model="constructionYear"
          v-bind:field="metadata.constructionYear"
          :isInvalid="submitted && $v.constructionYear.$error"
          :errorMessage="getErrorMsg('constructionYear')">
        </text-input>

        <text-input
          v-model="operationYear"
          v-bind:field="metadata.operationYear"
          :isInvalid="submitted && $v.operationYear.$error"
          :errorMessage="getErrorMsg('operationYear')">
        </text-input>

        <text-input
          v-model="expectedLifetime"
          v-bind:field="metadata.expectedLifetime"
          :isInvalid="submitted && $v.expectedLifetime.$error"
          :errorMessage="getErrorMsg('expectedLifetime')">
        </text-input>

        <radio-button-input
          v-model="isReplaceable"
          v-bind:field="metadata.isReplaceable"
          :isInvalid="submitted && $v.isReplaceable.$error"
          :errorMessage="getErrorMsg('isReplaceable')">
        </radio-button-input>

        <div v-if="isReplaceable === true">
          <text-input
            v-model="replacementConstructionTime"
            v-bind:field="metadata.replacementConstructionTime"
            :isInvalid="submitted && $v.replacementConstructionTime.$error"
            :errorMessage="getErrorMsg('replacementConstructionTime')">
          </text-input>

          <fieldset class="section-group">
            <legend>Replacement Cost Function</legend>
            <text-input
              v-model="replacementCost"
              v-bind:field="metadata.replacementCost"
              :isInvalid="submitted && $v.replacementCost.$error"
              :errorMessage="getErrorMsg('replacementCost')">
            </text-input>

            <text-input
              v-model="replacementCostPerkW"
              v-bind:field="metadata.replacementCostPerkW"
              :isInvalid="submitted && $v.replacementCostPerkW.$error"
              :errorMessage="getErrorMsg('replacementCostPerkW')">
            </text-input>
          </fieldset>
        </div>

        <text-input
          v-model="decomissioningCost"
          v-bind:field="metadata.decomissioningCost"
          :isInvalid="submitted && $v.decomissioningCost.$error"
          :errorMessage="getErrorMsg('decomissioningCost')">
        </text-input>

        <drop-down-input
          v-model="salvageValueOption"
          v-bind:field="metadata.salvageValueOption"
          :isLargeBox="true"
          :isInvalid="submitted && $v.salvageValueOption.$error"
          :errorMessage="getErrorMsg('salvageValueOption')">
        </drop-down-input>

        <div v-if="salvageValueOption === 'User defined'">
          <text-input
            v-model="salvageValue"
            v-bind:field="metadata.salvageValue"
            :isInvalid="submitted && $v.salvageValue.$error"
            :errorMessage="getErrorMsg('salvageValue')">
          </text-input>
        </div>

        <text-input
          v-model="ter"
          v-bind:field="metadata.ter"
          :isInvalid="submitted && $v.ter.$error"
          :errorMessage="getErrorMsg('ter')">
        </text-input>

        <drop-down-input
          v-model="macrsTerm"
          v-bind:field="metadata.macrsTerm"
          :isInvalid="submitted && $v.macrsTerm.$error"
          :errorMessage="getErrorMsg('macrsTerm')">
        </drop-down-input>

        <save-buttons
          :continue-link="WIZARD_COMPONENT_PATH"
          :displayError="submitted && $v.$anyError"
          :save="validatedSave"
        />

      </div>
    </form>

  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import TechnologySpecsICEMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsICE';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';

  const metadata = TechnologySpecsICEMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  export default {
    name: 'TechnologySpecsICE',
    // TODO maybe rename this to just 'id'
    mixins: [wizardFormMixin],
    props: ['iceId'],
    data() {
      const values = this.isnewICE() ? metadata.getDefaultValues() : this.getICEFromStore();
      return {
        metadata,
        ...values,
        WIZARD_COMPONENT_PATH,
      };
    },
    validations: {
      ...validations,
      includeSizeLimits: {
        ...validations.includeSizeLimits,
        required: requiredIf(function isIncludeSizeLimitsRequired() {
          return this.shouldSize;
        }),
      },
      ratedCapacity: {
        ...validations.ratedCapacity,
        required: requiredIf(function isRatedCapacityRequired() {
          return !this.shouldSize;
        }),
      },
      ratedCapacityMaximum: {
        ...validations.ratedCapacityMaximum,
        required: requiredIf(function isRatedCapacityMaximumRequired() {
          return (this.includeSizeLimits === true) && (this.shouldSize === true);
        }),
      },
      ratedCapacityMinimum: {
        ...validations.ratedCapacityMinimum,
        required: requiredIf(function isRatedCapacityMinimumRequired() {
          return (this.includeSizeLimits === true) && (this.shouldSize === true);
        }),
      },
      replacementCost: {
        ...validations.replacementCost,
        required: requiredIf(function isReplacementCostRequired() {
          return (this.isReplaceable === true);
        }),
      },
      replacementCostPerkW: {
        ...validations.replacementCostPerkW,
        required: requiredIf(function isReplacementCostPerkWRequired() {
          return (this.isReplaceable === true);
        }),
      },
      replacementConstructionTime: {
        ...validations.replacementConstructionTime,
        required: requiredIf(function isReplacementConstructionTimeRequired() {
          return (this.isReplaceable === true);
        }),
      },
      salvageValue: {
        ...validations.salvageValue,
        required: requiredIf(function isSalvageValueRequired() {
          return (this.salvageValueOption === 'User defined');
        }),
      },
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
    methods: {
      resetNonRequired(list) {
        list.forEach((item) => {
          this[item] = this.metadata.getDefaultValues()[item];
        });
        return true;
      },
      isnewICE() {
        return this.iceId === 'null';
      },
      getICEFromStore() {
        return this.$store.getters.getICEById(this.iceId);
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      makeErrorList() {
        const errors = [];
        Object.keys(this.metadata).forEach((key) => {
          if (this.$v[key].$invalid) {
            errors.push(this.getErrorMsg(key));
          }
        });
        return errors;
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        if (this.shouldSize === true) {
          this.resetNonRequired(['ratedCapacity']);
          if (this.includeSizeLimits === false) {
            this.resetNonRequired(['ratedCapacityMaximum', 'ratedCapacityMinimum']);
          }
        } else {
          this.resetNonRequired(['includeSizeLimits']);
        }
        if (this.isReplaceable === false) {
          this.resetNonRequired(['replacementConstructionTime', 'replacementCost', 'replacementCostPerkW']);
        }
        if (this.salvageValueOption !== 'User defined') {
          this.resetNonRequired(['salvageValue']);
        }
        this.submitted = true;
        this.$v.$touch();
        // set complete to true or false
        this.complete = !this.$v.$invalid;
        // populate errorList for this technology
        if (this.complete !== true) {
          this.errorList = this.makeErrorList();
        }
        const iceSpec = this.buildICE();
        if (this.isnewICE()) {
          this.$store.dispatch('addTechnologySpecsICE', iceSpec);
        } else {
          const payload = {
            newICE: iceSpec,
            iceId: this.iceId,
          };
          this.$store.dispatch('replaceTechnologySpecsICE', payload);
        }
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      buildICE() {
        return {
          active: this.active,
          capitalCost: this.capitalCost,
          capitalCostPerkW: this.capitalCostPerkW,
          complete: this.complete,
          constructionYear: this.constructionYear,
          decomissioningCost: this.decomissioningCost,
          efficiency: this.efficiency,
          errorList: this.errorList,
          expectedLifetime: this.expectedLifetime,
          fixedOMCostIncludingExercise: this.fixedOMCostIncludingExercise,
          fuelCost: this.fuelCost,
          id: this.id,
          includeSizeLimits: this.includeSizeLimits,
          isReplaceable: this.isReplaceable,
          macrsTerm: this.macrsTerm,
          minimumPower: this.minimumPower,
          name: this.name,
          numGenerators: this.numGenerators,
          operationYear: this.operationYear,
          ratedCapacity: this.ratedCapacity,
          ratedCapacityMaximum: this.ratedCapacityMaximum,
          ratedCapacityMinimum: this.ratedCapacityMinimum,
          replacementCost: this.replacementCost,
          replacementCostPerkW: this.replacementCostPerkW,
          replacementConstructionTime: this.replacementConstructionTime,
          salvageValue: this.salvageValue,
          salvageValueOption: this.salvageValueOption,
          shouldSize: this.shouldSize,
          tag: this.tag,
          technologyType: this.technologyType,
          ter: this.ter,
          variableOMCost: this.variableOMCost,
        };
      },
    },
  };
</script>
