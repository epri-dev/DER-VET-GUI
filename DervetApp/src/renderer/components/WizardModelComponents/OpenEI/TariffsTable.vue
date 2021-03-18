<template>
  <div>
    <b-table
      id="tariffs-table"
      :per-page="perPage"
      :current-page="currentPage"
      :striped="true"
      :bordered="true"
      :items="tariffs"
      :fields="fields">
      <template #cell(nameAndLabel)="data">
        <input
          class="form-check-input"
          type="radio"
          v-model="$attrs.value"
          :value="data.item.label"
          @change="selectTariff"/>
        <span>
          {{data.item.name}}
        </span>
      </template>
      <template #cell(link)="data">
        <open-external-link :link="makeTariffUrl(data.item.label)" text="View"/>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      :limit="10"
      aria-controls="tariffs-table"
      class="col-md-12 center"
      align="center"
    />
  </div>
</template>

<script lang="ts">
  import OpenExternalLink from '@/components/Shared/OpenExternalLink';

  export default {
    props: {
      tariffs: {
        type: Array,
      },
    },
    components: { OpenExternalLink },
    computed: {
      rows() {
        return this.tariffs.length;
      },
    },
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        searchText: '',
        fields: [
          {
            key: 'nameAndLabel',
            label: '',
            headerTitle: '',
            class: 'table-align-left left-margin-table-buffer',
          },
          {
            key: 'link',
            label: '',
            headerTitle: '',
            class: 'table-align-center',
          },
        ],
      };
    },
    methods: {
      makeTariffUrl(tariffLabel: string) {
        return `https://openei.org/apps/IURDB/rate/view/${tariffLabel}`;
      },
      selectTariff(e: any) {
        this.$emit('input', e.target.value);
      },
    },
  };
</script>
