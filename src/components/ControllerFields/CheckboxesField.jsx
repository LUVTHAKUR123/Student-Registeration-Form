import React from "react";
import { Controller } from "react-hook-form";

function CheckboxesField({ name, control, defaultValue, options = [], label }) {
  return (
    <div>
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <>
            {options.map((option, i) => (
              <label key={i} >
                <input
                  type="checkbox"
                  value={option}
                  checked={(field.value || []).includes(option)}
                  onChange={() => {
                    const selected = field.value || [];
                    field.onChange(
                      selected.includes(option)
                        ? selected.filter(val => val !== option)
                        : [...selected, option]
                    );
                  }}
                />
                {option}
              </label>
            ))}
            {error && <span >{error.message}</span>}
          </>
        )}
      />
    </div>
  );
}

export default CheckboxesField;
