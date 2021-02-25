<template>
  <div id="monthly-data-upload">
    <data-upload
      :chart-name="chartName"
      @click="onRemove"
      :data-exists="dataExists"
      :data-name="dataName"
      :data-frequency="{ value: 'monthly', unit: '' }"
      :DataModel="DataModel"
      :disable-upload="false"
      :error-message="errorMessage"
      :is-invalid="isInvalid"
      number-of-entries-required='12'
      @uploaded="onFileUpload"
      @input="onChange"
      :object-name="objectName"
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
    methods: {
      onChange(payload) {
        this.$emit('input', payload);
      },
      onFileUpload(payload) {
        this.$emit('uploaded', payload);
      },
      onRemove(payload) {
        this.$emit('click', payload);
      },
    },
    props: {
      chartName: String,
      dataExists: Boolean,
      DataModel: Function,
      dataName: String,
      dataTimeSeries: Object,
      errorMessage: String,
      isInvalid: Boolean,
      objectName: String,
    },
  };
</script>
