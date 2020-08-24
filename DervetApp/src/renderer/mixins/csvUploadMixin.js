const csvUploadMixin = {
  data() {
    return {
      inputTimeseries: null,
    };
  },
  methods: {
    receiveTimeseriesData(timeseries) {
      this.inputTimeseries = timeseries;
    },
  },
};

export default csvUploadMixin;
