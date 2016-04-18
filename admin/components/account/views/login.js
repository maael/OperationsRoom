import View from '../../../../lib/View'

export default class LoginView extends View {
  constructor () {
    super()
    this.template = `${__dirname}/../templates/login.jade`
  }

  render () {
    return super.render({ title: 'Login Page' })
  }
}
