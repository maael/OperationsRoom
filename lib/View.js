const pug = require('pug')
const config = require('../config.json')

export default class View {
  constructor () {
    this.config = config
  }

  render (data = {}) {
    data.config = this.config
    const template = pug.compileFile(this.template)
    return Promise.resolve(template(data))
  }

  send (res) {
    return (html) => { res.send(html) }
  }
}
