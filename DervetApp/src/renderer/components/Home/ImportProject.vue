<template>
  <div class="container body-content form-buffer">
    <h2>Import Existing Project</h2>
    <hr />

    <p>
      Import an existing project by clicking the "Choose File" button below and selecting the ZIP file from your computer that contains the
      exported project you wish to import. Note that this file must be a ZIP file that includes the DER-VET project and application file (a <code>.json</code> file).
    </p>

    <div class="form-horizontal form-buffer">
      <file-picker
        label="Select Project"
        :callback="setImportDirectory"
        buttonAttributes="btn btn-primary"
        wrapperDivAttributes="col-md-2"
        :isDirectory="false"
        :isAsync="false"
      />
      <div class=col-md-10>
        {{this.importDirectory}}
      </div>
      <br/>
      <div class="col-md-offset-2 col-md-10">
        <router-link :to="$route.path"
                     class="btn btn-primary"
                     v-on:click.native="importProject()">
          Import
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import FilePicker from '@/components/Shared/FilePicker.vue';
  import { SUMMARY } from '@/router/constants';
  import { importProject } from '@/service/ProjectFileManager';
  import store from '@/store';
  import { APPLICATION } from '@/store/modules/Application';
  import { LOAD_NEW_PROJECT } from '@/store/actionTypes';
  import { PROJECT } from '@/models/Project/constants';

  export default {
    components: {
      FilePicker,
    },
    data() {
      return {
        importDirectory: null,
        applicationState: null,
      };
    },
    methods: {
      setImportDirectory(path) {
        this.importDirectory = path;
      },
      importProject() {
        // TODO create class w/ application object + project
        let project;
        if (this.importDirectory !== null) {
          importProject(this.importDirectory)
            .then((parsed) => {
              project = parsed.find(item => item.storeType === PROJECT);
              this.applicationState = parsed.find(item => item.storeType === APPLICATION);
              store.dispatch(LOAD_NEW_PROJECT, project);
            })
            .then(() => store.dispatch('Application/setNewApplicationState', this.applicationState))
            .then(() => this.$router.push({ path: SUMMARY }));
        }
      },
    },
  };
</script>
