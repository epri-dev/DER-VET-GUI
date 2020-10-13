import { includes, isEmpty } from 'lodash';

import * as f from './Fields';

class Project {
  constructor(arg) {
    this.validationErrorList = [];

    this.id = new f.ProjectField(arg.id, true);
    this.name = new f.ProjectField(arg.name, true);
    this.startYear = new f.StartYear(arg.startYear);

    this.performValidationChecks();
  }

  isValid() {
    this.performValidationChecks();
    return isEmpty(this.validationErrorList);
  }

  performValidationChecks() {
    if (this.id === null) {
      this.addDistinctValidationError('Missing project ID');
    }
  }

  addDistinctValidationError(error) {
    if (!includes(this.validationErrorList, error)) {
      this.validationErrorList.push(error);
    }
  }

  static getDefaults() {
    return new Project({
      id: null,
    });
  }
}

export default Project;
