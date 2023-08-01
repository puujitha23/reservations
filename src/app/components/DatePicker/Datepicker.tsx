import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

export default function DatePickerInput(props) {
  const { inputLabel, inputValue, ...rest } = props;
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={inputLabel}
        variant="standard"
        defaultValue={dayjs(inputValue)}
        value={value}
        onChange={(newValue: Dayjs) => setValue(newValue)}
        selectedSections={undefined}
        onSelectedSectionsChange={undefined}
        slotProps={{
          textField: {
            InputProps: {
              size: 'small',
              sx: { fontSize: 20, maxWidth: 200 },
              disableUnderline: false,
            },
            variant: 'standard',
          },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
}
