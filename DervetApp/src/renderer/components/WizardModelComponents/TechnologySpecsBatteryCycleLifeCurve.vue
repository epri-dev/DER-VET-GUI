<template>
  <div>
    <h3>Battery Storage: Cycle Life Curve</h3>
      Specify the cycle life curve for this battery.
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <i>Cycle Depth Upper Limit must be a number between 0 and 1 (inclusive)</i>
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <i>Cycle Life Value must be a number greater than or equal to 0</i>
      <br>
      <br>

    <b-table-lite
      small fixed striped hover sticky-header="315px"
      :items="items"
      :fields="fields">
      <template v-slot:cell(ulimit)="row">
        <b-form-input
          class="text-right"
          :class="{'is-invalid': isInvalidCycleDepthUpperLimit(row.item.ulimit)}"
          v-model.number="row.item.ulimit" />
      </template>
      <template v-slot:cell(val)="row">
        <b-form-input
          class="text-right"
          :class="{'is-invalid': isInvalidCycleLifeValue(row.item.val)}"
          v-model.number="row.item.val" />
      </template>
      <template v-slot:cell(remove)="row">
        <b-col class="text-right">
          <b-button
            size="sm"
            class="btn-xs btn-danger delete-tech"
            v-on:click="removeRow(row.index)" >
            remove
          </b-button>
        </b-col>
      </template>
    </b-table-lite>

    <div>{{loadingMessage}}</div>

    <div>
      <button
        type="button"
        class="btn-xs btn-info"
        @click="addRow">
        + Add Cycle
      </button>
    </div>

    <hr/>

    <save-buttons
      :continue-link="WIZARD_COMPONENT_PATH"
      :displayError="!complete"
      :error-text="errorMessage"
      :save="this.save" />

  </div>
</template>

<script>
  import { _, cloneDeep } from 'lodash';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import SaveButtons from '@/components/Shared/SaveButtons';
  import { xgetSingleErrorMsg } from '@/util/validation';

  const TABLE_ITEM_NAME = 'battery cycle life periods';

  export default {
    components: { SaveButtons },
    props: {
      batteryId: String,
      // batteryCycles: Array,
    },
    computed: {
      batteryCycleRows() {
        const battery = this.$store.getters.getBatteryById(this.batteryId);
        if (battery && battery.associatedInputs[0]) {
          return battery.associatedInputs[0].dataRows;
        }
        return [];
      },
      complete() {
        return this.errorMessage === '';
      },
      errorMessage() {
        return xgetSingleErrorMsg(this.batteryCycleRows, TABLE_ITEM_NAME);
      },
      loadingMessage() {
        /*
        const battery = this.$store.getters.getBatteryById(this.batteryId);
        if (battery) {
          if (battery.associatedInputs[0]) {
            this.callThis(cloneDeep(battery).associatedInputs[0].dataRows);
          }
          return '';
        }
        return 'Loading...';
        */
        this.callThis(cloneDeep(this.batteryCycleRows));
        return '';
      },
    },
    data() {
      return {
        fields: [
          { key: 'ulimit', label: 'Cycle Depth Upper Limit', thClass: 'text-right' },
          { key: 'val', label: 'Cycle Life Value', thClass: 'text-right' },
          { key: 'remove', label: '' },
        ],
        items: [],
        WIZARD_COMPONENT_PATH,
      };
    },
    methods: {
      isInvalidCycleDepthUpperLimit(ulimit) {
        const n = parseFloat(ulimit);
        if (Number.isNaN(n)) { return true; }
        return (ulimit < 0 || ulimit > 1);
      },
      isInvalidCycleLifeValue(val) {
        const n = parseFloat(val);
        if (Number.isNaN(n)) { return true; }
        return (val < 0);
      },
      isRowComplete(row) {
        if (this.isInvalidCycleDepthUpperLimit(row.ulimit)
          || this.isInvalidCycleLifeValue(row.val)) {
          return false;
        }
        return true;
      },
      callThis(cycles) {
        this.items = cycles;
      },
      removeRow(index) {
        this.items.splice(index, 1);
      },
      addRow() {
        this.items.push({});
      },
      save() {
        // add the completness of each row
        Object.values(this.items).forEach((row) => {
          row.complete = this.isRowComplete(row);
        });
        const payload = this.makeSavePayload();
        this.$store.dispatch('addBatteryCyclesToTechnologySpecsBattery', payload);
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      makeSavePayload() {
        const payloadNotComplete = _.map(this.items, 'complete').includes(false);
        return {
          batteryId: this.batteryId,
          batteryCycles: {
            complete: !payloadNotComplete,
            dataRows: this.items,
            errorList: !payloadNotComplete ? []
              : [xgetSingleErrorMsg(this.items, TABLE_ITEM_NAME)],
          },
        };
      },
    },
  };
</script>
