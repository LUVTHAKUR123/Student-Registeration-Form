import React from "react";
import { Controller } from "react-hook-form";

function RadioButton({ name, control, defaultValue, gender = [], label }) {
    return (
        <>
            <div>
                {label && <label>{label}</label>}
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            {gender.map((val, index) => (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        value={val}
                                        checked={field.value === val}
                                        onChange={() => field.onChange(val)}
                                    />
                                    {val}
                                    <br />
                                </label>
                            ))}
                            {error && <span>{error.message}</span>}
                        </>
                    )}
                />
            </div>
        </>
    );
}

export default RadioButton;
