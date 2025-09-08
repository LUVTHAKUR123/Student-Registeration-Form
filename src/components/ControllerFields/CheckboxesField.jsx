import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

function CheckboxesField({ name, control, defaultValue, options = [], label }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || []}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" margin="normal">
          {label && <FormLabel component="legend">{label}</FormLabel>}
          <FormGroup sx={{ flexDirection: "row" }}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={(field.value || []).includes(option)}
                    onChange={() => {
                      const selected = field.value || [];
                      field.onChange(
                        selected.includes(option)
                          ? selected.filter((val) => val !== option)
                          : [...selected, option]
                      );
                    }}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
          {error && (
            <FormHelperText style={{ fontSize: "15px", color: "#d32f2f" }}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default CheckboxesField;
