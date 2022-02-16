<template>
  <div>
    <br />
    <form>
      <div class="form-horizontal form-buffer container">
        <page-errors
          pageGroupName="Project Overview"
          :pages="filterNonActives(overviewPages)"
        />
        <page-errors
          pageGroupName="Technology Components"
          :pages="filterNonActives(technologyItemsFlattened)"
        />

        <page-errors
          pageGroupName="Services Components"
          :pages="filterNonActives(objectives)"
        />
        <page-errors
          pageGroupName="Financial Components"
          :pages="filterNonActives(financial)"
        />

        </br>

        <h4>Project Configuration</h4>
        <template>
          <b-table-lite thead-tr-class="d-none" fixed hover bordered striped
            :items="setup">
          </b-table-lite>
        </template>
        </br>

        <h4>Technology Specifications</h4>
        <ul>
          <li v-for="techItem in filterNonActives(technologyItemsFlattened)">
            {{ techItem.name }}
          </li>
        </ul>
        </br>

        <h4>Services</h4>
        <ul>
          <li v-for="service in activeServices">
            {{ addSpaces(service) }}
          </li>
        </ul>
        </br>

        <h4>Financial Inputs</h4>
        <template>
          <b-table-lite thead-tr-class="d-none" fixed hover bordered striped
            :items="finances">
          </b-table-lite>
        </template>
        </br>

        <div class="form-group form-buffer text-center">
          <file-picker
            label="Export Project"
            :callback="exportProject"
            :isAsync="true"
            :isDirectory="true"
            buttonAttributes="btn btn-lg btn-info btn-summary"
            wrapperDivAttributes="col-md-12"/>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
  import FilePicker from '@/components/Shared/FilePicker';
  import PageErrors from '@/components/Wizard/Run/PageErrors';
  import pagesMixin from '@/mixins/pagesMixin';
  import * as paths from '@/router/constants';
  import { exportProject } from '@/service/ProjectFileManager';

  export default {
    mixins: [pagesMixin],
    components: {
      FilePicker,
      PageErrors,
    },
    data() {
      return {
        paths,
        setup: [
          ['Project Name', (this.$store.state.Project.name || '')],
          ['Start Year', this.$store.state.Project.startYear],
          ['Data year', this.$store.state.Project.dataYear],
          ['Grid Domain', this.$store.state.Project.gridLocation],
          ['Ownership', this.$store.state.Project.ownership],
        ],
        activeServices: this.getListOfActiveServices(),
        finances: [
          ['Discount rate', this.getRateDisplay(this.$store.state.Project.financeDiscountRate)],
          ['Inflation rate', this.getRateDisplay(this.$store.state.Project.financeInflationRate)],
          ['Federal tax rate', this.getRateDisplay(this.$store.state.Project.financeFederalTaxRate)],
          ['State tax rate', this.getRateDisplay(this.$store.state.Project.financeStateTaxRate)],
          ['Property tax rate', this.getRateDisplay(this.$store.state.Project.financePropertyTaxRate)],
        ],
      };
    },
    methods: {
      getRateDisplay(rate) {
        return rate === null ? '' : `${rate} %`;
      },
      addSpaces(text) {
        const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
        return text.replace(rex, '$1$4 $2$3$5');
      },
      exportProject(selectedPath) {
        return exportProject(selectedPath, this.$store.state.Project, this.$store.state.Application);
      },
      getListOfActiveServices() {
        const p = this.$store.state.Project;
        const activeServices = [];
        if (p.objectivesResilience) activeServices.push('Resilience');
        if (p.objectivesBackupPower) activeServices.push('BackupPower');
        if (p.objectivesRetailDemandChargeReduction) activeServices.push('RetailDemandChargeReduction');
        if (p.objectivesSR) activeServices.push('SR');
        if (p.objectivesNSR) activeServices.push('NSR');
        if (p.objectivesFR) activeServices.push('FR');
        if (p.objectivesLF) activeServices.push('LF');
        if (p.objectivesDeferral) activeServices.push('Deferral');
        if (p.objectivesUserDefined) activeServices.push('UserDefined');
        if (p.objectivesDR) activeServices.push('DR');
        if (p.objectivesRA) activeServices.push('RA');
        return activeServices;
      },
    },
  };
</script>
