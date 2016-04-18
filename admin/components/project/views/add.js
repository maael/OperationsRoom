import View from '../../../../lib/View'

export default class AccountView extends View {
  constructor (user) {
    super()
    this.user = user
    this.template = `${__dirname}/../templates/add.jade`
  }

  render (data) {
    return super.render(data)
  }
}
