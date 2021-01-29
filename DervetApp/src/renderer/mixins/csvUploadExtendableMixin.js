const csvUploadMixin = {
  data() {
    return {
      inputTimeseries: {},
      inputMonthly: {},
    };
  },
  methods: {
    receiveTimeseriesData(payload) {
      const { dataArray, dataName } = payload;
      this.inputTimeseries[dataName] = dataArray;
    },
    receiveMonthlyData(payload) {
      const { dataArray, dataName } = payload;
      this.inputMonthly[dataName] = dataArray;
    },
  },
};

export default csvUploadMixin;
