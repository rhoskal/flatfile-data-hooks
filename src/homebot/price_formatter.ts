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

const parseFloat_ = (val) => parseFloat(val);

const round_ = (val) => Math.round(val);

const clean = (val) => val.trim().replace(/[$,]/g, "");

const parse = (val) => pipe(val, clean, parseFloat_);

const formatted = (val) => pipe(val, round_);

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const pricePoint = record.get("pricePoint");
    const maxLoanAmount = record.get("maxLoanAmount");
    const downPayment = record.get("downPayment");
    const maxHomePrice = record.get("maxHomePrice");

    if (isNotNil(pricePoint)) {
      const parsed = parse(pricePoint);

      if (parsed < 1) {
        record.addError("pricePoint", "Must be a positive number.");
      } else {
        record.set("pricePoint", formatted(parsed));
      }
    }

    if (isNotNil(maxLoanAmount)) {
      const parsed = parse(maxLoanAmount);

      if (parsed < 1) {
        record.addError("maxLoanAmount", "Must be a positive number.");
      } else {
        record.set("maxLoanAmount", formatted(parsed));
      }
    }

    if (isNotNil(downPayment)) {
      const parsed = parse(downPayment);

      if (parsed < 1) {
        record.addError("downPayment", "Must be a positive number.");
      } else {
        record.set("downPayment", formatted(parsed));
      }
    }

    if (isNotNil(maxHomePrice)) {
      const parsed = parse(maxHomePrice);

      if (parsed < 1) {
        record.addError("maxHomePrice", "Must be a positive number.");
      } else {
        record.set("maxHomePrice", formatted(parsed));
      }
    }
  });
};
