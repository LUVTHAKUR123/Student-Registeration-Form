import React from "react";
import { Controller } from "react-hook-form";

function SelectorFields({ name, control, defaultValue, label, value = [] }) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field, fieldState: { error } }) => (
                    <>

                        <select {...field}>
                            <option value="">---select the course---</option>
                            {value.map((val, index) => (
                                <option key={index} value={val}>{val}</option>
                            ))}

                        </select>

                        <br />
                        {error && <span style={{ color: "red" }}>{error.message}</span>}
                    </>
                )}
            />
        </div>
    );
}

export default SelectorFields;
