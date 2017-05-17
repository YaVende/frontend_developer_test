<template lang='pug'>
  div
    h1.title
      span Avisos {{ peterete }}
      button(v-on:click='getNextPage()') Próxima página

    hr

    .car-listing-card(
      v-if='carListings'
      v-for='cl in carListings'
      v-on:click='$router.push({name: "carListings.show", params:{id: cl.id}})'
    )
      .car-listing-card__header Aviso \#{{ cl.id }}
      .car-listing-card__body
        .car-listing-card__body__image-wrapper
          img(:src="cl.car.images[0].file.url")

        .car-listing-card__body__desc
           strong {{ cl.car.car_brand.name }} {{ cl.car.car_model.name }} {{ cl.car.year }}
</template>

<script>
  import CarListing from 'models/car_listing';

  export default {
    data: _ => ({
      page: 1,
      carListings: []
    }),

    mounted() { this.getCarListings(); },

    methods: {
      getNextPage() {
        this.page++;
        this.getCarListings(this.page);
      },

      getCarListings(page) {
        this.carListings = [];
        const params = page && {page: page};
        CarListing
          .query({params})
          .then(resp => this.carListings = resp.data);
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .title
    display flex
    flex-direction row
    justify-content space-between

  .car-listing-card
    display flex
    flex-direction column

    &__body
      display flex
      flex-direction row

      &__image-wrapper
        img
          display block
          width 300px

      &__desc
        flex-grow 1
        background red
</style>
