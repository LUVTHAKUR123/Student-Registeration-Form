import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { Controller } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
function SelectorFields({ name, control, defaultValue, label, value = [] }) {
    return (
        <div>
            {/* {label && <label htmlFor={name}>{label}</label>} */}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Box sx={{ mt: 1 }} >
                            <FormControl fullWidth>

                                <InputLabel id="demo-select-small-label">Courses</InputLabel>

                                <Select {...field}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="Select Courses"
                                    sx={{ width: "100%" }}>
                                    <MenuItem value=""><em>none</em></MenuItem>
                                    {value.map((val, index) => (
                                        <MenuItem key={index} value={val}>{val}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                        </Box>
                        <br />
                        {error && <span style={{ color: "#d32f2f" }}>{error.message}</span>}
                    </>
                )}
            />
        </div>
    );
}

export default SelectorFields;
