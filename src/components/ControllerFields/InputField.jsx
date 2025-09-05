import React from "react";
import { Controller } from "react-hook-form";
import { TextField, InputLabel, FormHelperText } from "@mui/material";
function InputField({
  name,
  control,
  defaultValue,
  placeholder,
  label,
  // rules,
  type,
}) {
  return (
    <>
      <div>
        {/* {label && <label htmlFor={name}>{label}</label>} */}

        <Controller
                                          name={name}
          control={control}
          defaultValue={defaultValue}
          // rules={rules}
          render={({ field, fieldState: { error } }) => (
            <div>
              <InputLabel
                htmlFor={name}
                sx={{ fontSize: "15px", fontFamily: "sans-serif" }}
              >
                {label}
              </InputLabel>

              {/* <input */}
              <TextField
                {...field}
                // id={name}
                // label={label}
                variant="outlined"
                placeholder={placeholder}
                type={type}
                fullWidth
                margin="dense"
              />
              <br />

              {error && (
                <FormHelperText style={{ fontSize: "15px", color: "#d32f2f" }}>
                  {error.message}
                </FormHelperText>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
}

export default InputField;
