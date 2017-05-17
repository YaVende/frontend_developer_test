<template lang='pug'>
  div(v-if='carListing')
    h1
      | Aviso \#{{carListing.id}} |
      | {{ carListing.car.car_brand.name }} {{ carListing.car.car_model.name }} {{ carListing.car.year }}
    hr

    img(:src='carListing.car.images[0].file.url')
</template>

<script>
  import CarListing from 'models/car_listing';

  export default {
    data: _ => ({carListing: undefined}),

    beforeRouteEnter(to, from, next) {
      CarListing
        .get(to.params.id)
        .then(resp => next(vm => vm.carListing = resp.data));
    }
  }
</script>

<style lang='stylus' scoped>
  img
    width 100%
</style>
