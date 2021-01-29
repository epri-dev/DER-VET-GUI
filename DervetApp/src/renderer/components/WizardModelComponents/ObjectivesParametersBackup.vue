<template>
  <div>
    <h3>Services: Backup Power</h3>
    <form class="form-horizontal form-buffer">

      <monthly-data-upload
        chart-name="chartUploadedAwardsTimeSeries"
        :data-name="priceName"
        units="$/kWh"
        :DataModel="BackupEnergyAdwardsMonthly"
        @uploaded="receiveMonthlyData"
        :data-time-series="price"
        key="1"
      />
      <monthly-data-upload
        chart-name="chartUploadedReservationTimeSeries"
        :data-name="energyReservationName"
        units="kWh"
        :DataModel="BackupEnergyReservationMonthly"
        @uploaded="receiveMonthlyData"
        :data-time-series="energyReservation"
        key="2"
      />

      <save-buttons
        :continue-link="WIZARD_COMPONENT_PATH"
        :displayError="submitted && $v.$anyError"
        :save="validatedSave" />

    </form>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import csvUploadMixin from '@/mixins/csvUploadExtendableMixin';
  import BackupEnergyReservationMonthly from '@/models/Monthly/BackupEnergyReservationMonthly';
  import BackupEnergyAdwardsMonthly from '@/models/Monthly/BackupEnergyAdwardsMonthly';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';
  import {
    SET_BACKUP_PRICE,
    SET_BACKUP_ENERGY,
  } from '@/store/actionTypes';
  import MonthlyDataUpload from '@/components/Shared/MonthlyDataUpload';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'objectives';
  const PAGE = 'backup';

  export default {
    components: { MonthlyDataUpload },
    mixins: [csvUploadMixin, wizardFormMixin],
    data() {
      const p = this.$store.state.Project;
      return {
        price: p.backupPrice,
        priceName: 'award for reserving backup power',
        energyReservation: p.backupEnergyReservation,
        energyReservationName: 'amount of energy to constantly reserve',
        WIZARD_COMPONENT_PATH,
        BackupEnergyReservationMonthly,
        BackupEnergyAdwardsMonthly,
      };
    },
    computed: {
      errorList() {
        return this.$store.state.Application.errorList[PAGEGROUP][PAGEKEY][PAGE];
      },
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (typeof this.errorList === 'object') {
        this.submitted = true;
        this.$v.$touch();
      }
    },
    methods: {
      getErrorListPayload() {
        const errors = [];
        Object.keys(this.$v).forEach((key) => {
          if (key.charAt(0) !== '$' && this.$v[key].$invalid) {
            errors.push(key);
          }
        });
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          errorList: errors,
        };
      },
      validatedSave() {
        this.submitted = true;
        this.$v.$touch();
        // set errorList
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        return this.save();
      },
      save() {
        if (this.inputMonthly[this.priceName] !== undefined) {
          this.$store.dispatch(SET_BACKUP_PRICE, this.inputMonthly[this.priceName]);
        }
        if (this.inputMonthly[this.energyReservationName] !== undefined) {
          this.$store.dispatch(SET_BACKUP_ENERGY, this.inputMonthly[this.energyReservationName]);
        }
      },
    },
  };
</script>
