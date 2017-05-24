'use strict';

module.exports = {
  '/avisos/:id should display basic info about the car listing': browser => {
    const carListing = browser.globals.apiMock.readJson('car_listings_show_5792');

    browser
      .url(`${browser.launchUrl}/avisos/5792`)
      .pause(3000)
      .assert.containsCarListings('body', [carListing])
      .end();
  }
};
