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

const ZIP_CODES = new Map([
  ["ATLANTA, GA".toLowerCase(), "30301"],
  ["BOLIGEE, AL".toLowerCase(), "35443"],
  ["BURLINGTON, NC".toLowerCase(), "27217"],
  ["CHICAGO, IL".toLowerCase(), "60607"],
  ["CINCINNATI, OH".toLowerCase(), "45202"],
  ["CLAREMONT, NC".toLowerCase(), "28610"],
]);

module.exports = async ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    const { Origincity, OriginState, DestinationCity, DestinationState } =
      record.value;

    if (isNotNil(Origincity) && isNotNil(OriginState)) {
      const cityState = [Origincity.trim(), OriginState.trim()]
        .join(", ")
        .toLowerCase();
      const zipCode = ZIP_CODES.get(cityState);

      if (isNotNil(zipCode)) {
        record.set("OriginZip", zipCode);
      }
    }

    if (isNotNil(DestinationCity) && isNotNil(DestinationState)) {
      const cityState = [DestinationCity.trim(), DestinationState.trim()]
        .join(", ")
        .toLowerCase();
      const zipCode = ZIP_CODES.get(cityState);

      if (isNotNil(zipCode)) {
        record.set("DestinationZip", zipCode);
      }
    }
  });
};
