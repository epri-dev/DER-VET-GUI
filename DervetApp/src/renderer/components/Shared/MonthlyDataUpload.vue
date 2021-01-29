<template>
  <div id="monthly-data-upload">
    <data-upload
      :chart-name="chartName"
      :data-name="dataName"
      :data-frequency="{ value: 'monthly', unit: '' }"
      :DataModel="DataModel"
      number-of-entries-required='12'
      :units="units"
      :uploaded-data="monthlyData"
      :x-axis="month"
    />
  </div>
</template>

<script>
  import DataUpload from './DataUpload';

  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  export default {
    components: { DataUpload },
    data() {
      return {
        month,
      };
    },
    props: {
      chartName: String,
      dataName: String,
      monthlyData: Object,
      DataModel: Function,
      units: String,
    },
  };
</script>
