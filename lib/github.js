const qs = require('querystring')
export default class GitHub {
  constructor (token) {
    this.token = token
    this.url = 'https://api.github.com/'
    this.queryString =
      { 'per_page': 100
      , 'page': 1
      , 'sort': 'pushed'
      }
    return this
  }

  user () {
    this.url = `${this.url}user/`
    return this
  }

  repos () {
    this.url = `${this.url}repos`
    return this
  }

  sort (field) {
    this.queryString.sort = field
    return this
  }

  page (number) {
    this.queryString.page = number
    return this
  }

  limit (number) {
    this.queryString['per_page'] = number
    return this
  }

  exec () {
    let reply = {}
    return fetch(`${this.url}?${qs.encode(this.queryString)}`
      , { headers: { Authorization: `token ${this.token}` } })
      .then((response) => {
        reply.headers = response.headers
        return response
      })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        reply.json = json
        return reply
      })
  }
}
