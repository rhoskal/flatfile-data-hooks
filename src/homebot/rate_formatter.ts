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

const pipe = (...args) => args.reduce((acc, el) => el(acc));

const clean = (val) => val.trim().replace(/[%]/g, "");

const parseFloat_ = (val) => parseFloat(val);

const parse = (val) => pipe(val, clean, parseFloat_);

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const estimatedRate = record.get("estimatedRate");

    if (isNotNil(estimatedRate)) {
      const parsed = parse(estimatedRate);

      if (parsed % 0.125 === 0) {
        record.set("estimatedRate", parsed);
      } else {
        record.addError("estimatedRate", "Must be in 0.125 increments");
      }
    }
  });
};
