'use strict';

  //.waitForElementVisible('#car-model-select', 3000)
  //.click('#car-model-select')
  //.waitForElementVisible('#car-model-select option[value="674"]', 3000)
  //.click('#car-model-select option[value="674"]')

module.exports = {
  '/avisos should display first 8 cars from carListings index': browser => {
    browser
      .url(`${browser.launchUrl}/avisos`)
      .pause(3000)

    const carListings =
      browser.globals.apiMock
        .getJson('car_listings_index_page_1.json');

    checkContainsCarListings(browser, carListings);

    return browser;
  },


  '/avisos should allow filtering by brand': browser => {
    browser
      .url(`${browser.launchUrl}/avisos`)
      .waitForElementVisible('#car-brand-select', 3000)
      .click('#car-brand-select')
      .waitForElementVisible('#car-brand-select option[value="45"]', 3000)
      .click('#car-brand-select option[value="45"]')
      .pause(3000)

    const carListings =
      browser.globals.apiMock
        .getJson('car_listings_index_car_brand_id_45.json');

    checkContainsCarListings(browser, carListings);

    return browser;
  }
};

function checkContainsCarListings(browser, carListings) {
  carListings.forEach(carListing =>
    browser
      .assert.containsText('body', carListing.id)
      .assert.containsText('body', carListing.car.car_brand.name)
      .assert.containsText('body', carListing.car.car_model.name)
      .assert.containsText('body', carListing.car.year)
  );
}
