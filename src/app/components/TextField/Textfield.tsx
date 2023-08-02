import * as React from 'react';
import { TextField as Text } from '@mui/material';
import styled from 'styled-components';

const TextFieldInput = styled(Text)`
  color: ${p => p.theme.textSecondary};
`;

const ValidationTextFields = props => {
  const { inputValue, onChangeHandler, inputLabel, children, ...rest } = props;
  return (
    <div>
      <TextFieldInput
        label={inputLabel}
        value={inputValue}
        onChange={onChangeHandler}
        variant="standard"
        {...rest}
        InputLabelProps={{
          style: { color: '#212121' },
        }}
        InputProps={{
          style: { color: '#212121', fontSize: '0.9rem', maxWidth: 160 },
        }}
      />
      {children && children}
    </div>
  );
};

export default ValidationTextFields;
