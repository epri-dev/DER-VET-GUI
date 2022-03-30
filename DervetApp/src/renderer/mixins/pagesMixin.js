import _ from 'lodash';
import { mapGetters } from 'vuex';

import MetadataFactory from '@/models/Project/Metadata/Factory';
import Page from '@/models/Application/Page';
import { CollectionType } from '@/models/Project/CollectionType';
import PageMetadata from '@/models/Application/PageMetadata';
import * as paths from '@/router/constants';

/*
tech extra fields
------
id
collectionType (instead of page)
*/

const pagesMixin = {
  methods: {
    filterNonActives(listOfPages) {
      return _.filter(listOfPages, 'active');
    },
    getTechDisplayName(techTypeShortName, name) {
      return name ? `${techTypeShortName}: ${name}` : techTypeShortName;
    },
    addStatusProperties(pageList) {
      return _.map(pageList, spec => ({
        ...spec,
        complete: this.isPageComplete(spec.page),
        errors: this.getPageErrorList(spec.page),
        submitted: this.isPageSubmitted(spec.page),
      }));
    },
    getPageErrorList(page, id) {
      return _.values(this.getPageErrors(page, id));
    },
    mapPageMetadata(pages) {
      return _.map(pages, page => ({ page, ...this.pageMetadata[page] }));
    },
  },
  computed: {
    ...mapGetters({
      isPageComplete: 'Application/isPageComplete',
      isPageSubmitted: 'Application/isPageSubmitted',
      getPageErrors: 'Application/getPageErrors',
    }),
    // DRY everything below plz
    externalIncentives() {
      return this.$store.state.Project.externalIncentives;
    },
    externalIncentivesExist() {
      return this.externalIncentives.length > 0;
    },
    areAllExternalIncentivesComplete() {
      const type = CollectionType.ExternalIncentive;
      return _.every(this.externalIncentives, (bp) => this.isPageComplete(type, bp.id));
    },
    externalIncentivesError() {
      return this.areAllExternalIncentivesComplete ? '' : 'Some external incentives contain errors';
    },
    billingPeriods() {
      return this.$store.state.Project.retailTariffBillingPeriods;
    },
    billingPeriodsExist() {
      return this.billingPeriods.length > 0;
    },
    areAllBillingPeriodsComplete() {
      const type = CollectionType.RetailTariff;
      return _.every(this.billingPeriods, (bp) => this.isPageComplete(type, bp.id));
    },
    billingPeriodsErrorExists() {
      return !this.areAllBillingPeriodsComplete || !this.billingPeriodsExist;
    },
    billingPeriodsError() {
      if (!this.billingPeriodsExist) return 'There are no billing periods specified';
      if (!this.areAllBillingPeriodsComplete) return 'Some billing periods contain errors';
      return '';
    },
    pageMetadata() {
      return (new PageMetadata(this.$store.state.Project)).pages;
    },
    overviewPages: {
      cache: false,
      get() {
        const overviewPages = this.mapPageMetadata([
          Page.ProjectConfiguration,
          Page.Objectives,
          Page.Technologies,
        ]);
        return this.addStatusProperties(overviewPages);
      },
    },
    techSpecs: {
      cache: false,
      get() {
        const p = this.$store.state.Project;
        return [
          {
            collectionType: CollectionType.ICE,
            items: p.technologySpecsICE,
            techTypeFullName: 'Internal Combustion Engine (ICE) Generator Sets',
            techTypeShortName: 'ICE',
            path: paths.TECH_SPECS_ICE,
          },
          {
            collectionType: CollectionType.DieselGen,
            items: p.technologySpecsDieselGen,
            techTypeFullName: 'Diesel Generator Sets',
            techTypeShortName: 'Diesel Generator',
            path: paths.TECH_SPECS_DIESEL,
          },
          {
            collectionType: CollectionType.SolarPV,
            items: p.technologySpecsSolarPV,
            techTypeFullName: 'Solar Photovoltaic (PV) Sytems',
            techTypeShortName: 'PV',
            metadata: MetadataFactory.getMetadata(CollectionType.SolarPV),
            path: paths.TECH_SPECS_PV,
          },
          {}, // filler card (empty, but gives some order when rendered)
          {
            collectionType: CollectionType.Battery,
            items: p.technologySpecsBattery,
            techTypeFullName: 'Battery Energy Storage Sytems (BESS)',
            techTypeShortName: 'Battery',
            metadata: MetadataFactory.getMetadata(CollectionType.Battery),
            path: paths.TECH_SPECS_BATTERY,
          },
          {}, // filler card (empty, but gives some order when rendered)
          {
            collectionType: CollectionType.SingleEV,
            items: p.technologySpecsSingleEV,
            techTypeFullName: 'Single Electric Vehicle (EV)',
            techTypeShortName: 'Single EV',
            metadata: MetadataFactory.getMetadata(CollectionType.SingleEV),
            path: paths.TECH_SPECS_SINGLE_EV,
          },
          {
            collectionType: CollectionType.FleetEV,
            items: p.technologySpecsFleetEV,
            techTypeFullName: 'Fleet Electric Vehicle (EV)',
            techTypeShortName: 'Fleet EV',
            metadata: MetadataFactory.getMetadata(CollectionType.FleetEV),
            path: paths.TECH_SPECS_FLEET_EV,
          },
          {
            collectionType: CollectionType.ControllableLoad,
            items: p.technologySpecsControllableLoad,
            techTypeFullName: 'Controllable Loads (Demand Response)',
            techTypeShortName: 'Controllable Load',
            metadata: MetadataFactory.getMetadata(CollectionType.ControllableLoad),
            path: paths.TECH_SPECS_CONTROLLABLE_LOAD,
          },
        ];
      },
    },
    technologyItems: {
      cache: false,
      get() {
        return _.reduce(this.techSpecs, (result, techSpec) => {
          result[techSpec.collectionType] = _.map(techSpec.items, item => ({
            id: item.id,
            active: item.active,
            path: `${techSpec.path}/${item.id}`,
            collectionType: techSpec.collectionType,
            name: this.getTechDisplayName(techSpec.techTypeShortName, item.values.name),
            complete: this.isPageComplete(techSpec.collectionType, item.id),
            errors: this.getPageErrorList(techSpec.collectionType, item.id),
            submitted: this.isPageSubmitted(techSpec.collectionType, item.id),
          }));
          return result;
        }, {});
      },
    },
    technologyItemsFlattened: {
      cache: false,
      get() {
        return _.reduce(this.technologyItems, (result, tech) => [...result, ...tech], []);
      },
    },
    objectives: {
      cache: false,
      get() {
        const objectivePages = this.mapPageMetadata([
          Page.ObjectivesSiteInformation,
          Page.ObjectivesSystemInformation,
          Page.ObjectivesDeferral,
          Page.ObjectivesFR,
          Page.ObjectivesLF,
          Page.ObjectivesNSR,
          Page.ObjectivesSR,
          Page.ObjectivesReliabilityTarget,
          Page.ObjectivesDR,
          Page.ObjectivesRA,
          Page.ObjectivesBackup,
          Page.ObjectivesUserDefined,
          Page.ObjectivesDA,
        ]);
        return this.addStatusProperties(objectivePages);
      },
    },
    financial: {
      cache: false,
      get() {
        const p = this.$store.state.Project;
        const showRetailTariff = (
          p.objectivesRetailEnergyChargeReduction || p.objectivesRetailDemandChargeReduction
        );
        return [
          {
            page: Page.Financial,
            ...this.pageMetadata[Page.Financial],
            complete: this.isPageComplete(Page.Financial),
            errors: this.getPageErrorList(Page.Financial),
            submitted: this.isPageSubmitted(Page.Financial),
          },
          {
            name: 'External Incentives',
            page: CollectionType.ExternalIncentive,
            path: paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES,
            active: true,
            complete: this.areAllExternalIncentivesComplete,
            errors: this.externalIncentivesError ? [this.externalIncentivesError] : [],
            submitted: true,
          },
          {
            name: 'Retail Tariff',
            page: CollectionType.RetailTariff,
            path: paths.FINANCIAL_INPUTS_RETAIL_TARIFF,
            active: showRetailTariff,
            complete: !this.billingPeriodsErrorExists,
            errors: this.billingPeriodsError ? [this.billingPeriodsError] : [],
            submitted: true,
          },
          {
            page: Page.FuelCosts,
            ...this.pageMetadata[Page.FuelCosts],
            complete: this.isPageComplete(Page.FuelCosts),
            errors: this.getPageErrorList(Page.FuelCosts),
            submitted: this.isPageSubmitted(Page.FuelCosts),
          },
        ];
      },
    },
  },
};

export default pagesMixin;
