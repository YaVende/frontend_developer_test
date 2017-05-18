<template lang='pug'>
  .car-listing-list
    .car-listing-list__header
      div
        legend Marca
        select(
          v-model='carBrandId'
          v-on:change='getCarListings(); getCarModels()'
        )
          option(
            v-for='cb in carBrands'
            v-html='cb.name'
            :value='cb.id'
          )

      div
        legend Modelo
        select(
          v-model='carModelId'
          v-on:change='getCarListings()'
        )
          option(
            v-for='cm in carModels'
            v-html='cm.name'
            :value='cm.id'
          )

      button(v-on:click='getNextPage()') Próxima página

    hr

    .car-listing-list__body
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
  import vSelect from 'vue-select';
  import CarListing from 'models/car_listing';
  import CarBrand from 'models/car_brand';
  import CarModel from 'models/car_model';

  export default {
    components: {vSelect},

    data: _ => ({
      page:        1,
      carListings: [],
      carBrands:   [],
      carModels:   [],
      carBrandId:  undefined,
      carModelId:  undefined,
    }),

    mounted() {
      this.getCarListings();
      this.getCarBrands();
    },

    methods: {
      getNextPage() {
        this.page++;
        this.getCarListings();
      },

      getCarListings() {
        const params = {
          page:         this.page,
          car_brand_id: this.carBrandId,
          car_model_id: this.carModelId
        };

        CarListing
          .query({params})
          .then(resp => this.carListings = resp.data);
      },

      getCarBrands() {
        CarBrand
          .query()
          .then(resp => this.carBrands = resp.data.car_brands)
      },

      getCarModels() {
        if (!this.carBrandId) return;
        this.carModelId = undefined;
        const params = {car_brand_id: this.carBrandId};

        CarModel
          .query({params})
          .then(resp => this.carModels = resp.data.car_models)
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .car-listing-list
    &__header
      display flex
      flex-direction row

  .car-listing-card
    display flex
    flex-direction column

    margin-bottom 16px

    cursor pointer
    box-shadow 2px 2px 3px black
    background-color whitesmoke

    &__header
      background-color lightgrey

    &__body
      display flex
      flex-direction row

      &__image-wrapper
        img
          display block
          width 300px

      &__desc
        flex-grow 1
</style>
