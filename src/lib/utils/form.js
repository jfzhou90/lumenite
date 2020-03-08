export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const isValidUserPoolId = value => (/^[\w-]+_.+$/.test(value) ? undefined : 'Invalid');

export const required = value => (value ? undefined : 'Required');
