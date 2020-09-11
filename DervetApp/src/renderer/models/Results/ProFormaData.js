import BaseTableData from './BaseTableData';

class ProFormaData extends BaseTableData {
  constructor(data) {
    super('pro_forma.csv', data, true);
  }
}

export default ProFormaData;
