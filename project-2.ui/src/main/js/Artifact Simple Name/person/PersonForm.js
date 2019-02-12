Artifact Simple Name.PersonForm = function() {
  Artifact Simple Name.PersonForm.parent.call(this);

  this.firstNameField = null;
  this.lastNameField = null;
  this.salaryField = null;
  this.externalField = null;
};
scout.inherits(Artifact Simple Name.PersonForm, scout.Form);

Artifact Simple Name.PersonForm.prototype._jsonModel = function() {
  return scout.models.getModel('Artifact Simple Name.PersonForm');
};

Artifact Simple Name.PersonForm.prototype._init = function(model) {
  Artifact Simple Name.PersonForm.parent.prototype._init.call(this, model);
  this._initFields();
};

/**
 * Override this method if you have different fields.
 * Then you need to customize importData and exportData too.
 */
Artifact Simple Name.PersonForm.prototype._initFields = function() {
  this.firstNameField = this.widget('FirstNameField');
  this.lastNameField = this.widget('LastNameField');
  this.salaryField = this.widget('SalaryField');
  this.externalField = this.widget('ExternalField');
};

Artifact Simple Name.PersonForm.prototype.exportData = function() {
  var person = this.data;
  person.setFirstName(this.firstNameField.value);
  person.setLastName(this.lastNameField.value);
  person.setSalary(this.salaryField.value);
  person.setExternal(this.externalField.value);
  return person;
};

Artifact Simple Name.PersonForm.prototype.importData = function() {
  var person = this.data;
  this.firstNameField.setValue(person.firstName);
  this.lastNameField.setValue(person.lastName);
  this.salaryField.setValue(person.salary);
  this.externalField.setValue(person.external);
};

Artifact Simple Name.PersonForm.prototype._save = function(data) {
  return (data.personId ? Artifact Simple Name.persons.store(data) : Artifact Simple Name.persons.create(data))
    .then(this._onSaveDone.bind(this));
};

Artifact Simple Name.PersonForm.prototype._onSaveDone = function(person) {
  this.session.desktop.dataChange({
    dataType: Artifact Simple Name.Person.EVENT_TYPE,
    data: person
  });

  return $.resolvedPromise();
};

Artifact Simple Name.PersonForm.prototype._load = function() {
  if (this.data.personId) {
    // refresh data from server
    return Artifact Simple Name.persons.load(this.data.personId);
  }
  return $.resolvedPromise(this.data);
};
