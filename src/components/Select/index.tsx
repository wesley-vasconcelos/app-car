import React, { forwardRef } from "react";
import {
  FormControl,
  Select as MuiSelect,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface SelectProps {
  label: string;
  data: { value: number | string; name: string }[];
  control: any;
  name: string;
  onChange?: any;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">{props.label}</InputLabel>
            <MuiSelect
              labelId="simple-select-label"
              id="simple-select"
              data-cy={`select-${props.name}`}
              value={field.value || 0}
              onChange={(event: SelectChangeEvent) => {
                field.onChange(event);
                if (!!props.onChange) {
                  props.onChange(event);
                }
              }}
            >
              {props.data?.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  data-cy={`select-option-${item.value}`}
                >
                  {item.name}
                </MenuItem>
              ))}
            </MuiSelect>
          </FormControl>
        </>
      )}
    />
  );
});

Select.displayName = "Select";
