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
    const {
      company_name,
      customer_type,
      device_type,
      first_name,
      house_name_or_number,
      last_name,
      locality,
      losing_carrier,
      post_code,
      service_type,
      street_name,
      transaction_type,
    } = record.value;

    if (isNil(losing_carrier)) {
      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
          break;
        case "NEW":
          break;
        case "PORTIN":
          record.addError("losing_carrier", "Field is required (DH).");
          break;
        default:
          logger.error(`Unknown transaction_type: ${transaction_type}.`);
          break;
      }
    }

    if (isNil(device_type)) {
      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("device_type", "Field is required (DH).");
          break;
      }
    }

    if (isNil(service_type)) {
      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("service_type", "Field is required (DH).");
          break;
        default:
          logger.error(`Unknown transaction_type: ${transaction_type}.`);
          break;
      }
    }

    if (isNil(customer_type)) {
      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("customer_type", "Field is required (DH).");
          break;
      }
    } else {
      switch (customer_type) {
        case "BUS":
          if (isNil(company_name)) {
            record.addWarning(
              "company_name",
              "Please add a company name (DH).",
            );
          }
          break;
        case "RES" && isNotNil(company_name):
          if (isNotNil(company_name)) {
            record.addWarning(
              "company_name",
              "Please remove company name (DH).",
            );
          }
          break;
        default:
          logger.error(`Unknown customer_type: ${customer_type}.`);
          break;
      }
    }

    if (isNil(first_name)) {
      switch (customer_type) {
        case "RES":
          record.addError("first_name", "Field is required (DH).");
          break;
        case "BUS":
        default:
          logger.error(`Unknown customer_type: ${customer_type}.`);
          break;
      }

      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("first_name", "Field is required (DH).");
          break;
        default:
          logger.error(`Unknown transaction_type: ${transaction_type}.`);
          break;
      }
    }

    if (isNil(last_name)) {
      switch (customer_type) {
        case "RES":
          record.addError("last_name", "Field is required (DH).");
          break;
        case "BUS":
        default:
          logger.error(`Unknown customer_type: ${customer_type}.`);
          break;
      }

      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("last_name", "Field is required (DH).");
          break;
        default:
          logger.error(`Unknown transaction_type: ${transaction_type}.`);
          break;
      }
    }

    if (isNil(company_name)) {
      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("company_name", "Field is required (DH).");
          break;
      }
    }

    if (isNil(house_name_or_number)) {
      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("house_name_or_number", "Field is required (DH).");
          break;
      }
    }

    if (isNil(street_name)) {
      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("street_name", "Field is required (DH).");
          break;
        default:
          logger.error(`Unknown transaction_type: ${transaction_type}.`);
          break;
      }
    }

    if (isNil(locality)) {
      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("locality", "Field is required (DH).");
          break;
        default:
          logger.error(`Unknown transaction_type: ${transaction_type}.`);
          break;
      }
    }

    if (isNil(post_code)) {
      switch (transaction_type) {
        case "CANCEL":
          break;
        case "CHANGE":
        case "NEW":
        case "PORTIN":
          record.addError("post_code", "Field is required (DH).");
          break;
        default:
          logger.error(`Unknown transaction_type: ${transaction_type}.`);
          break;
      }
    }

    return record;
  });
};
