import project from '@/store/modules/Project';

const { mutations } = project;

describe('Project Mutations', () => {
  it('should replace additional data for battery cycle with proper completeness', () => {
    const batteryId = '123qwe789uio';
    const state = {
      technologySpecsBattery: [{
        id: batteryId,
        associatedInputs: [{ displayName: 'Name', errorList: [] }],
        associatedInputsComplete: true,
        complete: true,
        componentSpecsComplete: true,
      }],
    };
    const payload = {
      batteryId,
      batteryCycles: {
        complete: false,
        errorList: ['error here'],
      },
    };

    mutations.ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY(state, payload);

    expect(state.technologySpecsBattery[0].complete).to.equal(false);
    expect(state.technologySpecsBattery[0].associatedInputsComplete).to.equal(false);
    expect(state.technologySpecsBattery[0].associatedInputs[0].complete).to.equal(false);
    expect(state.technologySpecsBattery[0].componentSpecsComplete).to.equal(true);
    expect(state.technologySpecsBattery[0].associatedInputs[0].displayName).to.equal('Name');
    expect(state.technologySpecsBattery[0].associatedInputs[0].errorList[0]).to.equal('error here');
  });

  it('should set project ID', () => {
    const state = { id: null };
    const newId = 'e4ccd19f-0f3c-49ef-a955-bf063687982d';

    mutations.SET_ID(state, newId);

    expect(state.id).to.equal(newId);
  });

  it('should remove all billing periods', () => {
    const state = { retailTariffBillingPeriods: ['test'] };

    mutations.REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS(state);

    expect(state.retailTariffBillingPeriods).to.have.lengthOf(0);
  });

  it('should add a new billing period', () => {
    const state = { retailTariffBillingPeriods: [] };
    const newBillingPeriod = { startTime: 0, endTime: 12 };

    mutations.ADD_RETAIL_TARIFF_BILLING_PERIOD(state, newBillingPeriod);

    expect(state.retailTariffBillingPeriods).to.have.lengthOf(1);
    expect(state.retailTariffBillingPeriods[0]).to.equal(newBillingPeriod);
  });

  it('should remove a single billing period', () => {
    const bp1 = { id: '4747', startTime: 0, endTime: 12 };
    const bp2 = { id: '50505', startTime: 2, endTime: 3 };
    const state = { retailTariffBillingPeriods: [bp1, bp2] };

    mutations.REMOVE_RETAIL_TARIFF_BILLING_PERIOD(state, '4747');

    expect(state.retailTariffBillingPeriods).to.have.lengthOf(1);
    expect(state.retailTariffBillingPeriods[0]).to.equal(bp2);
  });

  it('should replace billing periods', () => {
    const bp1 = { id: '47', startTime: 0, endTime: 12 };
    const bp2 = { id: '42', startTime: 2, endTime: 3 };
    const bp3 = { id: '7', startTime: 1, endTime: 10 };
    const bp4 = { id: '19', startTime: 11, endTime: 15 };
    const state = { retailTariffBillingPeriods: [bp1, bp2] };

    mutations.REPLACE_RETAIL_TARIFF_BILLING_PERIODS(state, [bp3, bp4]);

    expect(state.retailTariffBillingPeriods).to.have.lengthOf(2);
    expect(state.retailTariffBillingPeriods[0]).to.equal(bp3);
    expect(state.retailTariffBillingPeriods[1]).to.equal(bp4);
  });

  it('should set retail and wholesale booleans accordingly when true', () => {
    const state = { objectivesDA: false };

    mutations.CHOOSE_ENERGY_STRUCTURE(state, true);

    expect(state.objectivesDA).to.equal(true);
    expect(state.objectivesRetailEnergyChargeReduction).to.equal(false);
    expect(state.energyPriceSourceWholesale).to.equal(true);
  });

  it('should set retail and wholesale booleans accordingly when false', () => {
    const state = { objectivesDA: true };

    mutations.CHOOSE_ENERGY_STRUCTURE(state, false);

    expect(state.objectivesDA).to.equal(false);
    expect(state.objectivesRetailEnergyChargeReduction).to.equal(true);
    expect(state.energyPriceSourceWholesale).to.equal(false);
  });

  it('should set services accordingly from list', () => {
    const list1 = ['UserDefined', 'RetailDemandChargeReduction', 'SR'];
    const state = {};

    mutations.SELECT_OTHER_SERVICES(state, list1);

    expect(state.listOfActiveServices).to.equal(list1);
    expect(state.objectivesUserDefined).to.equal(true);
    expect(state.objectivesRetailDemandChargeReduction).to.equal(true);
    expect(state.objectivesSR).to.equal(true);
    expect(state.objectivesResilience).to.equal(false);
    expect(state.objectivesBackupPower).to.equal(false);
    expect(state.objectivesNSR).to.equal(false);
    expect(state.objectivesFR).to.equal(false);
    expect(state.objectivesLF).to.equal(false);
    expect(state.objectivesDeferral).to.equal(false);
    expect(state.objectivesFR).to.equal(false);
  });

  it('should properly remove from all errorLists in a tech that has a non-null complete', () => {
    const state = {
      technologySpecsBattery: [
        {
          id: 'a1',
          complete: false,
          errorList: ['the key is abc alright', 'abcs are key', 'no a bee c here'],
        },
        {
          id: 'a2',
          complete: false,
          errorList: ['abacus'],
        },
      ],
    };
    const payload = {
      techType: 'technologySpecsBattery',
      displayName: 'abc',
    };
    mutations.REMOVE_FROM_ALL_ERRORLISTS_IN_TECH(state, payload);
    expect(state.technologySpecsBattery[0].errorList).to.eql(['no a bee c here']);
    expect(state.technologySpecsBattery[1].errorList).to.eql(['abacus']);
  });

  it('should properly add to all errorLists in a tech that has a non-null complete', () => {
    const state = {
      technologySpecsBattery: [
        {
          id: 'a1',
          complete: false,
          errorList: ['the key is abc alright'],
        },
        {
          id: 'a2',
          complete: false,
          errorList: [],
        },
      ],
    };
    const payload = {
      techType: 'technologySpecsBattery',
      displayName: 'abc',
    };
    mutations.ADD_TO_ALL_ERRORLISTS_IN_TECH(state, payload);
    expect(state.technologySpecsBattery[0].errorList).to.eql(['the key is abc alright', 'abc is required']);
    expect(state.technologySpecsBattery[1].errorList).to.eql(['abc is required']);
  });
});
