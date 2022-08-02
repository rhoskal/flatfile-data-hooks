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

const isSpecialString = (matchStr, val) => {
  return matchStr.toLowerCase() === val.trim().toLowerCase();
};

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const { item_description } = record.value;

    if (
      isNotNil(item_description) &&
      isSpecialString("NULL", item_description)
    ) {
      record.addWarning(
        "item_description",
        "Item descriptions are very helpful.",
      );
    }
  });
};
