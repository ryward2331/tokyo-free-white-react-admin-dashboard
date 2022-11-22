import { TextField, TextFieldProps } from "@mui/material";
import React, { FC, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface TextFieldHookFormProps {
  textFieldProps: TextFieldProps;
}

export const TextFieldHookForm: FC<TextFieldProps> = memo((props) => {
  const { control } = useFormContext();

//   let error = false;
//   let error_message = "";

//   if (errors && errors?.hasOwnProperty(props?.name)) {
//     error = true;
//     error_message = errors[props?.name]?.message;
//   }

  return (
    <Controller
      name={props.name}
      control={control}
    
      render={(ctrlProps, { invalid, isTouched, isDirty }) => (
        <TextField
          {...props}
          {...ctrlProps}
          
          value={ctrlProps.value ? ctrlProps.value : ""}
        //   error={error}
        //   helperText={error_message}
        />
      )}
    />
  );
});

export default TextFieldHookForm;