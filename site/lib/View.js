const pug = require('pug')

export default class View {
  render (data = {}) {
    const template = pug.compileFile(this.template)
    return template(data)
  }
}
