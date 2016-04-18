const Vue = require('vue')
const asyncData = require('vue-async-data')
const projectList = require('./project-list.vue')

Vue.use(asyncData)

var app = new Vue({
  el: '#el'
, components: {
    'project-list': projectList
  }
})
