<template>
  <div>
    <h3>Technology Specs: Solar PV</h3>
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
          v-model="cost"
          v-bind:field="metadata.cost"
          :isInvalid="submitted && $v.cost.$error"
          :errorMessage="getErrorMsg('cost')">
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

        <drop-down-input
          v-model="loc"
          v-bind:field="metadata.loc"
          :isInvalid="submitted && $v.loc.$error"
          :errorMessage="getErrorMsg('loc')">
        </drop-down-input>

        <div v-if="loc === 'AC'">
            <radio-button-input
              v-model="allowGridCharge"
              v-bind:field="metadata.allowGridCharge"
              :isInvalid="submitted && $v.allowGridCharge.$error"
              :errorMessage="getErrorMsg('allowGridCharge')">
            </radio-button-input>
          </div>

        <text-input
          v-model="inverterMax"
          v-bind:field="metadata.inverterMax"
          :isInvalid="submitted && $v.inverterMax.$error"
          :isLargeBox="true"
          :errorMessage="getErrorMsg('inverterMax')">
        </text-input>

        <radio-button-input
          v-model="includeCurtailment"
          v-bind:field="metadata.includeCurtailment"
          :isInvalid="submitted && $v.includeCurtailment.$error"
          :errorMessage="getErrorMsg('includeCurtailment')">
        </radio-button-input>

        <fieldset class="section-group" v-if="reliabilitySelected">
          <legend>Generation Variation</legend>

          <text-input
            v-model="nu"
            v-bind:field="metadata.nu"
            :isInvalid="submitted && $v.nu.$error"
            :errorMessage="getErrorMsg('nu')">
          </text-input>
          <text-input
            v-model="gamma"
            v-bind:field="metadata.gamma"
            :isInvalid="submitted && $v.gamma.$error"
            :errorMessage="getErrorMsg('gamma')">
          </text-input>
        </fieldset>

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

        <text-input
          v-model="ter"
          v-bind:field="metadata.ter"
          :isInvalid="submitted && $v.ter.$error"
          :errorMessage="getErrorMsg('ter')">
        </text-input>

        <radio-button-input
          v-model="includePPA"
          v-bind:field="metadata.includePPA"
          :isInvalid="submitted && $v.includePPA.$error"
          :errorMessage="getErrorMsg('includePPA')">
        </radio-button-input>

        <div v-if="includePPA === true">
          <text-input
            v-model="ppaCost"
            v-bind:field="metadata.ppaCost"
            :isInvalid="submitted && $v.ppaCost.$error"
            :errorMessage="getErrorMsg('ppaCost')">
          </text-input>
          
          <text-input
            v-model="ppaInflationRate"
            v-bind:field="metadata.ppaInflationRate"
            :isInvalid="submitted && $v.ppaInflationRate.$error"
            :errorMessage="getErrorMsg('ppaInflationRate')">
          </text-input>
        </div>

        <div v-if="includePPA === false">
          <text-input
            v-model="fixedOMCosts"
            v-bind:field="metadata.fixedOMCosts"
            :isInvalid="submitted && $v.fixedOMCosts.$error"
            :errorMessage="getErrorMsg('fixedOMCosts')">
          </text-input>
          
        </div>
        
        <radio-button-input
          v-model="isReplaceable"
          v-bind:field="metadata.isReplaceable"
          :isInvalid="submitted && $v.isReplaceable.$error"
          :errorMessage="getErrorMsg('isReplaceable')">
        </radio-button-input>

        <div v-if="includePPA === false">  
          <div v-if="isReplaceable === true">
            <text-input
              v-model="replacementConstructionTime"
              v-bind:field="metadata.replacementConstructionTime"
              :isInvalid="submitted && $v.replacementConstructionTime.$error"
              :errorMessage="getErrorMsg('replacementConstructionTime')">
            </text-input>
            
            <text-input
              v-model="replacementCost"
              v-bind:field="metadata.replacementCost"
              :isInvalid="submitted && $v.replacementCost.$error"
              :errorMessage="getErrorMsg('replacementCost')">
            </text-input>
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

          <drop-down-input
            v-model="macrsTerm"
            v-bind:field="metadata.macrsTerm"
            :isInvalid="submitted && $v.macrsTerm.$error"
            :errorMessage="getErrorMsg('macrsTerm')">
          </drop-down-input>
        </div>
        
        <save-buttons
          :continue-link="`${TECH_SPECS_PV_PATH}-upload/${this.solarId}`"
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
  import TechnologySpecsSolarPVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
  import { WIZARD_COMPONENT_PATH, TECH_SPECS_PV_PATH } from '@/router/constants';

  const metadata = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  export default {
    name: 'TechnologySpecsSolarPV',
    // TODO maybe rename this to just 'id'
    mixins: [wizardFormMixin],
    props: ['solarId'],
    data() {
      const values = this.isNewSolar() ? metadata.getDefaultValues() : this.getSolarFromStore();
      return {
        metadata,
        ...values,
        WIZARD_COMPONENT_PATH,
        TECH_SPECS_PV_PATH,
      };
    },
    validations: {
      ...validations,
      allowGridCharge: {
        ...validations.allowGridCharge,
        required: requiredIf(function isAllowGridChargeRequired() {
          return (this.loc === 'AC');
        }),
      },
      decomissioningCost: {
        ...validations.decomissioningCost,
        required: requiredIf(function isDecomissioningCostRequired() {
          return (this.includePPA === false);
        }),
      },
      fixedOMCosts: {
        ...validations.fixedOMCosts,
        required: requiredIf(function isFixedOMCostsRequired() {
          return (this.includePPA === false);
        }),
      },
      gamma: {
        ...validations.gamma,
        required: requiredIf(function isGammaRequired() {
          return this.reliabilitySelected;
        }),
      },
      includeSizeLimits: {
        ...validations.includeSizeLimits,
        required: requiredIf(function isIncludeSizeLimitsRequired() {
          return (this.shouldSize === true);
        }),
      },
      macrsTerm: {
        ...validations.macrsTerm,
        required: requiredIf(function isMacrsTermRequired() {
          return (this.includePPA === false);
        }),
      },
      nu: {
        ...validations.nu,
        required: requiredIf(function isNuRequired() {
          return this.reliabilitySelected;
        }),
      },
      ppaCost: {
        ...validations.ppaCost,
        required: requiredIf(function isPpaCostRequired() {
          return (this.includePPA === true);
        }),
      },
      ppaInflationRate: {
        ...validations.ppaInflationRate,
        required: requiredIf(function isPpaInflationRateRequired() {
          return (this.includePPA === true);
        }),
      },
      ratedCapacity: {
        ...validations.ratedCapacity,
        required: requiredIf(function isRatedCapacityRequired() {
          return this.shouldSize === false;
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
          return (this.isReplaceable === true) && (this.includePPA === false);
        }),
      },
      replacementConstructionTime: {
        ...validations.replacementConstructionTime,
        required: requiredIf(function isReplacementConstructionTimeRequired() {
          return (this.isReplaceable === true) && (this.includePPA === false);
        }),
      },
      salvageValue: {
        ...validations.salvageValue,
        required: requiredIf(function isSalvageValueRequired() {
          return (this.salvageValueOption === 'User defined') && (this.includePPA === false);
        }),
      },
      salvageValueOption: {
        ...validations.salvageValueOption,
        required: requiredIf(function isSalvageValueOptionRequired() {
          return (this.includePPA === false);
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
    computed: {
      reliabilitySelected() {
        return this.$store.state.Project.objectivesResilience;
      },
    },
    methods: {
      resetNonRequired(list) {
        list.forEach((item) => {
          this[item] = this.metadata.getDefaultValues()[item];
        });
        return true;
      },
      isNewSolar() {
        return this.solarId === 'null';
      },
      getSolarFromStore() {
        return this.$store.getters.getSolarPVById(this.solarId);
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      makeErrorList() {
        const errors = [];
        Object.keys(this.metadata).forEach((key) => {
          console.log(JSON.stringify(key, null, 1));
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
        if (this.reliabilitySelected) {
          this.resetNonRequired(['gamma', 'nu']);
        }
        if (this.includePPA) {
          this.resetNonRequired(['decomissioningCost', 'fixedOMCosts', 'macrsTerm', 'replacementCost', 'replacementConstructionTime', 'replacementCost', 'salvageValueOption', 'salvageValue']);
        }
        // shared inputs: reset all non-requred inputs to default
        if (this.isReplaceable === false) {
          this.resetNonRequired(['replacementConstructionTime', 'replacementCost']);
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
        const solarSpec = this.buildSolarPV();
        if (this.isNewSolar()) {
          this.$store.dispatch('addTechnologySpecsSolarPV', solarSpec);
        } else {
          const payload = {
            newSolar: solarSpec,
            solarId: this.solarId,
          };
          this.$store.dispatch('replaceTechnologySpecsSolarPV', payload);
        }
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      buildSolarPV() {
        return {
          active: this.active,
          allowGridCharge: this.allowGridCharge,
          complete: this.complete,
          constructionYear: this.constructionYear,
          cost: this.cost,
          decomissioningCost: this.decomissioningCost,
          errorList: this.errorList,
          expectedLifetime: this.expectedLifetime,
          fixedOMCosts: this.fixedOMCosts,
          gamma: this.gamma,
          generationProfile: this.generationProfile,
          id: this.id,
          includeCurtailment: this.includeCurtailment,
          includePPA: this.includePPA,
          includeSizeLimits: this.includeSizeLimits,
          inverterMax: this.inverterMax,
          isReplaceable: this.isReplaceable,
          loc: this.loc,
          macrsTerm: this.macrsTerm,
          name: this.name,
          nu: this.nu,
          operationYear: this.operationYear,
          ppaCost: this.ppaCost,
          ppaInflationRate: this.ppaInflationRate,
          ratedCapacity: this.ratedCapacity,
          ratedCapacityMaximum: this.ratedCapacityMaximum,
          ratedCapacityMinimum: this.ratedCapacityMinimum,
          replacementCost: this.replacementCost,
          replacementConstructionTime: this.replacementConstructionTime,
          salvageValue: this.salvageValue,
          salvageValueOption: this.salvageValueOption,
          shouldSize: this.shouldSize,
          tag: this.tag,
          technologyType: this.technologyType,
          ter: this.ter,
        };
      },
    },
  };
</script>
