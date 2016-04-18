<template lang='jade'>
  .row
    .col-sm-4.text-right.vcenter
      button.btn.btn-primary(v-if='page !== 1', v-on:click='loadPreviousPage')
        span.fa.fa-chevron-left
    .col-sm-4.text-center.vcenter
      p Page {{page}} of {{lastPage}}
    .col-sm-4.text-left.vcenter
      button.btn.btn-primary(v-if='page != lastPage', v-on:click='loadNextPage')
        span.fa.fa-chevron-right
</template>

<style>
  .vcenter {
    display: inline-block;
    float: none;
  }
</style>

<script>
export default {
  props: [ 'page', 'lastPage' ]
, methods: {
    loadNextPage: function () {
      this.page++
      window.location.hash = `page=${this.page}`
      this.$dispatch('load-page')
    }
  , loadPreviousPage: function () {
      this.page--
      window.location.hash = `page=${this.page}`
      this.$dispatch('load-page')
    }
  }
}
</script>