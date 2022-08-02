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

const fold =
  (...fns) =>
  (x) => {
    return fns.map((f) => f(x));
  };

const maxLength = (field_name, len) => {
  return (record) => {
    const field = record.get(field_name);

    if (isNotNil(field)) {
      if (field.length > len) {
        return record.addError(
          field_name,
          `Can not be more than ${len} characters (DH).`,
        );
      }
    }
  };
};

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    return fold(
      maxLength("first_name", 20),
      maxLength("last_name", 50),
      maxLength("title", 10),
      maxLength("company_name", 60),
      maxLength("house_name_or_number", 60),
      maxLength("street_name", 55),
      maxLength("locality", 30),
    )(record);
  });
};
