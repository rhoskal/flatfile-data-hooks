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
 * Removes part of string.
 *
 * @param {string} val - string you want to clean
 *
 * @example
 * cleaner("123.23 CT") ==> returns "123.23"
 */
const cleaner = (val) => {
  return val.trim().replace(/\sCT$/, "");
};

module.exports = async ({ recordBatch, session, logger }) => {
  return recordBatch.records.map((record) => {
    const { someFieldName } = record.value;

    if (isNotNil(someFieldName)) {
      record
        .set("fieldName", cleaner(someFieldName))
        .addComment("value cleaned using regex");
    }
  });
};
