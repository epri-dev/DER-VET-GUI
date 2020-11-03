<template>
  <div>
    <h3>Define your Components</h3>
    <hr>
      <div class="form-horizontal form-buffer">

          <div class="col-md-7 table-bordered">
            <h4>List of Technologies Added</h4>

              <b-table-lite striped hover borderless small
                :fields="fieldsGen"
                :items="techGen">
                <template v-slot:cell(tagname)="row">
                  <b-col class="text-left">{{ row.item.tag + ': ' + row.item.name }}</b-col>
                </template>
                <template v-slot:cell(buttons)="row">
                  <b-col class="text-right">
                    <b-button size="sm" @click="deactivateTech(row.item)" variant="outline-danger" class="btn btn-xs">Deactivate</b-button>
                    <b-button size="sm" @click="removeTech(row.item)" class="btn btn-xs btn-danger delete-tech">Remove</b-button>
                  </b-col>
                </template>
              </b-table-lite>

              <b-table-lite striped hover borderless small
                :fields="fieldsIR"
                :items="techIR">
                <template v-slot:cell(tagname)="row">
                  <b-col class="text-left">{{ row.item.tag + ': ' + row.item.name }}</b-col>
                </template>
                <template v-slot:cell(buttons)="row">
                  <b-col class="text-right">
                    <b-button size="sm" @click="deactivateTech(row.item)" variant="outline-danger" class="btn btn-xs">Deactivate</b-button>
                    <b-button size="sm" @click="removeTech(row.item)" class="btn btn-xs btn-danger delete-tech">Remove</b-button>
                  </b-col>
                </template>
              </b-table-lite>

              <b-table-lite striped hover borderless small
                :fields="fieldsESS"
                :items="techESS">
                <template v-slot:cell(tagname)="row">
                  <b-col class="text-left">{{ row.item.tag + ': ' + row.item.name }}</b-col>
                </template>
                <template v-slot:cell(buttons)="row">
                  <b-col class="text-right">
                    <b-button size="sm" @click="deactivateTech(row.item)" variant="outline-danger" class="btn btn-xs">Deactivate</b-button>
                    <b-button size="sm" @click="removeTech(row.item)" class="btn btn-xs btn-danger delete-tech">Remove</b-button>
                  </b-col>
                </template>
              </b-table-lite>

          </div>
        </div>
        <hr>
        <div class="col-md-7 table-bordered">
            <h4>List of Services Added</h4>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        fieldsGen: [
          { key: 'tagname', label: 'Generators' },
          { key: 'buttons', label: '' },
        ],
        fieldsIR: [
          { key: 'tagname', label: 'Intermittent Resources' },
          { key: 'buttons', label: '' },
        ],
        fieldsESS: [
          { key: 'tagname', label: 'Energy Storage Systems' },
          { key: 'buttons', label: '' },
        ],
      };
    },
    computed: {
      techGen() {
        return this.$store.state.Project.listOfActiveTechnologies.Generator;
      },
      techIR() {
        return this.$store.state.Project.listOfActiveTechnologies['Intermittent Resource'];
      },
      techESS() {
        return this.$store.state.Project.listOfActiveTechnologies['Energy Storage System'];
      },
    },
    methods: {
      deactivateTech(payload) {
        this.$store.dispatch('deactivateTech', payload);
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      removeTech(payload) {
        this.$store.dispatch('removeTech', payload);
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      save() {
      },
    },
  };
</script>
