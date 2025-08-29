import React from "react";
import { Controller } from "react-hook-form";

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
                {label && <label htmlFor={name}>{label}</label>}

                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    // rules={rules}
                    render={({ field, fieldState: { error } }) => (
                        <div>
                            <input
                                {...field}
                                id={name}
                                placeholder={placeholder}
                                type={type}
                            />
                            <br />

                            {error && <span>{error.message}</span>}
                        </div>
                    )}
                />
            </div>
        </>
    );
}

export default InputField;
