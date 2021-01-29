<template>
  <div id="data-upload">
    <hr />
    <div v-if="this.dataExists" class="form-group">
      <div class="col-md-12">
        <label for="UseExistingData" class="control-label"><b>{{this.firstLetterCapitalized}}</b> data have been uploaded for this project. Do you want to use these data?</label>
      </div>
      <div class="col-md-12">
        <b-form-group>
          <b-form-radio-group
            v-model="useExisting"
            :options="sharedValidation.optionsYN.allowedValues"
          ></b-form-radio-group>
        </b-form-group>
      </div>
    </div>
    <div id="DataFile-Form" v-if="!(useExisting)||!(this.dataExists)">
      <div class="row">
        <div class="col-md-12">
          Upload the <b>{{this.dataName}}</b> as a <code>.csv</code> file that contains a reading for each <b>{{this.stringifyDataFrequency}}</b> on a separate line.
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2 control-label">
          <label>Data Year:</label>
        </div>
        <div class="col-md-3">
          <label>{{this.dataYear}}</label>
        </div>
        <div class="col-md-2 control-label">
          <label>Frequency of data:</label>
        </div>
        <div class="col-md-5">
          <label>{{dataFrequency.value}}</label>
          <span class="unit-label">{{dataFrequency.unit}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <p>We require an input file with <b>{{numberOfEntriesRequired}}</b> entries.</p>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-5">
          <label class="control-label capitalize">
            {{this.dataName}} data
          </label>
          <span class="unit-label" v-html="this.units"></span>
        </div>
        <div class="col-md-7">
          <input
            type="file"
            class="form-control"
            @change="onFileUpload">
        </div>
      </div>
    </div>
    <div v-if="this.dataExists">
      <div class="col-md-10" :id="this.chartName">
      </div>
    </div>
  </div>
</template>

<script>
  import Plotly from 'plotly.js';
  import { flatten } from 'lodash';
  import { notNullAndUndefined } from '@/util/logic';
  import { parseCsvFromEvent } from '@/util/file';
  import { sharedDefaults, sharedValidation } from '@/models/Shared.js';

  export default {
    mounted() {
      if (this.dataExists) {
        this.createChartUploadedDataPlot(this.chartName);
      }
    },
    data() {
      return {
        sharedValidation,
        useExisting: sharedDefaults.useExistingTimeSeriesData,
      };
    },
    computed: {
      dataExists() {
        const data = this.uploadedData;
        if (!notNullAndUndefined(data)) {
          // this.updloadedData is empty
          return false;
        }
        // this.uploadedData is object, so check if data is empty
        return notNullAndUndefined(data.data);
      },
      firstLetterCapitalized() {
        return this.dataName.charAt(0).toUpperCase() + this.dataName.slice(1);
      },
      dataYear() {
        return this.$store.state.Project.dataYear;
      },
      stringifyDataFrequency() {
        return this.dataFrequency.value === 'monthly' ? 'monthly' : 'timestep';
      },
    },
    props: {
      chartName: String,
      dataName: String,
      dataFrequency: Object,
      DataModel: Function,
      numberOfEntriesRequired: String,
      units: String,
      uploadedData: Object,
      xAxis: Array,
    },
    methods: {
      onFileUpload(e) {
        const onSuccess = (results) => {
          this.$emit('uploaded', this.uploadPayload(flatten(results)));
        };
        parseCsvFromEvent(e, onSuccess);
      },
      uploadPayload(dataResults) {
        return {
          dataArray: new this.DataModel(dataResults),
          dataName: this.dataName,
        };
      },
      createChartUploadedDataPlot(chartId) {
        const ctx = document.getElementById(chartId);
        const uploadedTS = {
          x: this.xAxis,
          y: this.uploadedData.data,
          unit: this.units,
          mode: 'lines',
          name: '', // this.firstLetterCapitalized,
          hovertemplate: `%{y} ${this.units}`,
        };
        const data = [uploadedTS];
        const layout = {
          // showlegend: true,
          legend: {
            orientation: 'h', // 'v'
            x: 0,
            y: 1.12,
          },
          height: 500,
          modebar: {
            orientation: 'v', // 'h' set how modebar will appear
          },
          title: {
            text: this.uploadedData.columnHeaderName,
            font: {
              size: 20,
            },
            yanchor: 'top',
          },
          yaxis: {
            title: {
              text: this.units,
              font: {
                size: 12,
              },
              standoff: 0,
            },
          },
          xaxis: {
            rangeslider: {
              thickness: 0.06,
            },
            title: {
              text: '',
              font: {
                size: 12,
              },
              standoff: 30, // create gap between axis and title
            },
            // layer: 'below traces',
          },
          margin: {
            l: 50, // 80 is default
            r: 60, // 80 is default
            t: 20, // 100 is default
          },
        };
        const config = {
          displaylogo: false, // hides the plotly logo from the modebar when false
          scrollZoom: true, // allows mouse wheel scroll when true
          staticPlot: false, // disable modebar options when true
          responsive: true, // responsive to window size
          autosizeable: true,
          toImageButtonOptions: {
            // set defaults for saving plot image
            format: 'png', // 'jpeg',
            filename: `${this.dataName.replace(/ /g, '-')}-uploaded-data-plot`,
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };
</script>
