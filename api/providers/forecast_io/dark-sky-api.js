'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var req = require('request');
var moment = require('moment');
var queryString = require('query-string');

var truthyOrZero = function truthyOrZero(value) {
  return !!value || parseFloat(value) === 0;
};

var DarkSky = function () {
  function DarkSky(apiKey) {
    _classCallCheck(this, DarkSky);

    this.apiKey = apiKey;
    this.long = null;
    this.lat = null;
    this.t = null;
    this.query = {};
  }

  _createClass(DarkSky, [{
    key: 'longitude',
    value: function longitude(long) {
      !truthyOrZero(long) ? null : this.long = long;
      return this;
    }
  }, {
    key: 'latitude',
    value: function latitude(lat) {
      !truthyOrZero(lat) ? null : this.lat = lat;
      return this;
    }
  }, {
    key: 'coordinates',
    value: function coordinates(_ref) {
      var lat = _ref.lat,
          lng = _ref.lng;

      this.lat = parseFloat(lat);
      this.long = parseFloat(lng);
      return this;
    }
  }, {
    key: 'time',
    value: function time(_time) {
      !truthyOrZero(_time) ? null : this.t = moment(new Date(_time)).format('YYYY-MM-DDTHH:mm:ss');
      return this;
    }
  }, {
    key: 'units',
    value: function units(unit) {
      !unit ? null : this.query.units = unit;
      return this;
    }
  }, {
    key: 'language',
    value: function language(lang) {
      !lang ? null : this.query.lang = lang;
      return this;
    }
  }, {
    key: 'exclude',
    value: function exclude(blocks) {
      blocks = Array.isArray(blocks) ? blocks.join(',') : blocks;
      !blocks ? null : this.query.exclude = blocks;
      return this;
    }
  }, {
    key: 'extendHourly',
    value: function extendHourly(param) {
      !param ? null : this.query.extend = 'hourly';
      return this;
    }
  }, {
    key: 'options',
    value: function options(_options) {
      var _this = this;

      // get methods of "this" to invoke later
      var methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(function (method) {
        return method !== 'constructor' && method !== 'get' && method !== 'options' && method.indexOf('_') === -1;
      });
      // get keys of options object passed
      return Object.keys(_options).reduce(function (acc, val) {
        // ignore methods that do not exist
        if (methods.indexOf(val) > -1) {
          //  invoke setter methods with values of option
          return _this[val](_options[val]);
        }
      }, this);
    }
  }, {
    key: '_generateReqUrl',
    value: function _generateReqUrl() {
      this.url = 'https://api.darksky.net/forecast/' + this.apiKey + '/' + this.lat + ',' + this.long;
      this.t ? this.url += ',' + this.t : this.url;
      this.query ? this.url += '?' + queryString.stringify(this.query) : this.url;
    }
  }, {
    key: 'get',
    value: function get() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (!truthyOrZero(_this2.lat) || !truthyOrZero(_this2.long)) reject('Request not sent. ERROR: Longitute or Latitude is missing.');
        _this2._generateReqUrl();

        req({ url: _this2.url, json: true }, function (err, res, body) {
          if (err) {
            reject('Forecast cannot be retrieved. ERROR: ' + err);
            return;
          }
          res.statusCode !== 200 ? reject('Forecast cannot be retrieved. Response: ' + res.statusCode + ' ' + res.statusMessage) : null;
          resolve(body);
        });
      });
    }
  }]);

  return DarkSky;
}();

module.exports = DarkSky;