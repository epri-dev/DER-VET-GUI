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
      :error-text="getSingleErrorMsg()"
      :save="this.save" />

  </div>
</template>

<script>
  import { cloneDeep } from 'lodash';
  import { WIZARD_COMPONENT_PATH, TECH_SPECS_BATTERY_PATH } from '@/router/constants';
  import SaveButtons from '@/components/Shared/SaveButtons';

  export default {
    components: { SaveButtons },
    props: {
      batteryId: String,
      batteryCycles: Array,
    },
    computed: {
      complete() {
        return this.getNumberOfInvalidRows() === 0;
      },
      loadingMessage() {
        const battery = this.$store.getters.getBatteryById(this.batteryId);
        if (battery) {
          this.callThis(cloneDeep(battery).batteryCycles);
          return '';
        }
        return 'Loading...';
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
        TECH_SPECS_BATTERY_PATH,
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
      getSingleErrorMsg() {
        if (this.getNumberOfInvalidRows() === -1) {
          return 'There are no battery cycle life values specified.';
        } else if (!this.complete) {
          const pluralizeRow = (this.getNumberOfInvalidRows() === 1) ? '' : 's';
          return `There are errors with ${this.getNumberOfInvalidRows()} row${pluralizeRow} in the table.`;
        }
        return '';
      },
      getNumberOfInvalidRows() {
        // return the number of invalid rows; return -1 if there are zero rows
        let invalidRowsCount = 0;
        if (this.items.length === 0) {
          return -1;
        }
        Object.values(this.items).forEach((row) => {
          if (this.isInvalidCycleDepthUpperLimit(row.ulimit)
            || (this.isInvalidCycleLifeValue(row.val))) {
            invalidRowsCount += 1;
          }
        });
        return invalidRowsCount;
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
        const payload = this.makeSavePayload();
        this.$store.dispatch('addBatteryCyclesToTechnologySpecsBattery', payload);
      },
      makeSavePayload() {
        return {
          batteryId: this.batteryId,
          batteryCycles: this.items,
          batteryCyclesComplete: this.complete,
          batteryCyclesErrorMsg: this.getSingleErrorMsg(),
        };
      },
    },
  };
</script>
