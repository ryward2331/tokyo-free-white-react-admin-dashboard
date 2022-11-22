import { CloudUpload, InsertDriveFile } from "@mui/icons-material";
import { FormHelperText, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React, { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Controller, useForm, useFormContext } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eee",
    textAlign: "center",
    cursor: "pointer",
    color: "#333",
    padding: "10px",
    marginTop: "20px",
  },
  icon: {
    marginTop: "16px",
    color: "#888888",
    fontSize: "42px",
  },
}));

const DropZoneFile = ({name}) => {

  const { control } = useFormContext();
  const styles = useStyles();

//   let error = false;
//   let error_message = "";

//   if (errors && errors?.hasOwnProperty(name)) {
//     error = true;
//     error_message = errors[name]?.message;
//   }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      
      render={({ onChange, onBlur, value }) => (
        <>
          <Dropzone  onDrop={onChange}>
            {({ getRootProps, getInputProps }) => (
              <Paper
                variant="outlined"
                className={styles.root}
                {...getRootProps()}
              >
                <CloudUpload className={styles.icon} />
                <input {...getInputProps()}  onBlur={onBlur} />
                <p>Drag and drop files here or click to select files</p>
                {/* <FormHelperText error={error}>{error_message}</FormHelperText> */}
              </Paper>
            )}
          </Dropzone>

          <List>
            {value.map((f, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary={f.name} secondary={f.size} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    />
  );
};

export default DropZoneFile;