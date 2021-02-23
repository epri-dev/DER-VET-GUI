import { v4 as uuidv4 } from 'uuid';
import { cloneDeep, flatten, startCase } from 'lodash';
import operateOnKeysList from '@/util/object';
import { isNotNullAndNotUndefined } from '@/util/logic';
import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

const csvUploadMixin = {
  components: { TimeseriesDataUpload },
  data() { },
  beforeMount() {
    // submitted is false initially; set it to true after the first save.
    // initially, complete is null; after saving, it is set to either true or false.
    // we want to show validation errors at any time after the first save, with submitted.
    if (isNotNullAndNotUndefined(this.complete)) {
      this.submitted = true;
      this.$v.$touch();
    }
  },
  methods: {
    capitalize(str) {
      return startCase(str);
    },
    childKey(tsField) {
      return this[this.childKeyField(tsField)];
    },
    childKeyField(tsField) {
      return `${tsField}ChildKey`;
    },
    getChildKey() {
      return uuidv4();
    },
    getChildKeys(tsFields) {
      const childKeys = {};
      tsFields.forEach((tsField) => {
        childKeys[this.childKeyField(tsField)] = this.getChildKey();
      });
      return childKeys;
    },
    /*
    getCompletenessPayload(constants) {
      return {
        pageGroup: constants.PAGEGROUP,
        pageKey: constants.PAGEKEY,
        page: constants.PAGE,
        completeness: !this.$v.$invalid && !this.isTSError,
      };
    },
    */
    getDataFromProject(fields) {
      return operateOnKeysList(this.$store.state.Project, fields, f => f);
    },
    getErrorListPayload() {
      const errors = [];
      Object.keys(this.$v).forEach((key) => {
        if (key.charAt(0) !== '$' && this.$v[key].$invalid) {
          errors.push(this.getErrorMsg(key));
        }
      });
      // get TS errorlist, and append it
      const tsErrors = this.getErrorListTS();
      errors.push(tsErrors);
      return {
        pageGroup: this.CONSTANTS.PAGEGROUP,
        pageKey: this.CONSTANTS.PAGEKEY,
        page: this.CONSTANTS.PAGE,
        errorList: flatten(errors),
      };
    },
    getErrorMsgTS(tsField) {
      return `${this.capitalize(this.metadata[tsField].displayName)} Data is required`;
    },
    getTSInputDefaultDataFromProject(tsFields) {
      const inputTS = {};
      tsFields.forEach((tsField) => {
        const inputTSField = `${tsField}Input`;
        inputTS[inputTSField] = null;
      });
      return inputTS;
    },
    getUseExistingDefaults(tsFields) {
      const useExistingDefaults = {};
      tsFields.forEach((tsField) => {
        useExistingDefaults[this.useExistingField(tsField)] = true;
      });
      return useExistingDefaults;
    },
    inputField(tsField) {
      return `${tsField}Input`;
    },
    receiveRemove(payload) {
      const { objectName } = payload;
      // remove data by overwriting with an empty data object
      const emptyData = cloneDeep(this[objectName]);
      emptyData.data = [];
      this.$store.dispatch(this.metadata[objectName].setActionName, emptyData);
      this[objectName] = cloneDeep(emptyData);
      // set input Data object to null
      this[this.inputField(objectName)] = null;
      // set errorList
      this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
    },
    receiveUseExisting(payload) {
      const { button, objectName } = payload;
      this[this.useExistingField(objectName)] = button;
    },
    receiveTimeseriesData(payload) {
      const { dataArray, objectName } = payload;
      this[this.inputField(objectName)] = dataArray;
    },
    tsData(tsField) {
      const inputTSDataExists = (this[this.inputField(tsField)] !== null);
      return (inputTSDataExists) ? this[this.inputField(tsField)] : this[tsField];
    },
    tsSave(tsFields) {
      // only save uploaded data (if it exists, and useExisting is true)
      tsFields.forEach((tsField) => {
        if (this[this.inputField(tsField)] !== null && this[this.useExistingField(tsField)]) {
          this.$store.dispatch(
            this.metadata[tsField].setActionName,
            this[this.inputField(tsField)],
          );
        }
      });
    },
    useExistingField(tsField) {
      return `${tsField}UseExisting`;
    },
  },
};

export default csvUploadMixin;
