import React from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import map from 'lodash/map';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const FormDropDown = ({ name, id, label, required, validate, keyPair }) => (
  <Field
    name={name}
    id={id}
    validate={validate}
    render={({ input, meta }) => {
      const showError = !!meta.error && !!meta.touched;
      return (
        <FormControl required={required}>
          <InputLabel id={id}>{label}</InputLabel>
          <Select labelId={id} id={`${id}_select`} error={showError} {...input}>
            {map(keyPair, (value, key) => (
              <MenuItem value={key} key={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }}
  />
);

FormDropDown.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.func,
  required: PropTypes.bool,
  keyPair: PropTypes.shape({ [PropTypes.string]: PropTypes.string }).isRequired,
};

FormDropDown.defaultProps = {
  validate: noop,
  required: false,
};

export default FormDropDown;
