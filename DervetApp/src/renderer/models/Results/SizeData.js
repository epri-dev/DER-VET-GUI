import BaseTableData from './BaseTableData';

class SizeData extends BaseTableData {
  constructor() {
    super('size.csv', true);

    this.cCostColumnName = 'Capital Cost ($)';
    this.cCostkWColumnName = 'Capital Cost ($/kW)';
    this.cCostkWhColumnName = 'Capital Cost ($/kWh)';

    this.fields = [
      {
        key: 'system_name',
        sortable: false,
        label: 'System Name',
      },
      {
        key: 'energy_rating',
        sortable: false,
        label: 'Energy Rating (kWh)',
      },
      {
        key: 'charge_rating',
        sortable: false,
        label: 'Charge Rating (kW)',

      },
      {
        key: 'duration',
        sortable: false,
        label: 'Duration (hours)',
      },
      {
        key: 'quantity',
        sortable: false,
        label: 'Discharge Rating (kW)',
      },
      {
        key: 'discharge_rating',
        sortable: false,
        label: 'Disharge Rating (kW)',
      },
      {
        key: 'power_capacity',
        sortable: false,
        label: 'Power Capacity (kW)',
      },
    ];
  }
  // createCostTableData(rowSizeData) {
  //   let costStructure = [];
  //   let energyCost = 0;
  //   let powerCost = 0;
  //   let unitsCost = 0;
  //   if ('capitalCostkWh' in rowSizeData) {
  //     const cCostkWh = rowSizeData.capitalCostkWh;
  //     energyCost = cCostkWh * rowSizeData.energyRating;
  //     const costPerkWh = [
  //       {
  //         label: 'Cost per kWh',
  //         subTotal: `$${energyCost.toLocaleString()}`,
  //       },
  //       {
  //         subTotal: '=',
  //         strEquation: `${rowSizeData.energyRating.toLocaleString()}kWh x $${cCostkWh.toLocale
  // String()}/kWh`,
  //       },
  //     ];
  //     costStructure = costPerkWh;
  //   }
  //   if ('capitalCostkW' in rowSizeData) {
  //     const cCostkW = rowSizeData.capitalCostkW;
  //     const powerCapacity = rowSizeData.dischargeRating || rowSizeData.powerCapacity;
  //     powerCost = powerCapacity * cCostkW;
  //     const costPerkW = [
  //       {
  //         label: 'Cost per kW',
  //         subTotal: `$${powerCost.toLocaleString()}`,
  //       },
  //       {
  //         subTotal: '=',
  //         strEquation: `${powerCapacity.toLocaleString()}kW x $${cCostkW.toLocaleString()}/kWh`,
  //       },
  //     ];
  //     costStructure = [...costPerkW, ...costStructure];
  //   }
  //   if ('capitalCost' in rowSizeData) {
  //     const cCost = rowSizeData.capitalCost;
  //     unitsCost = rowSizeData.quantity * cCost;
  //     const costPerUnit = [
  //       {
  //         label: 'Cost per Unit',
  //         subTotal: `$${unitsCost.toLocaleString()}`,
  //       },
  //       {
  //         subTotal: '=',
  //         strEquation: `${rowSizeData.quantity} x $${cCost.toLocaleString()}`,
  //       },
  //     ];
  //     costStructure = [...costPerUnit, ...costStructure];
  //   }
  //   const total = energyCost + powerCost + unitsCost;
  //   const totalCost = [
  //     {
  //       label: 'Total Cost',
  //       total: `$${total.toLocaleString()}`,
  //     },
  //   ];
  //   costStructure = [...totalCost, ...costStructure];
  //   return {
  //     name: rowSizeData.systemName,
  //     items: costStructure,
  //   };
  // }
}

export default SizeData;
