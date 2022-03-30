<template>
  <div class="form-group row">
    <div class="col-md-12">
      <i><a :href="getSampleDataFilePath()" download class="important-link text-decoration-none"> Download a sample <b>{{sampleDataFileName}}</b><code>.csv</code> file</a> {{getSampleDataText()}}</i>
    </div>
  </div>
</template>

<script>
  import { fileUrl, getExtraResourcesPath } from '@/util/file';
  import { isLeapYear } from '@/util/time';

  export default {
    props: {
      sampleDataFileName: String,
      numberOfEntriesRequired: Number,
      dataYear: Number,
    },
    methods: {
      getSampleDataFilePath() {
        const fullFileName = `Sample_${this.sampleDataFileName}_${this.numberOfEntriesRequired}.csv`;
        return fileUrl(getExtraResourcesPath(fullFileName, ['samples']));
      },
      getSampleDataText() {
        if (this.numberOfEntriesRequired === 12) {
          return 'with 12 values representing each calendar month.';
        } if (isLeapYear(this.dataYear)) {
          return 'with a 60-minute timestep for a leap year with 366 days (8,784 entries).';
        }
        return 'with a 60-minute timestep for a year with 365 days (8,760 entries).';
      },
    },
  };
</script>