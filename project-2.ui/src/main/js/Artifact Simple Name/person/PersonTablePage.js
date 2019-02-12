Artifact Simple Name.PersonTablePage = function() {
  Artifact Simple Name.PersonTablePage.parent.call(this);

  this._dataChangeListener = null;
};
scout.inherits(Artifact Simple Name.PersonTablePage, scout.PageWithTable);

Artifact Simple Name.PersonTablePage.prototype._jsonModel = function() {
  return scout.models.getModel('Artifact Simple Name.PersonTablePage');
};

Artifact Simple Name.PersonTablePage.prototype._init = function(model) {
  var m = $.extend({}, this._jsonModel(), model);
  Artifact Simple Name.PersonTablePage.parent.prototype._init.call(this, m);
  this._initListeners();
};

/**
 * Override this method if you want to customize the menu entries.
 */
Artifact Simple Name.PersonTablePage.prototype._initListeners = function() {
  this._dataChangeListener = this._onDataChange.bind(this);
  this.session.desktop.on('dataChange', this._dataChangeListener);

  var editPersonMenu = this.detailTable.widget('EditPersonMenu');
  editPersonMenu.on('action', this._onEditPersonMenuAction.bind(this));

  var deletePersonMenu = this.detailTable.widget('DeletePersonMenu');
  deletePersonMenu.on('action', this._onDeletePersonMenuAction.bind(this));

  var createPersonMenu = this.detailTable.widget('CreatePersonMenu');
  createPersonMenu.on('action', this._onCreatePersonMenuAction.bind(this));
};

Artifact Simple Name.PersonTablePage.prototype._destroy = function() {
  this.session.desktop.off('dataChange', this._dataChangeListener);
  Artifact Simple Name.PersonTablePage.parent.prototype._destroy.call(this);
};

Artifact Simple Name.PersonTablePage.prototype._onDataChange = function(event) {
  if (event.dataType === Artifact Simple Name.Person.EVENT_TYPE) {
    this.reloadPage();
  }
};

Artifact Simple Name.PersonTablePage.prototype._loadTableData = function(searchFilter) {
  var restriction = scout.create('Artifact Simple Name.PersonRestriction', searchFilter, {
    ensureUniqueId: false
  });
  return Artifact Simple Name.persons.list(restriction);
};

Artifact Simple Name.PersonTablePage.prototype._transformTableDataToTableRows = function(tableData) {
  return tableData
    .map(function(person) {
      return {
        person: person,
        cells: [
          person.personId,
          person.firstName,
          person.lastName,
          person.salary,
          person.external
        ]
      };
    });
};

Artifact Simple Name.PersonTablePage.prototype._getSelectedPerson = function() {
  var selection = this.detailTable.selectedRow();
  if (selection) {
    return selection.person;
  }
  return null;
};

Artifact Simple Name.PersonTablePage.prototype._createPersonForm = function() {
  var outline = this.getOutline();
  var personForm = scout.create('Artifact Simple Name.PersonForm', {
    parent: outline
  });
  return personForm;
};

Artifact Simple Name.PersonTablePage.prototype._onEditPersonMenuAction = function(event) {
  var personForm = this._createPersonForm();
  personForm.setData(this._getSelectedPerson());
  personForm.open();
};

Artifact Simple Name.PersonTablePage.prototype._onDeletePersonMenuAction = function(event) {
  scout.MessageBoxes.openYesNo(this.session.desktop, this.session.text('DeleteConfirmationTextNoItemList'))
    .then(function(button) {
      if (button === scout.MessageBox.Buttons.YES) {
        Artifact Simple Name.persons.remove(this._getSelectedPerson().personId)
          .then(this._onPersonDeleted.bind(this));
      }
    }.bind(this));
};

Artifact Simple Name.PersonTablePage.prototype._onPersonDeleted = function() {
  this.session.desktop.dataChange({
    dataType: Artifact Simple Name.Person.EVENT_TYPE
  });
};

Artifact Simple Name.PersonTablePage.prototype._onCreatePersonMenuAction = function(event) {
  var personForm = this._createPersonForm();
  var emptyPerson = scout.create('Artifact Simple Name.Person', {}, {
    ensureUniqueId: false
  });
  personForm.setData(emptyPerson);
  personForm.open();
};
