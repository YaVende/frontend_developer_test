'use strict';

module.exports = {
  '/avisos should display first 8 cars from carListings index': browser => {
    return

    browser
      .url(`${browser.launchUrl}/avisos`)
      .pause(3000)

    const carListings =
      browser.globals.apiMock
        .readJson('car_listings_index_page_1.json');

    assertContainsCarListings(browser, carListings);

    return browser.end();
  },


  '/avisos should allow filtering by brand': browser => {
    return

    browser.url(`${browser.launchUrl}/avisos`)
    selectCarBrand(browser, 45)

    const carListings =
      browser.globals.apiMock
        .readJson('car_listings_index_car_brand_id_45.json');

    browser.assert.containsCarListings('body', carListings);

    return browser.end();
  },

  '/avisos should allow filtering by brand and model': browser => {
    browser.url(`${browser.launchUrl}/avisos`)

    browser = selectCarBrand(browser, 45);
    browser = selectCarModel(browser, 674);
    browser = browser.pause();

    const carListings =
      browser.globals.apiMock
        .readJson('car_listings_index_car_brand_id_45_car_model_id_674.json');

    browser = assertContainsCarListings(browser, carListings);
    return browser.end();
  }
};

function selectCarBrand(browser, carBrandId) {
  return selectOption(browser, '#car-brand-select', carBrandId);
}

function selectCarModel(browser, carBrandId) {
  return selectOption(browser, '#car-model-select', carBrandId);
}

function selectOption(browser, selector, optionId) {
  return browser
    .waitForElementVisible(selector, 3000)
    .click(selector)
    .waitForElementVisible(`${selector} option[value="${optionId}"]`, 3000)
    .click(`${selector} option[value="${optionId}"]`);
}

function assertContainsCarListings(browser, carListings) {
  carListings.forEach(carListing =>
    browser
      .assert.containsText('body', carListing.id)
      .assert.containsText('body', carListing.car.car_brand.name)
      .assert.containsText('body', carListing.car.car_model.name)
      .assert.containsText('body', carListing.car.year)
  );

  return browser;
}
