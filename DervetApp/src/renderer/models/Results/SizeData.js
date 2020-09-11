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
  set loadDataFromFile(folderPath) {
    this.results_loaded = true;
    // TODO
    return this.results_loaded;
  }
}

export default SizeData;
