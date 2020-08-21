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
              <p class="tool-tip tt-col-0 tooltip-col">Will the project be reducing energy charges on a retail electricity bill?</p>
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
              <p class="tool-tip tooltip-col tt-col-0">Define a number of hours the site must be capable of covering a grid outage for. DER-VET will size and operate the DERs to guarantee coverage for outages of this duration.</p>
            </div>
          </div>
          <br />
          <div class="row form-group">
            <div class="col-md-4 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="BackupPower"><b>Backup Power</b></b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip tooltip-col tt-col-0">Reserve a fixed amount of energy capability in case of an outage. Unlike the reliability service, this will not impact DER sizing and the energy reservation will not depend on the load.</p>
            </div>
          </div>
          <br />
          <div class="row form-group">
            <div class="col-md-4 checkboxes">
              <b-form-checkbox size='lg' v-model="listOfActiveServices" value="RetailDemandChargeReduction"><b>Demand Charge Reduction</b></b-form-checkbox>
            </div>
            <div class="col-md-7">
              <p class="tool-tip tooltip-col tt-col-0">Will the project be reducing demand charges on a retail electricity bill?</p>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="buffer-top-lg">
          <fieldset class="section-group">
              <legend>Wholesale Services</legend>
                      <div class="form-group">
                          <div class="col-md-12 checkboxes">
                            <b-form-checkbox size='lg' v-model="listOfActiveServices" value="SR"><b>Spinning Reserves</b></b-form-checkbox>
                            <!-- <p class="tool-tip tooltip-col tt-col-0">Spinning Reserves</p> -->
                          </div>
                      </div>
                      <div class="form-group">
                          <div class="col-md-12 checkboxes">
                            <b-form-checkbox size='lg' v-model="listOfActiveServices" value="NSR"><b>Non-Spinning Reserves</b></b-form-checkbox>
                              <!-- <p class="tool-tip tooltip-col tt-col-0">Non-Spinning Reserves</p> -->
                          </div>
                      </div>
                      <div class="form-group">
                          <div class="col-md-12 checkboxes">
                            <b-form-checkbox size='lg' v-model="listOfActiveServices" value="FR"><b>Frequency regulation</b></b-form-checkbox>
                            <!-- <p class="tool-tip tooltip-col tt-col-0">Frequency regulation</p> -->
                          </div>
                      </div>
                      <div class="form-group">
                          <div class="col-md-12 checkboxes">
                            <b-form-checkbox size='lg' v-model="listOfActiveServices" value="LF"><b>Load following</b></b-form-checkbox>
                              <!-- <p class="tool-tip tooltip-col tt-col-0">Load following</p> -->
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
                          <!-- <p class="tool-tip tooltip-col tt-col-0">Deferral</p> -->
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
                        <b-form-checkbox size='lg' v-model="listOfActiveServices" value="UserDefined"><b>User-Defined Storage Technology Settings</b></b-form-checkbox>
                      </div>
                      <div class="col-md-7">
                        <p class="tool-tip tooltip-col tt-col-0">Impose timestep by timestep constraints on the power from DERs (and SOC for storage) and service participation. Assign a financial value to meeting these constraints.</p>
                      </div>
                    </div>
                    <br />
              </fieldset>
          </div>
      </div>
      <!-- <p>{{listOfActiveServices}}</p> -->
      <hr />
      <fieldset class="section-group">
        <legend>Optimization Horizon</legend>
        <div class="row">
          <b-form-select class="col-md-4" v-model="optimizationHorizon">
            <b-form-select-option v-for="value in validation.optimizationHorizonOptions.allowedValues" :value="value">
                {{value}} </b-form-select-option>
          </b-form-select>
          <div class="col-md-7">
            <p class="tool-tip tooltip-col">A month-long optimization window is recommended for Customer Services. A specific number of hours is recommended for Wholesale Services.</p>
          </div>
        </div>
        <div v-if="optimizationHorizon == 'Hours'" class="row">
          <div class="col-md-4">
            <input v-model.number="optimizationHorizonNum" class="form-control numberbox" id="optimizationHorizonNum">
            <span class="unit-label">hours</span>
          </div>
          <div class="col-md-7">
            <p class="tool-tip tooltip-col">What is the number of hours of the optimization window?</p>
          </div>
        </div>
      </fieldset>
      <hr />
      <nav-buttons
        back-link="/wizard/technology-specs"
        continue-link="/wizard/objectives-parameters-site-information"
        :save="save"
      />
    </div>
  </div>
</template>

<script>
  import model from '../../models/StartProject';
  import NavButtons from './NavButtons';

  const { validation } = model;

  export default {
    components: { NavButtons },
    // computed: {
    // },
    data() {
      const data = { validation };
      return {
        ...data,
        ...this.getDataFromProject(),
      };
    },
    methods: {
      getDataFromProject() {
        const projectSpecs = this.$store.state.Project;
        return {
          optimizationHorizon: projectSpecs.optimizationHorizon,
          optimizationHorizonNum: projectSpecs.optimizationHorizonNum,
          energyPriceSourceWholesale: projectSpecs.energyPriceSourceWholesale,
          listOfActiveServices: projectSpecs.listOfActiveServices,
        };
      },
      save() {
        this.$store.dispatch('chooseEnergyStructure', this.energyPriceSourceWholesale);
        this.$store.dispatch('selectOtherServices', this.listOfActiveServices);
        this.$store.dispatch('setOptimizationHorizon', this.optimizationHorizon);
        this.$store.dispatch('setOptimizationHorizonNum', this.optimizationHorizonNum);
      },
    },
  };
</script>
