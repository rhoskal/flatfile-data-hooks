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

const replace = (value) => {
  if (/retail/gi.test(value)) {
    return "Retail";
  } else if (/store/gi.test(value)) {
    return "Retail";
  } else if (/distribution/gi.test(value)) {
    return "Distributor/Wholesale";
  } else if (/college/gi.test(value) || /university/gi.test(value)) {
    return "Higher Education";
  } else if (/exporter/gi.test(value)) {
    return "Importer/Exporter";
  } else if (/military/gi.test(value)) {
    return "Military/Other Gov't";
  } else if (/government/gi.test(value)) {
    return "Military/Other Gov't";
  } else if (/charitable/gi.test(value)) {
    return "Non-Profit/Emergency Relief";
  } else if (/food bank/gi.test(value)) {
    return "Non-Profit/Emergency Relief";
  } else if (/school/gi.test(value)) {
    return "K12/Schools";
  } else {
    return undefined;
  }
};

module.exports = ({ recordBatch, _session, logger }) => {
  return recordBatch.records.map((record) => {
    const { customer_type } = record.value;

    if (isNotNil(customer_type)) {
      const replacedValue = replace(customer_type);

      if (isNil(replacedValue)) {
        logger.warn("Not sure what to do with: ", customer_type);
      } else {
        return record
          .set("customer_type", replacedValue)
          .addComment("customer_type", "Reformatted");
      }
    }
  });
};
