const _ = require('lodash');

const DEFAULT_PROPS_TO_TEST = [{
  name: 'id',
  getter: cl => cl.id,
}, {
  name: 'car.car_brand.name',
  getter: cl => cl.car.car_brand.name
}, {
  name: 'car.car_model.name',
  getter: cl => cl.car.car_model.name
}, {
  name: 'car.year',
  getter: cl => cl.car.year
}];

exports.assertion = function(selector, carListings, msg) {
  this.message = msg || `Testing if element <${selector}> contains the data of ${carListings.length} car listing(s)`;
  this.expected = true;

  this.pass = value => value === this.expected;
  this.value = assertionDetail => assertionDetail.value;

  this.failure = function(assertionDetail) {
    const failed = !assertionDetail.value;
    if (failed) this.message = buildFailureMessage(assertionDetail);
    return failed;
  };

  this.command = function(callback) {
    this.api.getText(selector, result => {
      const assertionDetail =
        buildAssertionObject(result.value, carListings);

      callback(assertionDetail);
    });
  };
};

function buildAssertionObject(actualText, carListings, propsToTest = DEFAULT_PROPS_TO_TEST) {
  const detail =
    carListings.map(cl => {
      const testedProps =
        propsToTest.map(prop => {
          const propValue = prop.getter(cl);

          return {
            name:   prop.name,
            value:  propValue,
            result: containsText(actualText, propValue)
          };
        });

      return {testedProps, carListingId: cl.id};
    });

  const value = detail.every(cl => cl.testedProps.every(({result}) => result));

  return {detail, value};
}

function buildFailureMessage(assertionDetail) {
  let message =
    assertionDetail.detail.map(({carListingId, testedProps}) => {
      let subMessages =
        _.map(testedProps, ({name, value, result}) =>
          !result && `  ... expected prop "${name}" with value "${value}" to be present`
        )
        .join("\n");

      return `For car listing #${carListingId} \n${subMessages}\n`;
    })
      .join("\n");

  return message;
}

function containsText(actual, expected) {
  return new RegExp(expected).test(actual);
}
