<template>
  <div id="data-upload">
    <hr />
    <div v-if="(validDataExists)||(tsFrequencyHasChanged)" class="form-group">
      <div class="col-md-12">
        <label for="UseExistingData" class="control-label"><b>{{this.firstLetterCapitalized}}</b> data have been uploaded for this project. Do you want to use these data?</label>
      </div>
      <div class="row">
        <div class="col-md-3">
          <b-form-group>
            <b-form-radio-group
              v-model="useExisting"
              :options="sharedValidation.optionsYN.allowedValues"
              @input="onChange"
            ></b-form-radio-group>
          </b-form-group>
        </div>
        <div class="col-md-5 error-text-color">
          <span v-html="uploadedData.error"></span>
        </div>
        <div class="col-md-3">
          <b-button
            size="sm"
            class="btn-xs btn-danger delete-data pull-right"
            @click="removeData">
            Remove Data
          </b-button>
        </div>
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
          <label>{{this.dataYearLabel}}</label>
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
          <span class="unit-label" v-html="this.unit"></span>
        </div>
        <div class="col-md-7">
          <input
            type="file"
            class="form-control"
            :disabled="disableUpload"
            @change="onFileUpload">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-1"></div>
        <div v-if="(importedFilePath !== null) || (importError)"
          class="error-text-color">
          <span v-html="importError"></span>
        </div>
        <div v-else-if="(importedFilePath === null) && isInvalid"
          class="error-text-color">
          <span v-html="errorMessage"></span>
        </div>
      </div>
      <div v-if="!dataExists && isSampleDataAvailable">
        <div class="form-group row">
          <div class="col-md-12">
            <i><a :href="getSampleDataFileName()" download class="important-link text-decoration-none"> Download a sample <b>{{dataName}}</b><code>.csv</code> file</a>{{getSampleDataText()}}</i>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPlot">
      <div class="col-md-10" :id="this.chartName">
      </div>
    </div>

  </div>
</template>

<script>
  import Plotly from 'plotly.js';
  import { parseCsvFromEvent } from '@/util/file';
  import { sharedDefaults, sharedValidation } from '@/models/Shared.js';

  export default {
    updated() {
      if (this.showPlot) {
        this.createChartUploadedDataPlot(this.chartName);
      }
    },
    data() {
      return {
        sharedValidation,
        useExisting: sharedDefaults.useExistingTimeSeriesData,
        importError: undefined,
        importedFilePath: null,
        unit: this.uploadedData.unit,
        columnHeaderName: this.uploadedData.columnHeaderName,
        ...this.importErrorOnDisabledUpload(),
        dataYearLabel: this.dataYear || 'N/A',
      };
    },
    computed: {
      firstLetterCapitalized() {
        return this.dataName.charAt(0).toUpperCase() + this.dataName.slice(1);
      },
      isSampleDataAvailable() {
        return ['12', '8760', '8784'].includes(this.numberOfEntriesRequired);
      },
      showPlot() {
        return (this.validDataExists && this.useExisting);
      },
      stringifyDataFrequency() {
        return this.dataFrequency.value === 'monthly' ? 'month' : 'timestep';
      },
      tsFrequencyHasChanged() {
        return (!this.validDataExists && this.uploadedData.data.length !== 0);
      },
      validDataExists() {
        return (this.dataExists && [undefined, ''].includes(this.importError));
      },
    },
    props: {
      chartName: String,
      dataExists: Boolean,
      DataModel: Function,
      dataName: String,
      dataFrequency: Object,
      dataYear: String,
      disableUpload: Boolean,
      errorMessage: String,
      isInvalid: Boolean,
      numberOfEntriesRequired: String,
      objectName: String,
      uploadedData: Object,
      xAxis: Array,
    },
    methods: {
      arrayDisplayFirstFifteen(array) {
        const num = 15;
        return (array.length <= num) ? array : [array.slice(0, num), '...'];
      },
      getSampleDataFileName() {
        const dataModelName = (new this.DataModel([])).constructor.name;
        switch (this.numberOfEntriesRequired) {
          case '12': {
            const name = dataModelName.replace(/(Monthly)$/, '_$1');
            return `files/Sample_${name}_${this.numberOfEntriesRequired}.csv`;
          }
          case '8760': {
            const name = dataModelName.replace(/(TimeSeries)$/, '_$1');
            return `files/Sample_${name}_${this.numberOfEntriesRequired}.csv`;
          }
          case '8784': {
            const name = dataModelName.replace(/(TimeSeries)$/, '_$1');
            return `files/Sample_${name}_${this.numberOfEntriesRequired}.csv`;
          }
          default: {
            return undefined;
          }
        }
      },
      getSampleDataText() {
        switch (this.numberOfEntriesRequired) {
          case '12': {
            return ' with 12 values representing each calendar month';
          }
          case '8760': {
            return ' with a 60-minute timestep for a year with 365 days (8,760 entries)';
          }
          case '8784': {
            return ' with a 60-minute timestep for a leap year with 366 days (8,784 entries)';
          }
          default: {
            return undefined;
          }
        }
      },
      importErrorOnDisabledUpload() {
        if (this.disableUpload) {
          return { importError: 'Both <b>Data Year</b> and <b>Timestep</b> must be defined in Project Configuration' };
        }
        return {};
      },
      onChange(e) {
        this.importedFilePath = null;
        const payload = {
          button: e,
          objectName: this.objectName,
        };
        this.$emit('input', payload);
      },
      onFileUpload(e) {
        const onSuccess = (results, importedFilePath, errors) => {
          // we must trim the last row off because it's always there as null
          // TODO: AE: try this on other operating systems to make sure
          results = results.slice(0, -1);
          this.importError = errors;
          this.importedFilePath = importedFilePath;
          if (importedFilePath !== null && errors === undefined) {
            const newData = new this.DataModel(results);
            const validationResult = newData.validate(this.numberOfEntriesRequired);
            if (validationResult.length !== 0) this.importError = validationResult;
            if (this.importError === undefined) {
              // only emit back when there are no errors
              //   thus preventing an invalid TS from being saved
              this.$emit('uploaded', this.uploadPayload(newData));
              this.useExisting = true;
            }
          }
        };
        parseCsvFromEvent(e, onSuccess);
      },
      removeData() {
        // emit a payload to:
        // - reset the stored TS data with an empty TS
        // - then set the associated errorList
        // and set variables to not render existing upload
        this.useExisting = false;
        this.importError = null;
        // emit back payload to initiate a reset of the errorlist
        const payload = {
          objectName: this.objectName,
        };
        this.$emit('click', payload);
      },
      uploadPayload(dataResults) {
        return {
          dataArray: dataResults,
          objectName: this.objectName,
        };
      },
      createChartUploadedDataPlot(chartId) {
        const ctx = document.getElementById(chartId);
        const uploadedTS = {
          x: this.xAxis,
          y: this.uploadedData.data,
          unit: this.unit,
          mode: 'lines',
          name: '', // this.firstLetterCapitalized,
          hovertemplate: `%{y} ${this.unit}`,
        };
        const data = [uploadedTS];
        const layout = {
          // showlegend: true,
          legend: {
            orientation: 'h', // 'v'
            x: 0,
            y: 1.12,
          },
          height: 310,
          modebar: {
            orientation: 'v', // 'h' set how modebar will appear
          },
          title: {
            text: this.columnHeaderName,
            font: {
              size: 20,
            },
            yanchor: 'top',
          },
          yaxis: {
            title: {
              text: this.unit,
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
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'resetScale2d'],
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };
</script>
