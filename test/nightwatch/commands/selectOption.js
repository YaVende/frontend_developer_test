exports.command = function(selector, optionId) {
  this
    .waitForElementVisible(selector, 3000)
    .click(selector)
    .waitForElementVisible(`${selector} option[value="${optionId}"]`, 3000)
    .click(`${selector} option[value="${optionId}"]`);

  return this;
};
