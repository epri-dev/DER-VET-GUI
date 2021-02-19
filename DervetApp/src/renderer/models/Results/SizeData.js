import _ from 'lodash';
import BaseTableData from './BaseTableData';

export default class SizeData extends BaseTableData {
  constructor(data) {
    super('size.csv', data, true);
    this.powerCols = ['discharge', 'power', 'charge'];
    this.energyCols = ['energy', 'duration'];
    this.numPowerCols = 0;
    this.numEnergyCols = 0;
    // organize data into objects -- makes it easier to convert into other structures
    this.sizeTableDataRows = this.createDataObject();
  }

  createDataObject() {
    const rowDataObjects = [];
    _.forEach(this.data, (rawData) => {
      if (!BaseTableData.isRowNull(rawData)) {
        const rowTemplate = {
          systemName: rawData[0],
        };
        let nameIndex = 1;
        while (nameIndex < this.columnHeaders.length) {
          const colString = this.columnHeaders[nameIndex];
          const camelCol = BaseTableData.toCamelCaseString(colString);

          const value = rawData[nameIndex];
          if (value !== null) {
            rowTemplate[camelCol] = value;
          }
          nameIndex += 1;
        }
        if (rowTemplate.quantity === undefined) {
          rowTemplate.quantity = 1;
        }
        rowDataObjects.push(rowTemplate);
      }
    });
    return rowDataObjects;
  }

  static createSortableField(label) {
    return {
      key: BaseTableData.toCamelCaseString(label),
      sortable: true,
      label,
    };
  }

  createSizeTableFields() {
    // intialize fields with Name
    const dataColumnsFeilds = [{
      key: BaseTableData.toCamelCaseString('System Name'),
      sortable: true,
      label: 'System Name',
    }];
    // power columns
    _.forEach(this.powerCols, (powerColName) => {
      const colIndex = this.getColumnIndexThatContains(powerColName);
      if (colIndex !== -1) {
        // then the power column exists
        const label = this.columnHeaders[colIndex];
        dataColumnsFeilds.push({
          key: BaseTableData.toCamelCaseString(label),
          sortable: true,
          label,
        });
        this.numPowerCols += 1;
      }
    });
    // energy columns
    _.forEach(this.energyCols, (energyColName) => {
      const colIndex = this.getColumnIndexThatContains(energyColName);
      if (colIndex !== -1) {
        // then the energy column exists
        const label = this.columnHeaders[colIndex];
        dataColumnsFeilds.push({
          key: BaseTableData.toCamelCaseString(label),
          sortable: true,
          label,
        });
        this.numEnergyCols += 1;
      }
    });
    // quantity column
    dataColumnsFeilds.push({
      key: BaseTableData.toCamelCaseString('Quantity'),
      sortable: true,
      label: 'Quantity',
    });

    return dataColumnsFeilds;
  }

  createSizeTable() {
    return {
      data: this.sizeTableDataRows,
      fields: this.createSizeTableFields(),
    };
  }

  static createCostTableData(rowSizeData) {
    let costStructure = [];
    let energyCost = 0;
    let powerCost = 0;
    let unitsCost = 0;
    if ('capitalCostKWh' in rowSizeData) {
      const cCostkWh = rowSizeData.capitalCostKWh;
      const energyRating = rowSizeData.energyRatingKWh;
      energyCost = cCostkWh * energyRating;
      const costPerkWh = [
        {
          label: 'Cost per kWh',
          subTotal: `$${energyCost.toLocaleString()}`,
        },
        {
          subTotal: '=',
          strEquation: `${energyRating.toLocaleString()}kWh x $${cCostkWh.toLocaleString()}/kWh`,
        },
      ];
      costStructure = costPerkWh;
    }
    if ('capitalCostKW' in rowSizeData) {
      const cCostkW = rowSizeData.capitalCostKW;
      const powerCapacityKW = this.getPowerCapacityKW(rowSizeData);
      powerCost = powerCapacityKW * cCostkW;
      const costPerkW = [
        {
          label: 'Cost per kW',
          subTotal: `$${powerCost.toLocaleString()}`,
        },
        {
          subTotal: '=',
          strEquation: `${powerCapacityKW.toLocaleString()}kW x $${cCostkW.toLocaleString()}/kW`,
        },
      ];
      costStructure = [...costPerkW, ...costStructure];
    }
    if ('capitalCost' in rowSizeData) {
      const cCost = rowSizeData.capitalCost;
      unitsCost = rowSizeData.quantity * cCost;
      const costPerUnit = [
        {
          label: 'Cost per Unit',
          subTotal: `$${unitsCost.toLocaleString()}`,
        },
        {
          subTotal: '=',
          strEquation: `${rowSizeData.quantity} x $${cCost.toLocaleString()}`,
        },
      ];
      costStructure = [...costPerUnit, ...costStructure];
    }
    const total = energyCost + powerCost + unitsCost;
    const totalCost = [
      {
        label: 'Total Cost',
        total: `$${total.toLocaleString()}`,
      },
    ];
    costStructure = [...totalCost, ...costStructure];
    return {
      name: rowSizeData.systemName,
      items: costStructure,
    };
  }

  static getPowerCapacityKW(rowSizeData) {
    if (rowSizeData.dischargeRatingKW !== undefined) {
      return rowSizeData.dischargeRatingKW;
    } if (rowSizeData.powerCapacityKW !== undefined) {
      return rowSizeData.powerCapacityKW;
    }
    return 0;
  }

  createCostTables() {
    let i = 0;
    const tableData = [];
    while (i < this.sizeTableDataRows.length) {
      const rowData = SizeData.createCostTableData(this.sizeTableDataRows[i]);
      tableData.push(rowData);
      i += 1;
    }
    return tableData;
  }

  findLargestEssSize() {
    // todo write test for this
    // chooses the largest
    let essEnergy = 0;
    let essPower = 0;
    let essName = '';
    _.forEach(this.sizeTableDataRows, (row) => {
      const energy = row.energyRatingKWh;
      if (energy !== undefined) {
        if (essEnergy < row.energyRatingKWh) {
          essEnergy = energy;
          essPower = row.dischargeRatingKW;
          essName = row.systemName;
        }
      }
    });
    return { essEnergy, essPower, essName };
  }

  getEssSizes() {
    // todo write test for this
    let i = 0;
    const essEnergy = [];
    const essPower = [];
    const essName = [];
    while (i < this.sizeTableDataRows.length) {
      const row = this.sizeTableDataRows[i];
      if (row.energyRatingKWh !== undefined) {
        essEnergy.push(row.energyRatingKWh);
        essPower.push(row.dischargeRatingKW);
        essName.push(row.systemName);
      }
      i += 1;
    }
    return { essEnergy, essPower, essName };
  }

  getTotalEnergyStorageCapacity() {
    // todo write test for this
    const essSizes = this.getEssSizes();
    const essEnergies = essSizes.essEnergy;
    const totalEnergyStorage = essEnergies.reduce((a, b) => a + b, 0);
    return totalEnergyStorage;
  }
}
