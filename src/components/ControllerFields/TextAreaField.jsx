import React from 'react'
import { Controller } from 'react-hook-form'

function TextAreaField({ label, name, control, defaultValue, placeholder, rows }) {
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
                            <textarea
                                {...field}
                                placeholder={placeholder}
                                rows={rows}
                                style={{ width: "100%" }}
                            />
                            {error && <span>{error.message}</span>}
                        </>
                    )}

                />
            </div>
        </>)
}

export default TextAreaField