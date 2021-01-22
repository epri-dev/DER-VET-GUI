<template>
  <div class="container body-content form-buffer">
    <h2>Import Existing Project</h2>
    <hr />

    <p>
      Import an existing project by clicking the "Choose File" button below and selecting the ZIP file from your computer that contains the
      exported project you wish to import. Note that this file must be a ZIP file that includes the DER-VET project and application file (a <code>.json</code> file).
    </p>

    <div class="form-horizontal form-buffer">
      <!-- TODO change isDirectory to false once zipping is implemented -->
      <file-picker
        label="Select Project"
        :onFileSelect="setImportDirectory"
        buttonAttributes="btn btn-primary"
        wrapperDivAttributes="col-md-2"
        :isDirectory="true"
        :isAsync="false"
      />
      <div class=col-md-10>
        {{this.importDirectory}}
      </div>
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
  import { WIZARD_START_PATH } from '@/router/constants';
  import { importProject } from '@/service/ProjectFileManager';
  import store from '@/store';
  import { LOAD_NEW_PROJECT } from '@/store/actionTypes';

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
              [project, this.applicationState] = parsed;
              store.dispatch(LOAD_NEW_PROJECT, project);
            })
            .then(() => store.dispatch('Application/setNewApplicationState', this.applicationState))
            .then(() => this.$router.push({ path: WIZARD_START_PATH }));
        }
      },
    },
  };
</script>
