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

const titleCase = (val) => {
  // take first part and ignore everything else. not ideal, but works for PoC
  const str = val.trim().toLowerCase().split(" ")[0];

  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const firstName = record.get("firstName");
    const lastName = record.get("lastName");

    if (isNotNil(firstName)) {
      record
        .set("firstName", titleCase(firstName))
        .addComment("firstName", "Formatted");
    }

    if (isNotNil(lastName)) {
      record
        .set("lastName", titleCase(lastName))
        .addComment("lastName", "Formatted");
    }
  });
};
