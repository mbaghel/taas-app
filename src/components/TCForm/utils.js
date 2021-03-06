/**
 * TC Form utilty
 */
import _, { filter } from "lodash";
import { getSelectOptionByValue } from "utils/helpers";
import { FORM_FIELD_TYPE } from "../../constants";

/**
 * Extract value from field by type
 * @param {any} value value
 * @param {any} field field
 * @returns {any} converted value
 */
const extractValue = (value, field) => {
  if (value === undefined || value === null) {
    return value;
  }

  switch (field.type) {
    case FORM_FIELD_TYPE.SELECT: {
      return field.isMulti
        ? value.map((valueItem) =>
            getSelectOptionByValue(valueItem, field.selectOptions)
          )
        : getSelectOptionByValue(value, field.selectOptions);
    }

    case FORM_FIELD_TYPE.DATE: {
      return new Date(value);
    }

    default: {
      return value;
    }
  }
};

/**
 * Create form data based on field configuration
 * @param {any} data data
 * @param {Array} fields form fields
 * @returns {any} form data
 */
export const createFormData = (data, fields) => {
  return fields.reduce(
    (obj, item) => (
      (obj[item.name] = _.some(data, obj[item.name])
        ? extractValue(data[[item.name]], item)
        : null),
      obj
    ),
    {}
  );
};

/**
 * Create configuration object from form fields
 * @param {Array} fields form fields
 * @returns {any} configuration object
 */
export const createConfigurationObject = (fields) => {
  return fields.reduce((obj, item) => {
    return {
      ...obj,
      [item.name]: item,
    };
  }, {});
};

/**
 * Create a validator function based on form fields
 * @param {Array} fields form fields
 * @returns {Function} configuration object
 */
export const getValidator = (fields) => {
  return (values) => {
    const errors = {};
    fields
      .filter((f) => f.isRequired || f.customValidator)
      .forEach((f) => {
        if (f.isRequired && !values[f.name]) {
          errors[f.name] = f.validationMessage;
        } else if (f.customValidator) {
          const error = f.customValidator(f, fields, values);
          if (error) {
            errors[f.name] = error;
          }
        }
      });
    return errors;
  };
};

/**
 * Prepare form field value to be submitted to API
 *
 * @param {Object} field form field
 * @param {Any} value form field value
 * @returns prepared value for the field
 */
const prepareSubmitField = (field, value) => {
  switch (field.type) {
    case FORM_FIELD_TYPE.SELECT:
      return field.isMulti
        ? value?.map((option) => option.value)
        : value?.value;

    default:
      // we have to send `null` to API to clear the value instead of `undefined`
      if (_.isUndefined(value)) {
        return null;
      }

      return value;
  }
};

/**
 * Prepare form submit data
 * @param {any} values form value
 * @param {Array} fields form fields
 * @returns {any} converted submitted data
 */
export const prepareSubmitData = (values, fields) => {
  const data = fields.reduce((obj, field) => {
    return {
      ...obj,
      [field.name]: prepareSubmitField(field, values[field.name]),
    };
  }, {});

  return data;
};
