// import React from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
// import { Form } from 'react-final-form';

// import { displayActions } from '../../../store/slices/display';
// import FormField from '../../../lib/components/form/formField';
// import { required } from '../../../lib/utils/form';

// const SaveQuery = ({ save }) => {
//   const dispatch = useDispatch();
//   const open = useSelector(({ display }) => display.saveQueryDialog);
//   const isSubmitting = useSelector(({ workspace }) => workspace.isSubmitting);

//   const toggleSaveQueryDialog = () => {
//     dispatch(displayActions.TOGGLE_SAVE_QUERY_DIALOG());
//   }

//   const submitForm = formData => console.log(formData);

//   return(

//   )
// };

// SaveQuery.propTypes = {
//   save: PropTypes.func.isRequired,
// };

// export default SaveQuery;
