<template>
  <div>
    <instructions
      :displayName="metadata.displayName"
      :unit="metadata.unit"
      :isMonthly="metadata.isMonthly"
      :numberOfEntriesRequired="numberOfEntriesRequired"
      :disableUpload="disableUpload"
    />

    <br/>

    <sample-file-download
      :sampleDataFileName="metadata.sampleDataFileName"
      :numberOfEntriesRequired="numberOfEntriesRequired"
      :dataYear="dataYear"
    />

    <br/>

    <upload-form
      :dataExists="dataExists"
      :disableUpload="disableUpload"
      @fileUpload="onFileUpload"
      @removeData="onRemoveData"
    />

    <div v-if="isInvalid" class="form-group row">
      <div class="col-md-12 error-text-color text-center">
        <span v-html="importErrorMessage || validationErrorMessage"></span>
      </div>
    </div>

    <div v-if="showChart">
      <chart
        :chartKey="chartKey"
        :columnHeaderName="metadata.columnHeaderName"
        :data="data"
        :displayName="metadata.displayName"
        :timeSeriesXAxis="timeSeriesXAxis"
        :unit="metadata.unit"
      />
    </div>

    <hr />
  </div>
</template>

<script>
  import _ from 'lodash';

  import Chart from '@/components/Wizard/InputFields//TimeSeriesUpload/Chart';
  import Instructions from '@/components/Wizard/InputFields//TimeSeriesUpload/Instructions';
  import SampleFileDownload from '@/components/Wizard/InputFields//TimeSeriesUpload/SampleFileDownload';
  import UploadForm from '@/components/Wizard/InputFields//TimeSeriesUpload/UploadForm';
  import { parseCsvFromEvent } from '@/util/file';
  import { isNullOrUndefined } from '@/util/logic';
  import { MONTHS } from '@/util/time';
  import { CsvRowValidator } from '@/util/validation';

  export default {
    components: { Chart, Instructions, SampleFileDownload, UploadForm },
    props: {
      chartKey: String,
      data: Array,
      metadata: Object,
      validationErrorMessage: String,
      isInvalid: Boolean,
    },
    data() {
      return {
        importErrorMessage: null,
      };
    },
    computed: {
      dataExists() {
        return this.data.length !== 0;
      },
      disableUpload() {
        return this.numberOfEntriesRequired === 0;
      },
      numberOfEntriesRequired() {
        return this.timeSeriesXAxis.length;
      },
      timeSeriesXAxis() {
        return this.metadata.isMonthly ? MONTHS : this.$store.getters.getTimeseriesXAxis;
      },
      showChart() {
        return this.dataExists && !this.validationErrorMessage;
      },
      dataYear() {
        return this.$store.state.Project.dataYear;
      },
    },
    methods: {
      onFileUpload(e) {
        const onParse = (results, importedFilePath, parsingError) => {
          if (parsingError) {
            this.importErrorMessage = parsingError;
          } else {
            const validator = new CsvRowValidator(results);
            if (validator.isInvalid()) {
              this.importErrorMessage = validator.getErrorMessage();
            } else {
              this.importErrorMessage = null;
              this.emitData(this.formatResults(results));
            }
          }
        };
        parseCsvFromEvent(e, onParse);
      },
      onRemoveData() {
        this.emitData([]);
      },
      emitData(data) {
        this.$emit('data', this.makePayload(data));
      },
      makePayload(value) {
        return { fieldName: this.metadata.tsName, value };
      },
      formatResults(results) {
        const singleColumn = _.map(results, row => _.head(row));
        return this.trimLastLineIfNull(singleColumn);
      },
      trimLastLineIfNull(results) {
        // trim last value if it's null or undefined; can commonly happens with some line terminators
        const lastLine = _.last(results);
        const trimLast = isNullOrUndefined(lastLine);
        return trimLast ? results.slice(0, -1) : results;
      },
    },
  };
</script>
