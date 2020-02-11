import React from 'react';
import { Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const FormField = ({ name, id, label, validate, autoFocus, type, maxLength, required }) => (
  <Field
    name={name}
    id={id}
    type={type}
    validate={validate}
    render={({ input, meta }) => {
      const showError = !!meta.error && !!meta.touched;
      return (
        <TextField
          label={label}
          autoFocus={autoFocus}
          fullWidth
          required={required}
          error={showError}
          InputProps={{
            inputProps: {
              maxLength,
              autoComplete: 'off',
              'aria-required': true,
            },
          }}
          {...input}
        />
      );
    }}
  />
);

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.func,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
};

FormField.defaultProps = {
  validate: noop,
  autoFocus: false,
  type: 'text',
  maxLength: 30,
  required: false,
};

export default FormField;
