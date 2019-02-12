Artifact Simple Name.PersonSearchForm = function() {
  Artifact Simple Name.PersonSearchForm.parent.call(this);
};
scout.inherits(Artifact Simple Name.PersonSearchForm, scout.Form);

Artifact Simple Name.PersonSearchForm.prototype._init = function(model) {
  Artifact Simple Name.PersonSearchForm.parent.prototype._init.call(this, model);
  this._initListeners();
};

Artifact Simple Name.PersonSearchForm.prototype._jsonModel = function() {
  return scout.models.getModel('Artifact Simple Name.PersonSearchForm');
};

Artifact Simple Name.PersonSearchForm.prototype._initListeners = function() {
  var parentTable = this.parent.table;
  this.widget('SearchButton').on('action', parentTable.reload.bind(parentTable));
};

Artifact Simple Name.PersonSearchForm.prototype.exportData = function() {
  return {
    firstName: this.widget('FirstNameField').value,
    lastName: this.widget('LastNameField').value
  };
};
