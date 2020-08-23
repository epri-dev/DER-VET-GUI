<template>
  <div>
    <h3>Services: Frequency Regulation</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Energy Option Up</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputEOU">
          <span class="unit-label">kWh/kW-hr</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Energy content of the AGC signal in the up direction</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Energy Option Down</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputEOD">
          <span class="unit-label">kWh/kW-hr</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Energy content of the AGC signal in the down direction</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Growth Rate of Frequency Regulation Price</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputGrowth">
          <span class="unit-label">%/yr</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Yearly growth rate to apply to regulation prices</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Growth Rate of Frequency Regulation Energy Price</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputEnergyPriceGrowth">
          <span class="unit-label">%/yr</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Yearly growth rate to apply to the value of energy</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Duration for Energy Reservation Requirments</label>
        </div>
        <div class="col-md-3">
          <input
            class="form-control numberbox"
            id="growth"
            type="text"
            v-model.number="inputDuration">
          <span class="unit-label">hours</span>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">How much energy capability (kWh) should the DERs reserve for each kW of participation in Frequency Regulation? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.</p>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4">
          <label class="control-label" for="Growth">Is there a requirement to bid as much regulation up as regulation down?</label>
        </div>
        <div class="col-md-3">
          <b-form-group>
            <b-form-radio-group
              v-model="inputCombinedMarket"
              :options="optionsYN"
            ></b-form-radio-group> 
          </b-form-group>
        </div>
        <div class="col-md-5">
          <p class="tool-tip">Is this a combined regulation market? If it is combined, regulation up will be provided in the same quantity as regulation down always.</p>
        </div>
      </div>
    </div>
    <div class="form-horizontal form-buffer">
      <div v-if="frPrice !== null && (frUpPrice !== null || frDownPrice !== null)" class="form-group">
        <div class="col-md-12">
          <label for="UseExistingData" class="control-label">Frequency price data has already been uploaded for this project. Do you want to use the existing data?</label>
        </div>
        <div class="col-md-12">
          <b-form-group>
            <b-form-radio-group
              v-model="useExistingRegulationPrices"
              :options="optionsYN"
              name="radio-inline"
            ></b-form-radio-group> 
          </b-form-group>
        </div>
      </div>
      <div id="DataFile-Form-combined-price" v-if="(!(useExistingRegulationPrices)||(frPrice === null)) && inputCombinedMarket">
        <hr />
        <div class="form-group">
          <div class="col-md-12">
            Upload the frequency regulation price as a .csv file that contains a reading at each time interval on a separate line.
            The number of total lines expected depends on the selected year and timestep selected below. For instance, an upload with a timestep
            of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
          </div>
        </div>
        <hr />
        <div class="row form-group">
          <div class="col-md-3">
            <label class="control-label">Frequency Regulation Price data for the year {{dataYear}} <span class="unit-label"> ($/kW)</span></label>
          </div>
          <!-- <div class="col-md-9">
            <input
            type="file"
            id="da-price-timeseries"
            class="form-control"
            @change="onFileUpload">
          </div> -->
        </div>
      </div>
      <div id="DataFile-Form-prices" v-if="(!(useExistingRegulationPrices)||(frUpPrice === null)) && !(inputCombinedMarket)">
        <hr />
        <div class="form-group">
          <div class="col-md-12">
            Upload the frequency regulation up price as a .csv file that contains a reading at each time interval on a separate line.
            The number of total lines expected depends on the selected year and timestep selected below. For instance, an upload with a timestep
            of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
          </div>
        </div>
        <hr />
        <div class="row form-group">
          <div class="col-md-3">
            <label for="DataFile" class="control-label">Frequency Regulation Up Price data for the year {{dataYear}} <span class="unit-label"> ($/kW)</span></label>
          </div>
          <!-- <div class="col-md-9">
            <input
            type="file"
            id="up-price-timeseries"
            class="form-control"
            @change="onFileUpload">
          </div> -->
        </div>
      </div>
      <div id="DataFile-Form-prices" v-if="(!(useExistingRegulationPrices)||(frDownPrice === null)) && !(inputCombinedMarket)">
        <hr />
        <div class="form-group">
          <div class="col-md-12">
            Upload the frequency regulation up price as a .csv file that contains a reading at each time interval on a separate line.
            The number of total lines expected depends on the selected year and timestep selected below. For instance, an upload with a timestep
            of 30-minutes for a year with 365 days would require an input file with 17,520 readings.
          </div>
        </div>
        <hr />
        <div class="row form-group">
          <div class="col-md-3">
            <label for="DataFile" class="control-label">Frequency Regulation Down Price data for the year {{dataYear}} <span class="unit-label"> ($/kW)</span></label>
          </div>
          <!-- <div class="col-md-9">
            <input
            type="file"
            id="da-price-timeseries"
            class="form-control"
            @change="onFileUpload">
          </div> -->
        </div>
      </div>
      <hr />
      <!-- TODO continue link should be dependent on selections in Services component -->
      <nav-buttons
        back-link="/wizard/objectives-parameters-fr"
        continue-link="/wizard/objectives-parameters-fr"
        :save="this.save"
      />
    </div>
  </div>
</template>

<script>
  import { sharedDefaults, sharedValidation } from '../../models/Shared.js';
  import PriceTimeSeries from '../../models/PriceTimeSeries';
  import csvUploadMixin from '../../mixins/csvUploadMixin';
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    mixins: [csvUploadMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        useExistingRegulationPrices: true,
        useExistingEnergyPrices: true,
        sharedValidation,
        inputEOU: p.frEOU,
        inputEOD: p.frEOD,
        inputGrowth: p.frGrowth,
        inputEnergyPriceGrowth: p.frEnergyPriceGrowth,
        inputCombinedMarket: p.frCombinedMarket,
        inputDuration: p.frDuration,
        frPrice: p.frPrice,

        frUpPrice: p.frUpPrice,
        frDownPrice: p.frDownPrice,

        inputTimestep: sharedDefaults.generationProfileTimestep,
        dataYear: p.dataYear,
        optionsYN: [
          { text: 'Yes', value: true },
          { text: 'No', value: false },
        ],
      };
    },
    methods: {
      save() {
        const price = new PriceTimeSeries(this.inputTimestep, 'FR', this.inputTimeseries);
        // const upPrice = new PriceTimeSeries(this.inputTimestep, 'Reg Up', this.inputTimeseries);
        this.$store.dispatch('newFRPrice', price);

        this.$store.dispatch('setFReou', this.inputEOU);
        this.$store.dispatch('setFReod', this.inputEOD);
        this.$store.dispatch('setFRGrowth', this.inputGrowth);
        this.$store.dispatch('setFREnergyGrowth', this.inputEnergyPriceGrowth);
        this.$store.dispatch('setFRCombinedMarket', this.inputCombinedMarket);
        this.$store.dispatch('setFRDuration', this.inputDuration);
      },
    },
  };
</script>
