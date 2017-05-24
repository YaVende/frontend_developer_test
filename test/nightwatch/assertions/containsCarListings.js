exports.assertion = function(selector, carListings, msg) {
  this.message = msg || `Testing if element <${selector}> contains the data of ${carListings.length + 1} car listings`;
  this.expected = true;

  this.pass = value => value === this.expected;
  this.value = value => value;

  this.command = function(callback) {
    this.api.getText(selector, result => {
      const bool =
        carListings.every(cl =>
          containsText(result.value, cl.id) &&
          containsText(result.value, cl.car.car_brand.name) &&
          containsText(result.value, cl.car.car_model.name) &&
          containsText(result.value, cl.year)
        )

      callback(bool);
    });
  };
};

function containsText(actual, expected) {
  return new RegExp(expected).test(actual);
}
