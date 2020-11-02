import { includes, isEmpty } from 'lodash';

class Project {
  constructor(arg) {
    this.validationErrorList = [];
    this.id = arg.id;
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
