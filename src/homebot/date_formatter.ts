const dfns = require("date-fns");

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
    const expiresAt = record.get("expiresAt");

    if (isNotNil(expiresAt)) {
      if (Date.parse(expiresAt)) {
        const thisDate = dfns.format(new Date(expiresAt), "M/d/yyy");
        const realDate = dfns.parseISO(thisDate);

        if (dfns.isDate(realDate)) {
          record
            .set("expiresAt", thisDate)
            .addComment("expiresAt", "Automatically formatted");
        }
      } else {
        record.addError("expiresAt", "Invalid date");
        logger.error("Invalid date");
      }
    }
  });
};
