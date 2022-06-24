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
  borrower_phone: "borrowerPhone",
  borrower_dob: "borrowerDob",
  co_borrower_phone: "coBorrowerPhone",
  co_borrower_dob: "coBorrowerDob",
  home_property_address: "homePropertyAddress",
  home_purchase_price: "homePurchasePrice",
  home_purchase_date: "homePurchaseDate",
  home_appraised_date: "homeAppraisedDate",
  loan_mortgage_ins_premium: "loanMortgageInsPremium",
  loan_number: "loanNumber",
};

module.exports = ({ recordBatch, _session, _logger }) => {
  return recordBatch.records.map((record) => {
    Object.keys(FIELDS).forEach((field) => {
      const value = record.get(FIELDS[field]);

      if (isNil(value)) {
        record.addWarning(FIELDS[field], "Highly Encouraged.");
      }
    });
  });
};
