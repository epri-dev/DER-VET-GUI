import helpers from '../util/helpers';

const csvUploadMixin = {
  data() {
    return {
      inputTimeseries: null,
    };
  },
  methods: {
    onFileUpload(e) {
      const onSuccess = (flatResults) => { this.inputTimeseries = flatResults; };
      helpers.parseCsvFromFile(e, onSuccess);
    },
  },
};

export default csvUploadMixin;
