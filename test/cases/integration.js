'use strict';

module.exports = {
  beforeEach: (browser, done) =>
    browser.url(`${browser.launchUrl}/avisos`, done),

  '/avisos should display first 8 cars from carListings index': browser => {
    const carListings =
      browser.globals.apiMock
        .readJson('car_listings_index_page_1.json');

    browser
      .pause(3000)
      .assert.containsCarListings('body', carListings)
      .end();
  },

  '/avisos should allow filtering by brand': browser => {
    const carListings =
      browser.globals.apiMock
        .readJson('car_listings_index_car_brand_id_45.json');

    browser
      .selectOption('#car-brand-select', 45)
      .assert.containsCarListings('body', carListings)
      .end();
  },

  '/avisos should allow filtering by brand and model': browser => {
    const carListings =
      browser.globals.apiMock
        .readJson('car_listings_index_car_brand_id_45_car_model_id_674.json');

    browser
      .selectOption('#car-brand-select', 45)
      .selectOption('#car-model-select', 674)
      .assert.containsCarListings('body', carListings)
      .end();
  }
};
