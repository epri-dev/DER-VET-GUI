<template>
  <div>
    <h3>Battery Storage: Cycle Life Curve</h3>
      Specify the cycle life curve for this battery

    <b-table-lite
      small fixed striped hover sticky-header="315px"
      :items="items"
      :fields="fields">
      <template v-slot:cell(ulimit)="row">
        <b-form-input v-model="row.item.ulimit" class="text-right"/>
      </template>
      <template v-slot:cell(val)="row">
        <b-form-input v-model="row.item.val" class="text-right"/>
      </template>
      <template v-slot:cell(remove)="row">
        <b-col class="text-right">
          <b-button size="sm" class="btn-xs btn-danger delete-tech" v-on:click="removeRow(row.index)">remove</b-button>
        </b-col>
      </template>
    </b-table-lite>

    <div>{{loadingMessage}}</div>

    <div>
      <button type="button" class="btn-xs btn-info" @click="addRow">+ Add Cycle</button>
    </div>

    <hr/>

    <save-buttons
      :continue-link="WIZARD_COMPONENT_PATH"
      :save="this.save"
    />

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
        const activePayload = this.makeSaveActivePayload();
        this.$store.dispatch('addBatteryCyclesToTechnologySpecsBattery', payload);
        this.$store.dispatch('activateTech', activePayload);
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      makeSaveActivePayload() {
        return {
          id: this.batteryId,
          tag: 'Battery',
        };
      },
      makeSavePayload() {
        return {
          batteryId: this.batteryId,
          batteryCycles: this.items,
        };
      },
    },
  };
</script>
