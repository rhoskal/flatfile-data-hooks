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

/**
 * Helper function to determine if a value is a string.
 * Useful in if/else statments or ternaries.
 *
 * @param {*} val - Any object/value
 */
const isString = (val) => typeof val === "string";

module.exports = ({ recordBatch, _session, logger }) => {
  return recordBatch.records.map((record) => {
    const { fullAddress } = record.value;

    if (isNotNil(fullAddress) && isString(fullAddress)) {
      const cleaned = fullAddress
        .trim()
        .replace(/[\t\.\-\|]/gm, "")
        .replace(/[\n\r]/gm, ",");

      try {
        const parsed = addressParser.parseLocation(cleaned);

        if (isNotNil(parsed)) {
          record
            .set(
              "streetAddress1",
              [parsed.number, parsed.prefix, parsed.street, parsed.type]
                .join(" ")
                .trim(),
            )
            .set(
              "streetAddress2",
              [parsed.sec_unit_type, parsed.sec_unit_num].join(" ").trim(),
            )
            .set("city", parsed.city)
            .set("state", parsed.state)
            .set("zipCode", parsed.zip);
        }
      } catch (err) {
        logger.error("Uh oh...", err);
      }
    }
  });
};
