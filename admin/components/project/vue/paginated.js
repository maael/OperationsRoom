export default {
  created: function () {
    let page = 1
    if (window.location.hash) {
      let matches = window.location.hash.match(/page=(\d+)/)
      if (matches.length > 1) page = matches[1]
    }
    this.$data.pagination = { page: page }
  }
}
