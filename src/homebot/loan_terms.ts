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

const pipe = (...fns) => fns.reduce((acc, f) => f(acc));

const clean = (val) => val.trim().replace(/\D/g, "");

const parseFloat_ = (val) => parseFloat(val);

const parse = (val) => pipe(val, clean, parseFloat_);

const TERMS = [120, 180, 240, 264, 300, 360];

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const loanTerm = record.get("loanTermMonths");

    if (isNotNil(loanTerm)) {
      const parsed = parse(loanTerm);

      if (isNotNil(TERMS.find((val) => val === parsed))) {
        record.set("loanTermMonths", parsed);
      } else {
        record.addWarning(
          "loanTermMonths",
          `Possible values: ${TERMS.join(", ")}`,
        );
      }
    }
  });
};
