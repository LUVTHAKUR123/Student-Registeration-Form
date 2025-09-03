import React from 'react'
import { Controller } from 'react-hook-form'
import { TextareaAutosize, FormControl, FormHelperText, FormLabel } from '@mui/material';
function TextAreaField({ label, name, control, defaultValue, placeholder, rows }) {
    return (
        <>
            <div>
                {/* {label && <label>{label}</label>} */}
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <FormControl fullWidth margin="normal">
                                {label && <FormLabel component="legend">{label}</FormLabel>}
                                <TextareaAutosize
                                    maxRows={10}
                                    aria-label="maximum height"
                                    {...field}
                                    placeholder={placeholder}
                                    minRows={rows} style={{
                                        width: "100%",
                                        fontSize: "1rem",
                                        padding: "10px",
                                        borderRadius: "4px",
                                        border: "1px solid #c4c4c4",
                                    }}
                                />
                                {error && <FormHelperText style={{ fontSize: "15px", color: "#d32f2f" }} >{error.message}</FormHelperText>}
                            </FormControl>
                        </>
                    )}

                />
            </div>
        </>)
}

export default TextAreaField