import cloneDeep from 'lodash/cloneDeep';

const associatedInputsMixin = {
  computed: {
    isComplete() {
      return !this.isTSError;
    },
    // this property is triggered when there are no non-TS errors to the inputs on the page,
    //   and submitted is true
    isTSError() {
      let isError = false;
      (this.CONSTANTS.TS_FIELDS).forEach((field) => {
        if (this.getErrorListTS(field).length !== 0) {
          isError = true;
        }
      });
      return isError;
    },
  },
  methods: {
    getAssociatedInputs(fields, aiArray) {
      const aiObject = {};
      (fields).forEach((field, index) => {
        aiObject[field] = aiArray[index].ts;
      });
      return aiObject;
    },
    getErrorListTS(tsField) {
      const errors = [];
      const errorMsgTS = this.getErrorMsgTSFromProject(tsField);
      if (errorMsgTS.length !== 0) {
        errors.push(errorMsgTS);
      }
      return errors;
    },
    receiveRemove(payload) {
      const { objectName } = payload;
      // remove data by overwriting with an empty data object
      const emptyData = cloneDeep(this[objectName]);
      emptyData.data = [];
      // set input Data object to null
      this[this.inputField(objectName)] = null;
      const tsPayload = this.tsPayload(objectName);
      tsPayload.data.ts = emptyData;
      this.$store.dispatch(this.metadata[objectName].actionSetName, tsPayload);
      this[objectName] = cloneDeep(emptyData);
    },
    tsPayload(tsField) {
      const ts = (this[this.inputField(tsField)] !== null
        && this[this.useExistingField(tsField)])
        ? this[this.inputField(tsField)] : undefined;
      const payloadComplete = (ts !== undefined);
      const data = {
        errorList: payloadComplete ? [] : [this.requiredDataLabel(tsField)],
        complete: payloadComplete,
      };
      if (payloadComplete) {
        data.ts = ts;
      }
      return {
        index: 0,
        id: this.id,
        data,
      };
    },
    tsSave(tsFields) {
      // only save uploaded data (if it exists, and useExisting is true)
      tsFields.forEach((tsField) => {
        if (this[this.inputField(tsField)] !== null && this[this.useExistingField(tsField)]) {
          this.$store.dispatch(
            this.metadata[tsField].actionSetName,
            this.tsPayload(tsField),
          );
        }
      });
    },
    validatedSave() {
      this.submitted = true;
      this.$v.$touch();
      // save
      this.tsSave(this.CONSTANTS.TS_FIELDS);
    },

  },
};

export default associatedInputsMixin;
