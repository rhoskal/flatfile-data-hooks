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

const isNumber = (val) => typeof val === "number";

const pipe = (...args) => args.reduce((acc, el) => el(acc));

const clean = (val) => val.trim().replace(/\s/g, "");

const parseFloat_ = (val) => parseFloat(val);

const parse = (val) => pipe(val, parseFloat_);

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const zipCodes = record.get("zipCodes");

    if (isNotNil(zipCodes)) {
      const cleaned = clean(zipCodes);

      const zips = cleaned.split("-").reduce((acc, val) => {
        if (val.length !== 5) return acc;

        const parsed = parse(val);

        if (isNumber(parsed)) {
          return [...acc, val];
        }
      }, []);

      record.set("zipCodes", zips.join(", ")).addComment("zips", "Formatted");
    }
  });
};
