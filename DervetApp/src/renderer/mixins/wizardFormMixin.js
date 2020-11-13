import DropDownInput from '@/components/Shared/DropDownInput';
import NavButtons from '@/components/Shared/NavButtons';
import RadioButtonInput from '@/components/Shared/RadioButtonInput';
import TextInput from '@/components/Shared/TextInput';

export default {
  components: {
    DropDownInput,
    NavButtons,
    RadioButtonInput,
    TextInput,
  },
  data() {
    return {
      // when a page is first navigated to, set submitted to false
      //   so that un-populated fields do not appear invalid
      submitted: false,
    };
  },
  methods: {
    getErrorMsgWrapped(validation, $v, metadata, fieldName) {
      // this method returns a single validation error message (String)
      // NOTE: the ordering of each if-block is intentional here
      const { displayName } = metadata[fieldName];
      let displayMsg = displayName;

      if (!$v[fieldName].required) {
        displayMsg += ' is required';
        return displayMsg;
      }
      if (validation[fieldName].decimal && !$v[fieldName].decimal) {
        displayMsg += ' must be a number';
        return displayMsg;
      }
      if (validation[fieldName].minValue && !$v[fieldName].minValue) {
        displayMsg += ` must be >= ${metadata[fieldName].minValue}`;
        return displayMsg;
      }
      if (validation[fieldName].maxValue && !$v[fieldName].maxValue) {
        displayMsg += ` must be <= ${metadata[fieldName].maxValue}`;
        return displayMsg;
      }
      return '';
    },
  },
};
