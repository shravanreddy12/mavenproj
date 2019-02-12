Artifact Simple Name.PersonRestriction = function() {
  this.resourceType = 'PersonRestriction';
  this.firstName = null;
  this.lastName = null;
};

Artifact Simple Name.PersonRestriction.prototype.init = function(model) {
  $.extend(this, model);
};

Artifact Simple Name.PersonRestriction.prototype.setFirstName = function(firstName) {
  this.firstName = firstName;
};

Artifact Simple Name.PersonRestriction.prototype.setLastName = function(lastName) {
  this.lastName = lastName;
};
