import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker as DatePick } from '@mui/x-date-pickers';
import styled from 'styled-components';

const DateInput = styled(DatePick)`
  color: ${p => p.theme.textSecondary};
`;
export default function DatePickerInput(props) {
  const { inputLabel, inputValue, onChangeHandler, ...rest } = props;
  const [value, setValue] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    if (inputValue) {
      setValue(dayjs(inputValue));
    }
  }, [inputValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateInput
        label={inputLabel}
        variant="standard"
        value={value}
        onChange={(newValue: Dayjs) => {
          setValue(newValue);
          onChangeHandler(newValue);
        }}
        selectedSections={undefined}
        onSelectedSectionsChange={undefined}
        slotProps={{
          textField: {
            InputProps: {
              size: 'small',
              sx: {
                fontSize: '0.9rem',
                lineHeight: '1.2rem',
                maxWidth: 140,
                color: '#212121',
              },
              disableUnderline: false,
            },
            variant: 'standard',
          },
          InputLabelProps: {
            sx: { color: '#212121' },
          },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
}
