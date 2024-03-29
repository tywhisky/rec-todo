import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from '@mui/x-date-pickers/models';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Flex, Text } from '@radix-ui/themes';
import { CalendarIcon, } from '@radix-ui/react-icons';

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
    <Flex
      id={id}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      align="center" className="hover:bg-gray-100 w-full active:bg-gray-200 select-none py-1 rounded cursor-pointer">
      <CalendarIcon width="16" className="ml-[6px] mr-[6.5px]" />
      <Text size="1" className={label ? "text-[#333333]" : "text-gray-400"}>
        {label ? `${label}` : 'Date/time'}
      </Text>
    </Flex>
  );
}

export default function DateTimePicker(props: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <MobileDateTimePicker
      minDateTime={dayjs()}
      onChange={props.onChange}
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } as any, actionBar: { actions: ['clear', 'accept'] } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}
