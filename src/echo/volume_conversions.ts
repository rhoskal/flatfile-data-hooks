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

/**
 * Helper function to determine if a value is a string.
 * Useful in if/else statments or ternaries.
 *
 * @param {*} val - Any object/value
 */
const isString = (val) => typeof val === "string";

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const { Bid_Volume: bidVolume } = record.value;

    if (isNotNil(bidVolume)) {
      if (isNumber(bidVolume)) {
        record
          .set("Bid_Volume", Math.round(bidVolume) / 100)
          .set("Annualized_Volume", Math.round(bidVolume) * 2);
      }

      if (isString(bidVolume)) {
        const cleaned = bidVolume.replace(/\D/, "").trim();
        const parsed = parseFloat(cleaned);

        record
          .set("Bid_Volume", Math.round(parsed) / 100)
          .set("Annualized_Volume", Math.round(parsed) * 2);
      }
    }
  });
};
