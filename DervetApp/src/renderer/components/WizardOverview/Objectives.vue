<!-- hide or show services based on pervious answers to the forms on other pages -->
<template>
  <div class="container body-content">
    <h3>Services</h3>
    <hr />
    <div class="form-horizontal form-buffer">
      <radio-button-input v-model="sizingEquipment"
                          v-bind:field="metadata.sizingEquipment"
                          :isInvalid="submitted && $v.sizingEquipment.$error"
                          :errorMessage="getErrorMsg('sizingEquipment')">
      </radio-button-input>
      <div v-if="(sizingEquipment === false)">
        <fieldset class="section-group">
          <legend>Optimization Horizon</legend>
          <drop-down-input v-model="optimizationHorizon"
                           v-bind:field="metadata.optimizationHorizon"
                           :isInvalid="submitted && $v.optimizationHorizon.$error"
                           :errorMessage="getErrorMsg('optimizationHorizon')">
          </drop-down-input>

          <div v-if="optimizationHorizon === 'Hour'">
            <text-input v-model="optimizationHorizonNum"
                        v-bind:field="metadata.optimizationHorizonNum"
                        :isInvalid="submitted && $v.optimizationHorizonNum.$error"
                        :errorMessage="getErrorMsg('optimizationHorizonNum')">
            </text-input>
          </div>
        </fieldset>
      </div>

      <fieldset class="section-group">
        <legend>Where do energy prices come from?</legend>
        <radio-button-input v-model="energyPriceSourceWholesale"
                            v-bind:field="metadata.energyPriceSourceWholesale"
                            :isInvalid="submitted && $v.energyPriceSourceWholesale.$error"
                            :errorMessage="getErrorMsg('energyPriceSourceWholesale')">
        </radio-button-input>
      </fieldset>

      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Customer Services</legend>
          <div class="row">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="Resilience"><b>Reliability</b></b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Define a number of hours the site must be capable of covering a grid outage for. DER-VET will size and operate the DERs to guarantee coverage for outages of this duration.</p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="RetailDemandChargeReduction"><b>Demand Charge Reduction</b></b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Will the project be reducing demand charges on a retail electricity bill?</p>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="BackupPower"><b>Backup</b></b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Will a portion of energy always be reserved to be used in case of a grid outage?</p>
            </div>
          </div>
          <br>
          <div class="row" v-if="(sizingEquipment === false)">
            <div class="col-md-5 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="DR">
                <b>Demand Response Program</b>
              </b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Will the assests be mindful of their energy consumption during certain hours of the year?</p>
            </div>
          </div>
          <br>
        </fieldset>
      </div>
      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Wholesale Services</legend>
          <div class="col-md-12 tool-tip" v-if="sizingEquipment">
            These serivces should only be chosen if each DER will have a size maximum, otherwise a solution will likely not be found.
          </div>
          <div class="row">
            <div class="col-md-6 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="SR"><b>Spinning Reserves</b></b-form-checkbox>
            </div>
            <div class="col-md-6 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="NSR"><b>Non-Spinning Reserves</b></b-form-checkbox>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-6 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="FR"><b>Frequency regulation</b></b-form-checkbox>
            </div>
            <div class="col-md-6 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="LF"><b>Load following</b></b-form-checkbox>
            </div>
          </div>
          <br>
        </fieldset>
      </div>
      <div class="buffer-top-lg">
        <fieldset class="section-group">
          <legend>Grid Support</legend>
          <div class="row">
            <div class="col-md-6 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="Deferral"><b>Deferral</b></b-form-checkbox>
            </div>
            <div class="col-md-6 tool-tip" v-if="sizingEquipment">
              This serivce should only be chosen with storage. Sizing a mix of DERs for this service is in development.
            </div>
            <div class="col-md-6 checkboxes" v-if="(sizingEquipment === false)">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="RA"><b>Resource Adequacy</b></b-form-checkbox>
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
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="UserDefined"><b>User-Defined Storage Technology Settings</b></b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip">Impose timestep by timestep constraints on the power from DERs (and SOC for storage) and service participation. Assign a financial value to meeting these constraints.</p>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <hr />
    <save-buttons
                 :continue-link="TECH_SPECS"
                 :displayError="submitted && $v.$anyError"
                 :save="validatedSave" />

  </div>

</template>

<script>
  import _ from 'lodash';
  import { requiredIf } from 'vuelidate/lib/validators';
  import * as p from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import operateOnKeysList from '@/util/object';
  import { TECH_SPECS, PROJECT_CONFIGURATION } from '@/router/constants';
  import {
    CHOOSE_ENERGY_STRUCTURE,
    RESET_GAMMA_AND_NU,
    SET_INCLUDE_SITE_LOAD,
    SET_INCLUDE_SYSTEM_LOAD,
    SET_OPTIMIZATION_HORIZON,
    SET_OPTIMIZATION_HORIZON_NUM,
    SET_SIZING_EQUIPMENT,
    // SET_TS_REQUIRED,
    SELECT_OTHER_SERVICES,
  } from '@/store/actionTypes';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.OBJECTIVE_FIELDS);
  const PAGEGROUP = 'overview';
  const PAGE = 'objectives';

  export default {
    mixins: [wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        metadata,
        listOfActiveServices: p.listOfActiveServices,
        ...this.getDataFromProject(),
        PROJECT_CONFIGURATION,
        TECH_SPECS,
      };
    },
    validations: {
      ...validations,
      optimizationHorizonNum: {
        ...validations.optimizationHorizonNum,
        required: requiredIf(function isOptimizationHorizonNumRequired() {
          return (this.sizingEquipment === false) && this.optimizationHorizon === 'Hours';
        }),
      },
      optimizationHorizon: {
        ...validations.optimizationHorizon,
        required: requiredIf(function isOptimizationHorizonRequired() {
          return (this.sizingEquipment === false);
        }),
      },
    },
    computed: {
      complete() {
        return this.$store.state.Application.pageCompleteness[PAGEGROUP][PAGE];
      },
      expectedRowCount() {
        if (this.timeseriesXAxis.length === 0) {
          return 'TBD';
        }
        return this.timeseriesXAxis.length;
      },
      isResilienceSelected() {
        return this.listOfActiveServices.includes('Resilience');
      },
      isTBD() {
        return this.expectedRowCount === 'TBD';
      },
      timeseriesXAxis() {
        // the first timestamp should be Jan 1 of dataYear at timestep minutes
        //   to represent the period-ending value.
        return this.$store.getters.getTimeseriesXAxis;
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
      resetNonRequired(list) {
        list.forEach((item) => {
          this[item] = this.metadata.getDefaultValues()[item];
        });
        return true;
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getDataFromProject() {
        return operateOnKeysList(this.$store.state.Project, c.OBJECTIVE_FIELDS, f => f);
      },
      getCompletenessPayload() {
        return {
          pageGroup: PAGEGROUP,
          page: PAGE,
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
          pageGroup: PAGEGROUP,
          page: PAGE,
          errorList: errors,
        };
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        if (this.sizingEquipment === true) {
          this.resetNonRequired(['optimizationHorizonNum', 'optimizationHorizon']);
        } else if (this.sizingEquipment === false && this.optimizationHorizon !== 'Hours') {
          this.resetNonRequired(['optimizationHorizonNum']);
        }
        // set completeness
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.submitted = true;
        this.$v.$touch();
        // set errorList
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        return this.save();
      },
      resetErrorList(tsFields) {
        tsFields.forEach((tsField) => {
          const ts = this.$store.state.Project[tsField];
          const { pageGroup, pageKey, page } = ts.pageAttributes;
          let errorList = this.$store.state.Application.errorList[pageGroup][pageKey][page];
          if (errorList) {
            const tsErrorMatch = `timeseries of ${ts.columnHeaderName}`;
            const errorsString = ts.revalidate(this.expectedRowCount);
            const tsError = `The timeseries of ${ts.columnHeaderName} has the wrong number of values`;
            const tsError2 = `A timeseries of ${ts.columnHeaderName} is required`;
            // reset errorList
            errorList = errorList.filter(item => !item.includes(tsErrorMatch));
            // set error with this TS only if it is required
            if (ts.required) {
              if (this.isTBD || ts.data.length === 0) {
                errorList.push(tsError2);
              } else if (errorsString !== '') {
                errorList.push(tsError);
              }
            }
            const payload = {
              pageGroup,
              pageKey,
              page,
              errorList,
            };
            this.$store.dispatch('Application/setErrorList', payload);
          }
        });
      },
      save() {
        // if sizing remove services that were hidden: RA and DR
        if (this.sizingEquipment) {
          this.listOfActiveServices = _.remove(this.listOfActiveServices, x => x !== 'RA');
          this.listOfActiveServices = _.remove(this.listOfActiveServices, x => x !== 'DR');
        }
        if (this.isResilienceSelected !== this.$store.state.Project.objectivesResilience) {
          // consider when the resilience boolean changes value; it affects gamma and nu in solarpv
          // reset gamma and nu in each solarPV tech (save with null)
          // update errorList and completeness
          this.$store.dispatch(RESET_GAMMA_AND_NU, this.isResilienceSelected);
        }
        this.$store.dispatch(CHOOSE_ENERGY_STRUCTURE, this.energyPriceSourceWholesale);
        this.$store.dispatch(SELECT_OTHER_SERVICES, this.listOfActiveServices);
        this.$store.dispatch(SET_OPTIMIZATION_HORIZON, this.optimizationHorizon);
        this.$store.dispatch(SET_OPTIMIZATION_HORIZON_NUM, this.optimizationHorizonNum);
        this.$store.dispatch(SET_SIZING_EQUIPMENT, this.sizingEquipment);
        this.$store.dispatch(SET_INCLUDE_SITE_LOAD)
          .then(this.resetErrorList(c.TS_SITE_FIELDS));
        this.$store.dispatch(SET_INCLUDE_SYSTEM_LOAD);
      },
    },
  };
</script>
