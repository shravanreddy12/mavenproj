  Artifact Simple Name.App = function() {
  Artifact Simple Name.App.parent.call(this);
  this.apiUrl = '../api/';
  this.appPrefix = 'Artifact Simple Name.';
  this.desktop = null;
};
scout.inherits(Artifact Simple Name.App, scout.App);

Artifact Simple Name.App.prototype._createSession = function(options) {
  var session = Artifact Simple Name.App.parent.prototype._createSession.call(this, options);
  session.on('localeSwitch', this._onLocaleSwitch.bind(this));
  return session;
};

Artifact Simple Name.App.prototype._createDesktop = function(parent) {
  this.desktop = scout.create('Artifact Simple Name.Desktop', scout.models.getModel('Artifact Simple Name.Desktop', parent));
  return this.desktop;
};

Artifact Simple Name.App.prototype._loadLocale = function() {
  var localeTag = scout.webstorage.getItem(sessionStorage, "locale");
  if (scout.strings.hasText(localeTag)) {
    var locale = scout.locales.get(localeTag);
    if (locale) {
      return locale;
    }
  }

  // Use the default locale
  $.log.warn('Unsupported languageTag in settings found: ' + localeTag + '. Using navigator locale.');
  return scout.locales.getNavigatorLocale();
};

Artifact Simple Name.App.prototype._onLocaleSwitch = function(event) {
  scout.webstorage.setItem(sessionStorage, "locale", event.locale.languageTag);
  var session = event.source;
  var busyIndicator = scout.create('BusyIndicator', {
    parent: session.desktop,
    cancellable: false,
    showTimeout: 0,
    details: session.text('LanguageSwitchLoading')
  });
  busyIndicator.render();
  setTimeout(function() {
    window.location.reload();
  }, 100);
};
