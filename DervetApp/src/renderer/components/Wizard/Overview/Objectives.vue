<template>
  <div class="container body-content">
    <h3>Services</h3>
    <hr />

    <div class="form-horizontal form-buffer">
      <radio-button-input v-model="sizingEquipment"
                          :metadata="metadata.sizingEquipment"
                          :isInvalid="submitted && $v.sizingEquipment.$error"
                          :errorMessage="getErrorMsg('sizingEquipment')">
      </radio-button-input>
      <div v-if="(sizingEquipment === false)">
        <fieldset class="section-group">
          <legend>Optimization Horizon</legend>
          <drop-down-input v-model="optimizationHorizon"
                           :metadata="metadata.optimizationHorizon"
                           :isInvalid="submitted && $v.optimizationHorizon.$error"
                           :errorMessage="getErrorMsg('optimizationHorizon')">
          </drop-down-input>

          <div v-if="optimizationHorizon === 'Hour'">
            <text-input v-model="optimizationHorizonNum"
                        :metadata="metadata.optimizationHorizonNum"
                        :isInvalid="submitted && $v.optimizationHorizonNum.$error"
                        :errorMessage="getErrorMsg('optimizationHorizonNum')">
            </text-input>
          </div>
        </fieldset>
      </div>

      <fieldset class="section-group">
        <legend>Where do energy prices come from?</legend>
        <radio-button-input v-model="energyPriceSourceWholesale"
                            :metadata="metadata.energyPriceSourceWholesale"
                            :isInvalid="submitted && $v.energyPriceSourceWholesale.$error"
                            :errorMessage="getErrorMsg('energyPriceSourceWholesale')">
        </radio-button-input>
      </fieldset>

      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Customer Services</legend>

          <div class="row">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesResilience"
                :value="true"
                :unchecked-value="false">
                  <b>Reliability</b>
              </b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Define a number of hours the site must be capable of covering a grid outage for. DER-VET will size and operate the DERs to guarantee coverage for outages of this duration.</p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesRetailDemandChargeReduction"
                :value="true"
                :unchecked-value="false">
                  <b>Demand Charge Reduction</b>
              </b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Will the project be reducing demand charges on a retail electricity bill?</p>
            </div>
          </div>

          <br>

          <div class="row">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesBackupPower"
                :value="true"
                :unchecked-value="false">
                  <b>Backup</b>
              </b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Will a portion of energy always be reserved to be used in case of a grid outage?</p>
            </div>
          </div>

          <br>

          <div class="row" v-if="(sizingEquipment === false)">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesDR"
                :value="true"
                :unchecked-value="false">
                <b>Demand Response Program</b>
              </b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Will the assets be mindful of their energy consumption during certain hours of the year?</p>
            </div>
          </div>
          <br>
        </fieldset>
      </div>

      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Wholesale/Bulk Services</legend>

          <div class="col-md-12" v-if="sizingEquipment">
            <p class="tool-tip">
              These services should only be chosen if each DER will have a size maximum, otherwise a solution will likely not be found.
            </p>
          </div>

          <div class="row">
            <div class="col-md-6 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesSR"
                :value="true"
                :unchecked-value="false">
                  <b>Spinning Reserves</b>
              </b-form-checkbox>
            </div>

            <div class="col-md-6 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesNSR"
                :value="true"
                :unchecked-value="false">
                  <b>Non-Spinning Reserves</b>
              </b-form-checkbox>
            </div>
          </div>
          <br>

          <div class="row">
            <div class="col-md-6 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesFR"
                :value="true"
                :unchecked-value="false">
                  <b>Frequency Regulation</b>
              </b-form-checkbox>
            </div>
            <div class="col-md-6 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesLF"
                :value="true"
                :unchecked-value="false">
                  <b>Load Following</b>
              </b-form-checkbox>
            </div>
          </div>

          <br>
          <div class="row" v-if="(sizingEquipment === false)">
            <br>
            <div class="col-md-6 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesRA"
                :value="true"
                :unchecked-value="false">
                  <b>Resource Adequacy</b>
              </b-form-checkbox>
            </div>
          </div>
          <br>
        </fieldset>
      </div>

      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Grid Support</legend>
          <div class="row">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesDeferral"
                :value="true"
                :unchecked-value="false">
                  <b>Deferral</b>
              </b-form-checkbox>
            </div>
            <div class="col-md-7" v-if="sizingEquipment">
              <p class="tool-tip">
                This service should only be chosen with storage. Sizing a mix of DERs for this service is in development.
              </p>
            </div>
          </div>
          <br>
        </fieldset>
      </div>
      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Other</legend>
          <div class="row">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox
                size='md'
                v-model="objectivesUserDefined"
                :value="true"
                :unchecked-value="false">
                  <b>User-Defined Storage Technology Settings</b>
              </b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Impose timestep-by-timestep constraints on the power from DERs (and SOC for storage) and service participation. Assign a financial value to meeting these constraints.</p>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <hr />
      <nav-buttons
        :show-error="showSaveButtonErrorMessage()"
        :on-left-click="validatedSave"
        :on-right-click="validatedSaveContinue"
      />

  </div>

</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import CollectionTypes from '@/models/Project/CollectionTypes';
  import { TECH_SPECS } from '@/router/constants';
  import { RESET_GAMMA_AND_NU } from '@/store/actionTypes';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return this.getData(CollectionTypes.Project, Page.Objectives, TECH_SPECS);
    },
    validations() {
      const { validationSchema } = this;
      return {
        ...validationSchema,
        optimizationHorizonNum: {
          ...validationSchema.optimizationHorizonNum,
          required: requiredIf(function isOptimizationHorizonNumRequired() {
            return (this.sizingEquipment === false) && this.optimizationHorizon === 'Hour';
          }),
        },
        optimizationHorizon: {
          ...validationSchema.optimizationHorizon,
          required: requiredIf(function isOptimizationHorizonRequired() {
            return (this.sizingEquipment === false);
          }),
        },
      };
    },
    methods: {
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(this.validationSchema, this.$v, fieldName);
      },
      resetAllNonRequired() {
        if (this.sizingEquipment) {
          this.resetNonRequired(['optimizationHorizonNum', 'optimizationHorizon', 'objectivesRA', 'objectivesDR']);
        } else if (!this.sizingEquipment && this.optimizationHorizon !== 'Hour') {
          this.resetNonRequired(['optimizationHorizonNum']);
        }
        if (this.energyPriceSourceWholesale) {
          this.objectivesDA = true;
          this.objectivesRetailEnergyChargeReduction = false;
        } else {
          this.objectivesDA = false;
          this.objectivesRetailEnergyChargeReduction = true;
        }
      },
      validatedSave() {
        this.resetAllNonRequired();
        wizardFormMixin.methods.validatedSave.bind(this)();
        if (this.objectivesResilience !== this.$store.state.Project.objectivesResilience) {
          // consider when the resilience boolean changes value; it affects gamma and nu in solarpv
          // reset gamma and nu in each solarPV tech (save with null)
          this.$store.dispatch(RESET_GAMMA_AND_NU);
        }
      },
    },
  };
</script>
