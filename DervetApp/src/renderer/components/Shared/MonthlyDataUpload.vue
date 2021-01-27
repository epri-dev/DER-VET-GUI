<template>
  <div id="monthly-data-upload">
    <data-upload
      chart-name="chartName"
      data-name="dataName"
      data-frequency="{ value: 'monthly', unit: '' }"
      :DataModel="TimeSeriesModel"
      number-of-entries-required='12'
      units="units"
      @uploaded="uponUpload"
      :uploaded-data="monthlyData"
      :x-axis="month"
    />
  </div>
</template>

<script>
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                 "Aug", "Sep", "Oct", "Nov", "Dec"];

  export default {
    data() {
      return {
        month,
      };
    },
    props: {
      uponUpload: Function,
      dataName: String,
      units: String,
      monthlyData: Object,
      chartName: String,
      DataModel: Function,
    },
  };
</script>
