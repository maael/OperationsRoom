import View from '../../../lib/View'

export default class IndexView extends View {
  constructor () {
    super()
    this.template = `${__dirname}/../templates/index.jade`
  }

  render () {
    return super.render({ title: 'Index Page' })
  }
}
