import React from 'react';
import { Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';

const FormField = ({
  name,
  id,
  label,
  validate,
  autoFocus = false,
  type = 'text',
  maxLength = 30,
  required = true,
}) => (
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
              maxLength: maxLength,
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

export default FormField;
