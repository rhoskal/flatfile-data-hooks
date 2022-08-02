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
    const { contact_name } = record.value;

    if (isNotNil(contact_name)) {
      if (contact_name.includes(" ")) {
        const parts = contact_name.split(" ");

        return record
          .set("contact_first_name", parts[0])
          .set(
            "contact_last_name",
            parts.slice(1, parts.length).join(" ").trim(),
          )
          .addComment("contact_name", "Full name was split");
      } else {
        return record
          .set("contact_first_name", contact_name)
          .addWarning("contact_last_name", "Missing last name.");
      }
    }
  });
};
