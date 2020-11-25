<!-- hide or show services based on pervious answers to the forms on other pages -->
<template>
  <div class="container body-content">
    <h3>Services</h3>
    <hr />
    <div class="form-horizontal form-buffer">
      <fieldset class="section-group">
        <legend>Where do energy prices come from?</legend>
        <b-form-group>
          <div class="row form-group">
            <div class="col-md-4">
              <b-form-radio type="radio" v-bind:value="false" v-model="energyPriceSourceWholesale"><b>Retail tariff, PPA, or other fixed contract (define energy price structure)</b></b-form-radio>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Will the project be reducing energy charges on a retail electricity bill?</p>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-4">
              <b-form-radio type="radio" v-bind:value="true" v-model="energyPriceSourceWholesale"><b>Wholesale energy market, production cost model, or other time-varying source (upload time series data)</b></b-form-radio>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Day ahead energy time shift</p>
            </div>
          </div>
        </b-form-group>
      </fieldset>
      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Customer Services</legend>
          <div class="row form-group">
            <div class="col-md-4 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="Reliability"><b>Reliability</b></b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Define a number of hours the site must be capable of covering a grid outage for. DER-VET will size and operate the DERs to guarantee coverage for outages of this duration.</p>
            </div>
          </div>

          <div class="row form-group">
            <div class="col-md-4 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="Retail Demand Charge Reduction"><b>Demand Charge Reduction</b></b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Will the project be reducing demand charges on a retail electricity bill?</p>
            </div>
          </div>
          <br>
        </fieldset>
      </div>
      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Wholesale Services</legend>
          <div class="form-group">
            <div class="col-md-12 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="SR"><b>Spinning Reserves</b></b-form-checkbox>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="NSR"><b>Non-Spinning Reserves</b></b-form-checkbox>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="FR"><b>Frequency regulation</b></b-form-checkbox>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="LF"><b>Load following</b></b-form-checkbox>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Grid Support</legend>
          <div class="form-group">
            <div class="col-md-12 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="Deferral"><b>Deferral</b></b-form-checkbox>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="row">
        <div class="col-md-12">
          <fieldset class="section-group">
            <legend>Other</legend>
            <div class="row form-group">
              <div class="col-md-4 checkboxes">
                <b-form-checkbox size='lg' v-model="listOfActiveServices" value="User Defined"><b>User-Defined Storage Technology Settings</b></b-form-checkbox>
              </div>
              <div class="col-md-7">
                <p class="tool-tip">Impose timestep by timestep constraints on the power from DERs (and SOC for storage) and service participation. Assign a financial value to meeting these constraints.</p>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-3">
          <label class="control-label" for="size"><b>Size equipement in microgrid</b></label>
        </div>

        <div class="col-md-4 form-control-static">
          <b-form-radio-group id="is-sizing" v-model="sizingEquipement">
            <b-form-radio value="true">Yes</b-form-radio>
            <b-form-radio value="false">No</b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="col-md-5">
          <p class="tool-tip tool-tip-col">Are there any pieces of equipement that you want DER-VET to optimilly size for?</p>
        </div>
      </div>
      <div v-if="sizingEquipement == 'false'">
        <fieldset class="section-group">
          <legend>Optimization Horizon</legend>
          <div class="form-group">
            <drop-down-input v-model="optimizationHorizon"
                             v-bind:field="metadata.optimizationHorizon"
                             :isInvalid="submitted && $v.optimizationHorizon.$error"
                             :errorMessage="getErrorMsg('optimizationHorizon')">
            </drop-down-input>

            <div v-if="optimizationHorizon == 'Hours'">
              <text-input v-model="optimizationHorizonNum"
                          v-bind:field="metadata.optimizationHorizonNum"
                          :isInvalid="submitted && $v.optimizationHorizonNum.$error"
                          :errorMessage="getErrorMsg('optimizationHorizonNum')">
              </text-input>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <hr />
    <nav-buttons :back-link="START_PROJECT_PATH"
                 :continue-link="TECH_SPECS_PATH"
                 :displayError="submitted && $v.$anyError"
                 :save="this.validatedSave" />

  </div>

</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';
  import * as p from '@/models/Project/Project';
  import * as c from '@/models/Project/constants';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import operateOnKeysList from '@/util/object';
  import { TECH_SPECS_PATH, START_PROJECT_PATH } from '@/router/constants';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.OBJECTIVE_FIELDS);

  export default {
    mixins: [wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        metadata,
        listOfActiveServices: p.listOfActiveServices,
        energyPriceSourceWholesale: p.energyPriceSourceWholesale,
        ...this.getDataFromProject(),
        START_PROJECT_PATH,
        TECH_SPECS_PATH,
      };
    },
    validations: {
      ...validations,
      optimizationHorizonNum: {
        ...validations.optimizationHorizonNum,
        required: requiredIf(function isOptimizationHorizonNumRequired() {
          return !(this.sizingEquipement) && this.optimizationHorizon === 'Hours';
        }),
      },
      optimizationHorizon: {
        ...validations.optimizationHorizon,
        required: requiredIf(function isOptimizationHorizonRequired() {
          return !(this.sizingEquipement);
        }),
      },
    },
    computed: {
      complete() {
        return this.$store.state.Application.pageCompleteness.overview.objectives;
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
        return operateOnKeysList(this.$store.state.Project, c.OBJECTIVE_FIELDS, f => f);
      },
      getCompletenessPayload() {
        return {
          pageGroup: 'overview',
          page: 'objectives',
          completeness: !this.$v.$invalid,
        };
      },
      validatedSave() {
        // set complete to true or false
        this.$store.dispatch('setCompleteness', this.getCompletenessPayload());
        return this.save();
      },
      save() {
        this.$store.dispatch('chooseEnergyStructure', this.energyPriceSourceWholesale);
        this.$store.dispatch('selectOtherServices', this.listOfActiveServices);
        this.$store.dispatch('setOptimizationHorizon', this.optimizationHorizon);
        this.$store.dispatch('setOptimizationHorizonNum', this.optimizationHorizonNum);
        this.$store.dispatch('setIncludeSiteLoad');
      },
    },
  };
</script>
