<template lang='jade'>
  div(v-if='!$loadingAsyncData') loaded message: {{repos.length}}
    ul.list-group
      li.list-group-item.clearfix(v-if='repo', v-for='repo in repos')
        span.label.label-primary {{repo.owner.login === username ? 'Owner' : repo.owner.login}}
        |  {{repo.full_name}}
        span.pull-right
          button.btn.btn-xs.btn-success(v-on:click='addRepo', data-repo='{{repo.id}}') Add repo
    pagination(:page.sync='pagination.page', :last-page.sync='pagination.lastPage')
  div(v-if='$loadingAsyncData') loading...
</template>

<script>
import paginated from './paginated'
import GitHub from '../../../../lib/github'
const pagination = require('./pagination.vue')

function getLastPage (response) {
  /* TODO: fix this */
  let paginationHeaders = response.headers.get('Link').split(',')
  let lastPageLink = paginationHeaders[1]
  let lastPageMatch = lastPageLink.match(/&page=(\d+)/)
  return (lastPageMatch.length > 1) ? lastPageMatch[1] : 1
}

function loadRepos () {
  var data = this.$data
    , gh = new GitHub(this.token)
  return gh.user().repos().page(data.pagination.page).exec()
    .then((response) => {
      if (!data.pagination.lastPage) data.pagination.lastPage = getLastPage(response)
      data.repos = response.json
      return data
    })
    .catch((err) => {
      console.log('damn', err)
    })
}

export default {
  mixins: [paginated]
, data: function () {
    return {
      repos: []
    , pagination: {}
    }
  }
, props: ['token', 'username']
, asyncData: function () {
    return loadRepos.call(this)
  }
, events: {
    'load-page': function () {
      this.reloadAsyncData()
    }
  }
, methods: {
    reloadPage: function () {
      this.reloadAsyncData()
    }
  , addRepo: function (e) {
      let newRepo = {}
      newRepo.github = this.repos.filter((repo) => {
        return repo.id == e.target.dataset.repo
      })
      newRepo.github = newRepo.github.length > 0 ? newRepo.github[0] : {}
      newRepo.name = newRepo.github.name
      fetch('/api/project/create'
      , { method: 'POST'
        , headers:
          { 'Accept': 'application/json'
          , 'Content-Type': 'application/json'
          }
        , body: JSON.stringify(newRepo)
        })
      .then((response) => {
        console.log('response', response)
      })
    }
  }
, components: {
    pagination: pagination
  }
}
</script>