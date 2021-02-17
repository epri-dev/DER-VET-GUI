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
          @change="selectTariff">
        <span>
          {{data.item.name}}
        </span>
      </template>
      <template #cell(link)="data">
        <a class="text-decoration-none" @click="e => openOpenEIInBrowser(e, data.item.label)" href=''>View</a>
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
  import { shell } from 'electron'; // eslint-disable-line

  export default {
    props: {
      tariffs: {
        type: Array,
      },
    },
    computed: {
      rows() {
        return this.tariffs.length;
      },
    },
    data() {
      return {
        currentPage: 1,
        perPage: 10,
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
      openOpenEIInBrowser(e: any, tariffLabel: string) {
        e.preventDefault();
        shell.openExternal(`https://openei.org/apps/IURDB/rate/view/${tariffLabel}`);
      },
      selectTariff(e: any) {
        this.$emit('input', e.target.value);
      },
    },
  };
</script>
