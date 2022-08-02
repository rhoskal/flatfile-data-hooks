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

const FIELDS = {
  first_order_date: "first_order_date",
  last_login_datetime: "last_login_datetime",
  created_datetime: "created_datetime",
};

const FORMAT = "M/d/yyyy";

module.exports = ({ recordBatch, _session, logger }) => {
  return recordBatch.records.map((record) => {
    Object.keys(FIELDS).forEach((field) => {
      const value = record.get(FIELDS[field]);

      if (isNotNil(value)) {
        if (dfns.parse(value, FORMAT, new Date())) {
          const thisDate = dfns.format(new Date(value), FORMAT);
          const realDate = dfns.parseISO(thisDate);

          if (dfns.isDate(realDate)) {
            record
              .set(FIELDS[field], thisDate)
              .addComment(FIELDS[field], "Automatically formatted");
          }
        } else {
          record.addError(FIELDS[field], "Invalid date");
          logger.error("Invalid date");
        }
      }
    });
  });
};
