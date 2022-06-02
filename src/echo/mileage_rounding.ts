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
    const { Client_Miles: mileage } = record.value;

    if (isNotNil(mileage)) {
      if (isString(mileage)) {
        const cleaned = mileage.replace(/\D/, "").trim();
        const parsed = parseFloat(cleaned);

        record.set("Client_Miles", Math.round(parsed));
      } else if (isNumber(mileage)) {
        record.set("Client_Miles", Math.round(mileage));
      } else {
        record.set("Client_Miles", mileage).addError("Encountered bad value");
      }
    }
  });
};
