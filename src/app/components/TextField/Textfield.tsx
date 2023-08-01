import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function ValidationTextFields(props) {
  const { inputValue, onChangeHandler, inputLabel, children, ...rest } = props;
  return (
    <div>
      <TextField
        label={inputLabel}
        value={inputValue}
        onChange={onChangeHandler}
        variant="standard"
        {...rest}
      />
      {children && children}
    </div>
  );
}
