const addressParser = require("parse-address");

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

module.exports = ({ recordBatch, _session, logger }) => {
  return recordBatch.records.map((record) => {
    const { primary_address } = record.value;

    if (isNotNil(primary_address)) {
      const cleaned = primary_address
        .trim()
        .replace(/[\t\.\-\|]/gm, "")
        .replace(/[\n\r]/gm, ",");

      try {
        const parsed = addressParser.parseLocation(cleaned);

        if (isNotNil(parsed)) {
          return record
            .set(
              "primary_address_street",
              [
                parsed.number,
                parsed.prefix,
                parsed.street,
                parsed.type,
                parsed.sec_unit_type,
                parsed.sec_unit_num,
              ]
                .join(" ")
                .trim(),
            )
            .set("primary_address_city", parsed.city)
            .set("primary_address_state", parsed.state)
            .set("primary_address_postal_code", parsed.zip);
        }
      } catch (err) {
        logger.error("Address parser library failed...", err);
      }
    }
  });
};
