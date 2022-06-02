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

/**
 * Helper function to determine if a value is a number.
 * Useful in if/else statments or ternaries.
 *
 * @param {*} val - Any object/value
 */
const isNumber = (val) => typeof val === "number";

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const { Bid_Volume: bidVolume } = record.value;

    if (isNotNil(bidVolume) && isNumber(bidVolume)) {
      record
        .set("Bid_Volume", Math.round(bidVolume))
        .set("Annualized_Volume", Math.round(bidVolume) * 2);
    }
  });
}
