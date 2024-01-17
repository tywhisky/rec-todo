import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from '@mui/x-date-pickers/models';
import { DatePicker } from '@mui/x-date-pickers';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'; import { Button } from '@mui/material';
import { CircleBackslashIcon } from '@radix-ui/react-icons';

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
  BaseSingleInputFieldProps<
    Dayjs | null,
    Dayjs,
    FieldSection,
    DateValidationError
  > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  return (
    <Button
      id={id}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      component="label" variant="text" sx={{ width: 'auto', height: 30, fontSize: 13, borderRadius: 2 }}
      startIcon={<FilterListRoundedIcon />}>
      {`DATE - ${label ? label : "ALL"}`}
    </Button>
  );
}

export default function DateFilter(props: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='flex mb-2 items-center'>
      <DatePicker
        value={props.value}
        minDateTime={dayjs()}
        onChange={props.onChange}
        slots={{ field: ButtonField, ...props.slots }}
        slotProps={{ field: { setOpen } as any, actionBar: { actions: [] } }}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
      {props.label && (
        <CircleBackslashIcon onClick={props.onClear} className='max-w-xs transition duration-300 ease-in-out hover:scale-110 text-teal8 ml-2' />
      )}
    </div>
  );
}
