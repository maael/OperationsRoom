import View from '../../../../lib/View'

export default class AccountView extends View {
  constructor () {
    super()
    this.template = `${__dirname}/../templates/account.jade`
  }

  render (data) {
    return super.render(data)
  }
}
