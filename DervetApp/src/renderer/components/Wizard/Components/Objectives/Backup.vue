<template>
  <div>
    <h3>Services: Backup Power</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <time-series-upload
        :chartKey="chartKey"
        :data="mtsBackupEnergyPrice"
        :metadata="metadata.mtsBackupEnergyPrice"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.mtsBackupEnergyPrice"
        @data="setData"
      />

      <time-series-upload
        :chartKey="chartKey"
        :data="mtsBackupEnergyReservation"
        :metadata="metadata.mtsBackupEnergyReservation"
        :isInvalid="showTimeSeriesErrorMessage()"
        :validationErrorMessage="timeSeriesErrors.mtsBackupEnergyReservation"
        @data="setData"
      />

      <nav-buttons
        :show-error="showSaveButtonErrorMessage()"
        :on-left-click="validatedSave"
        :on-right-click="validatedSaveContinue"
      />
    </div>
  </div>
</template>

<script>
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import { CollectionType } from '@/models/Project/CollectionType';

  export default {
    mixins: [wizardFormMixin],
    data() {
      return this.getData(CollectionType.Project, Page.ObjectivesBackup);
    },
  };
</script>
