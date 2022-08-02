/**
 * Helper function to determine if a value is null or undefined.
 * Useful in if/else statments or ternaries.
 *
 * @param {*} val - Any object/value
 */
const isNil = (val) => val === null || val === undefined || val === "";

/**
 * Helper function to determine if a value is NOT null or undefined.
 * Useful in if/else statments or ternaries.
 *
 * @param {*} val - Any object/value
 */
const isNotNil = (val) => !isNil(val);

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const { quantity, unit_price, extended_price } = record.value;

    if (
      isNotNil(quantity) &&
      isNotNil(unit_price) &&
      isNotNil(extended_price)
    ) {
      const calculatedExtendedPrice =
        parseFloat(unit_price) * parseFloat(quantity);

      if (calculatedExtendedPrice !== parseFloat(extended_price)) {
        record.addError(
          "extended_price",
          "Extended price verification failed.",
        );
      }
    }
  });
};
