<template>
  <div id="data-upload">
    <hr />
    <div v-if="this.validDataExists" class="form-group">
      <div class="col-md-12">
        <label for="UseExistingData" class="control-label"><b>{{this.firstLetterCapitalized}}</b> data have been uploaded for this project. Do you want to use these data?</label>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-form-group>
            <b-form-radio-group
              v-model="useExisting"
              :options="sharedValidation.optionsYN.allowedValues"
              @input="onChange"
            ></b-form-radio-group>
          </b-form-group>
        </div>
        <div class="col-md-5">
          <b-button
            size="sm"
            class="btn-xs btn-danger delete-ts pull-right"
            v-on:click="removeTS">
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
            :disabled="disableUpload"
            @change="onFileUpload">
        </div>
      </div>
      <div v-if="(importedFilePath !== null) || (importError)"
        class="error-text-color">
        <span v-html="importError"></span>
      </div>
      <div v-else-if="(importedFilePath === null) && isInvalid"
        class="error-text-color">
        <span v-html="errorMessage"></span>
      </div>
    </div>
    <div v-if="(this.validDataExists && this.useExisting)">
      <div class="col-md-10" :id="this.chartName">
      </div>
    </div>
  </div>
</template>

<script>
  import Plotly from 'plotly.js';
  import { flatten } from 'lodash';
  import { parseCsvFromEvent } from '@/util/file';
  import { isNumeric } from '@/util/logic';
  import { sharedDefaults, sharedValidation } from '@/models/Shared.js';
  import TimeSeriesBase from '@/models/TimeSeries/TimeSeriesBase';

  export default {
    updated() {
      if (this.validDataExists) {
        this.createChartUploadedDataPlot(this.chartName);
      }
    },
    data() {
      return {
        sharedValidation,
        useExisting: sharedDefaults.useExistingTimeSeriesData,
        importError: undefined,
        importedFilePath: null,
        // showPlot: true,
        ...this.importErrorOnDisabledUpload(),
      };
    },
    computed: {
      firstLetterCapitalized() {
        return this.dataName.charAt(0).toUpperCase() + this.dataName.slice(1);
      },
      stringifyDataFrequency() {
        return this.dataFrequency.value === 'monthly' ? 'month' : 'timestep';
      },
      validDataExists() {
        return (this.dataExists && [undefined, ''].includes(this.importError));
      },
      // showPlot() {
      // return (this.validDataExists && this.importError === undefined);
      // },
    },
    props: {
      chartName: String,
      dataExists: Boolean,
      dataName: String,
      dataFrequency: Object,
      dataYear: String,
      disableUpload: Boolean,
      errorMessage: String,
      isInvalid: Boolean,
      numberOfEntriesRequired: String,
      tsName: String,
      units: String,
      uploadedData: Object,
      xAxis: Array,
    },
    methods: {
      firstNValues(array) {
        // for displaying only the first n elements, then ...
        const n = 5;
        const size = array.length;
        if (size <= n) {
          return array;
        }
        return [array.slice(0, n), '...'];
      },
      importErrorOnDisabledUpload() {
        if (this.disableUpload) {
          return { importError: 'Both <b>Data Year</b> and <b>Timestep</b> must be defined validly in Project Overview' };
        }
        return {};
      },
      onChange(e) {
        this.importedFilePath = null;
        const payload = {
          button: e,
          tsName: this.tsName,
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
            this.validateUploadedData(results);
            // this.importedFilePath = importedFilePath;
          }
          if (this.importError === undefined) {
            // only emit back when there are no errors
            //   thus preventing an invalid TS from being saved
            this.$emit('uploaded', this.uploadPayload(flatten(results)));
            // this.showPlot = true;
            this.useExisting = true;
          }
        };
        parseCsvFromEvent(e, onSuccess);
      },
      removeTS() {
        // emit a payload to:
        // - reset the stored TS data with an empty TS
        // - then set the associated errorList
        // and set variables to not render existing upload
        this.useExisting = false;
        this.importError = null;
        // emit back payload to initiate a reset of the errorlist
        const payload = {
          tsName: this.tsName,
        };
        this.$emit('click', payload);
      },
      validateUploadedData(dataArray) {
        // this method sets the importError string with up to 3 lines,
        //   before any field-specific validations
        // 1. totalRowCount must equal numberOfEntriesRequired
        const totalRowCount = String(dataArray.length);
        if (totalRowCount !== this.numberOfEntriesRequired) {
          this.importError = `<b>Invalid Data</b>: This file has <b>${totalRowCount}</b> entries. It must have ${this.numberOfEntriesRequired}.`;
        }
        const columnsPerRow = dataArray.map(row => row.length);
        // 2. each row must have a single array of size 1
        const invalidRowsSize = columnsPerRow.reduce((a, val, i) => {
          if (val !== 1) a.push(i + 1);
          return a;
        }, []);
        const invalidRowsSizeCount = invalidRowsSize.length;
        if (invalidRowsSizeCount !== 0) {
          this.importError += `<br><b>${invalidRowsSizeCount} Invalid Rows</b> with > 1 entry: [${this.firstNValues(invalidRowsSize)}]`;
        }
        // 3. each row with a single array size of 1 must have a numeric value
        const invalidRowsType = columnsPerRow.reduce((a, val, i) => {
          if (val === 1 && !isNumeric(dataArray[i])) a.push(i + 1);
          return a;
        }, []);
        const invalidRowsTypeCount = invalidRowsType.length;
        if (invalidRowsTypeCount !== 0) {
          this.importError += `<br><b>${invalidRowsTypeCount} Invalid Rows</b> with a non-numeric entry: [${this.firstNValues(invalidRowsType)}]`;
        }
        // 4. add field-specific import-errors here as needed
        // TODO: add these (e.g. solar data must be between 0 and 1)
      },
      uploadPayload(dataResults) {
        // grab columnHeaderName from the uploadedData TimeSeriesBase object
        const { columnHeaderName } = this.uploadedData;
        return {
          dataArray: new TimeSeriesBase(columnHeaderName, this.units, dataResults),
          tsName: this.tsName,
        };
      },
      createChartUploadedDataPlot(chartId) {
        const ctx = document.getElementById(chartId);
        if (ctx === null) {
          // TODO: AE: investigate if this is problematic (when ctx is null)
          console.log('ctx is null -- cannot make plot');
          return null;
        }
        console.log('making plot');
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
