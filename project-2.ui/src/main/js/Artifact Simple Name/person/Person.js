Artifact Simple Name.Person = function() {
  this.resourceType = 'Person';
  this.personId = null;
  this.firstName = null;
  this.lastName = null;
  this.salary = null;
  this.external = null;
};

Artifact Simple Name.Person.EVENT_TYPE = 'person';

Artifact Simple Name.Person.prototype.init = function(model) {
  $.extend(this, model);
};

Artifact Simple Name.Person.prototype.setFirstName = function(firstName) {
  this.firstName = firstName;
};

Artifact Simple Name.Person.prototype.setLastName = function(lastName) {
  this.lastName = lastName;
};

Artifact Simple Name.Person.prototype.setPersonId = function(id) {
  this.personId = id;
};


Artifact Simple Name.Person.prototype.setSalary = function(salary) {
  this.salary = salary;
};

Artifact Simple Name.Person.prototype.setExternal = function(external) {
  this.external = external;
};
