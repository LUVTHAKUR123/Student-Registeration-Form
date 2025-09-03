// import React from "react";
// import { Controller } from "react-hook-form";

// function RadioButton({ name, control, defaultValue, gender = [], label }) {
//     return (
//         <>
//             <div >
//                 {label && <label>{label}</label>}

//                 <Controller
//                     name={name}
//                     control={control}
//                     defaultValue={defaultValue}
//                     render={({ field, fieldState: { error } }) => (
//                         <>
//                             <div className="gender">
//                                 {gender.map((val, index) => (
//                                     <label key={index}>
//                                         <input
//                                             type="radio"
//                                             value={val}
//                                             checked={field.value === val}
//                                             onChange={() => field.onChange(val)}
//                                         />
//                                         {val}
//                                         <br />
//                                     </label>
//                                 ))}


//                             </div>
//                             {error && <span>{error.message}</span>}

//                         </>
//                     )}
//                 />
//             </div>
//         </>
//     );
// }

// export default RadioButton;
import React from "react";
import { Controller } from "react-hook-form";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio, FormHelperText
} from "@mui/material";

function RadioButton({ name, control, defaultValue, gender = [], label }) {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <FormControl >
                            {label && <FormLabel id={`${name}-label`}>{label}</FormLabel>}
                            <RadioGroup sx={{}}
                                row
                                aria-labelledby={`${name}-label`}
                                {...field}
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                {gender.map((val, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={val}
                                        control={<Radio />}
                                        label={val}
                                    />
                                ))}
                            </RadioGroup>
                            {error && <FormHelperText style={{ fontSize: "15px", color: "#d32f2f" }}>{error.message}</FormHelperText>}
                        </FormControl>
                    </>
                )}
            />
        </div>
    );
}

export default RadioButton;

