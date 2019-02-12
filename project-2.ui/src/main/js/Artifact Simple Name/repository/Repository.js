/**
 * Subclasses of Repository must set the resourceType property.
 *
 * @abstract
 * @class
 */
Artifact Simple Name.Repository = function() {
  this.entityType = null;
};

Artifact Simple Name.Repository.prototype.getJson = function(url, opts) {
  return Artifact Simple Name.Repository.map(scout.ajax.getJson(url, this._ensureConverter(opts)));
};

Artifact Simple Name.Repository.prototype.postJson = function(url, data, opts) {
  return Artifact Simple Name.Repository.map(scout.ajax.postJson(url, data, this._ensureConverter(opts)));
};

Artifact Simple Name.Repository.prototype.removeJson = function(url, opts) {
  return Artifact Simple Name.Repository.map(scout.ajax.removeJson(url, this._ensureConverter(opts)));
};

Artifact Simple Name.Repository.prototype.putJson = function(url, data, opts) {
  return Artifact Simple Name.Repository.map(scout.ajax.putJson(url, data, this._ensureConverter(opts)));
};

Artifact Simple Name.Repository.prototype._ensureConverter = function(opts) {
  return $.extend({}, {
    converters: {
      "text json": this._mapJson
    }
  }, opts);
};

Artifact Simple Name.Repository.prototype._mapJson = function(data) {
  return JSON.parse(data, function(key, value) {
    if (key === '_type') {
      this.objectType = scout.app.appPrefix + value;
    }
    return value;
  });
};

Artifact Simple Name.Repository.prototype._first = function(items) {
  return items[0];
};

// ---- Static Objects ---- //

Artifact Simple Name.repositories = {};

/**
 * @static
 * @param {string} objectName
 * @returns {Artifact Simple Name.Repository}
 */
Artifact Simple Name.Repository.register = function(objectName) {
  var repository = scout.create(objectName);
  Artifact Simple Name.repositories[repository.entityType] = repository;
  return repository;
};

Artifact Simple Name.Repository.map = function(promise) {
  return promise
    .then(function(response) {
      if (!response || !response.items) {
        return response;
      }

      return response.items
        .map(function(item) {
          return scout.create(item, {
            ensureUniqueId: false
          });
        });
    });
};

/**
 * @static
 * @param {string} resourceType
 * @returns {Artifact Simple Name.Repository} a repository for the given resourceType
 */
Artifact Simple Name.Repository.get = function(resourceType) {
  var repository = Artifact Simple Name.repositories[resourceType];
  if (!repository) {
    throw new Error('no repository found for resourceType ' + resourceType);
  }
  return repository;
};
