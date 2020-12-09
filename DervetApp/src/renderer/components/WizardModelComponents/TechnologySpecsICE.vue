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
          v-model="ratedCapacity"
          v-bind:field="metadata.ratedCapacity"
          :isInvalid="submitted && $v.ratedCapacity.$error"
          :errorMessage="getErrorMsg('ratedCapacity')">
        </text-input>

        <text-input
          v-model="minimumPower"
          v-bind:field="metadata.minimumPower"
          :isInvalid="submitted && $v.minimumPower.$error"
          :errorMessage="getErrorMsg('minimumPower')">
        </text-input>

        <text-input
          v-model="startupTime"
          v-bind:field="metadata.startupTime"
          :isInvalid="submitted && $v.startupTime.$error"
          :errorMessage="getErrorMsg('startupTime')">
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

        <text-input
          v-model="capitalCost"
          v-bind:field="metadata.capitalCost"
          :isInvalid="submitted && $v.capitalCost.$error"
          :errorMessage="getErrorMsg('capitalCost')">
        </text-input>

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
          v-model="constructionDate"
          v-bind:field="metadata.constructionDate"
          :isInvalid="submitted && $v.constructionDate.$error"
          :errorMessage="getErrorMsg('constructionDate')">
        </text-input>

        <text-input
          v-model="operationDate"
          v-bind:field="metadata.operationDate"
          :isInvalid="submitted && $v.operationDate.$error"
          :errorMessage="getErrorMsg('operationDate')">
        </text-input>

        <drop-down-input
          v-model="macrsTerm"
          v-bind:field="metadata.macrsTerm"
          :isInvalid="submitted && $v.macrsTerm.$error"
          :errorMessage="getErrorMsg('macrsTerm')">
        </drop-down-input>

        <radio-button-input
          v-model="shouldSize"
          v-bind:field="metadata.shouldSize"
          :isInvalid="submitted && $v.shouldSize.$error"
          :errorMessage="getErrorMsg('shouldSize')">
        </radio-button-input>

        <div v-if="shouldSize === false">
          <text-input
            v-model="numGenerators"
            v-bind:field="metadata.numGenerators"
            :isInvalid="submitted && $v.numGenerators.$error"
            :errorMessage="getErrorMsg('numGenerators')">
          </text-input>
        </div>

        <div v-if="shouldSize === true">
          <text-input
            v-model="minGenerators"
            v-bind:field="metadata.minGenerators"
            :isInvalid="submitted && $v.minGenerators.$error"
            :errorMessage="getErrorMsg('minGenerators')">
          </text-input>
          <text-input
            v-model="maxGenerators"
            v-bind:field="metadata.maxGenerators"
            :isInvalid="submitted && $v.maxGenerators.$error"
            :errorMessage="getErrorMsg('maxGenerators')">
          </text-input>
        </div>

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
      numGenerators: {
        ...validations.numGenerators,
        required: requiredIf(function isNumGeneratorsRequired() {
          return this.shouldSize === false;
        }),
      },
      minGenerators: {
        ...validations.minGenerators,
        required: requiredIf(function isMinGeneratorsRequired() {
          return this.shouldSize === true;
        }),
      },
      maxGenerators: {
        ...validations.maxGenerators,
        required: requiredIf(function isMaxGeneratorsRequired() {
          return this.shouldSize === true;
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
          this.resetNonRequired(['numGenerators']);
        } else if (this.shouldSize === false) {
          this.resetNonRequired(['minGenerators', 'maxGenerators']);
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
          complete: this.complete,
          constructionDate: this.constructionDate,
          efficiency: this.efficiency,
          errorList: this.errorList,
          fixedOMCostIncludingExercise: this.fixedOMCostIncludingExercise,
          fuelCost: this.fuelCost,
          id: this.id,
          macrsTerm: this.macrsTerm,
          maxGenerators: this.maxGenerators,
          minGenerators: this.minGenerators,
          minimumPower: this.minimumPower,
          name: this.name,
          numGenerators: this.numGenerators,
          operationDate: this.operationDate,
          ratedCapacity: this.ratedCapacity,
          shouldSize: this.shouldSize,
          startupTime: this.startupTime,
          tag: this.tag,
          technologyType: this.technologyType,
          variableOMCost: this.variableOMCost,
        };
      },
    },
  };
</script>
