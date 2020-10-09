export class ProjectField {
  constructor(value, name, isRequired) {
    this.value = value;
    this.isRequired = isRequired;
  }

  getValidationErrors() {
    return [];
  }

  getIsRequiredError(validationErrors) {
    if (this.value === null && this.required) {
      validationErrors.push(`${this.name} is required`);
    }
    return validationErrors;
  }
}

export class StartYear extends ProjectField {
  constructor(value) {
    super(value, 'Start year', true);
  }

  getValidationErrors() {
    // TODO move to ProjectField class (use super?)
    const validationErrors = this.getIsRequiredError([]);

    // TODO these are placeholders: should come from shared dervet input schema
    if (this.value < 1980) {
      validationErrors.push('Start year must be greater than or equal to 1980');
    }
    if (this.value > 2100) {
      validationErrors.push('Start year must be less than 2100');
    }
    return validationErrors;
  }
}
