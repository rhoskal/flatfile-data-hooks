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

const maxLength = (field_name, len) => {
  return (record) => {
    const field = record.get(field_name);

    if (isNotNil(field)) {
      if (field.length > len) {
        return record.addError(
          field_name,
          `Can not be more than ${len} characters.`,
        );
      }
    }
  };
};

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    maxLength("first_name", 20)(record);
    maxLength("last_name", 50)(record);
    maxLength("title", 10)(record);
    maxLength("company_name", 60)(record);
    maxLength("house_name_or_number", 60)(record);
    maxLength("street_name", 55)(record);
    maxLength("locality", 30)(record);

    return record;
  });
};
