'use strict'
const req = require('request')
const moment = require('moment')
const queryString = require('query-string')

class Todoist {
  constructor(apiToken) {
    this.apiToken = apiToken
    this.entityType = null
    this.t = null
    this.query = {}
  }

  entity(et) {
    !et ? null :(this.entityType = et)
    return this
  }


  options(options) {
    // get methods of "this" to invoke later
    let methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    ).filter(
      method =>
        method !== 'constructor' &&
        method !== 'get' &&
        method !== 'options' &&
        method.indexOf('_') === -1
    )
    // get keys of options object passed
    return Object.keys(options).reduce((acc, val) => {
      // ignore methods that do not exist
      if (methods.indexOf(val) > -1) {
        //  invoke setter methods with values of option
        return this[val](options[val])
      }
    }, this)
  }

  get() {
    return new Promise((resolve, reject) => {
      if (!this.entityType)
        reject('Request not sent. ERROR: entityType is missing.')
      this.url = `https://beta.todoist.com/API/v8/${this.entityType}`

      req({
        url: this.url, json: true, 'auth': {
          'bearer': this.apiToken
        }
      }, (err, res, body) => {
        if (err) {
          reject(`${this.entityType} cannot be retrieved. ERROR: ${err}`)
          return
        }
        res.statusCode !== 200
          ? reject(
            `${this.entityType} cannot be retrieved. Response: ${res.statusCode} ${res.statusMessage}`
          )
          : null
        resolve(body)
      })
    })
  }
}

module.exports = Todoist
