import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, Fragment, SyntheticEvent, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { GetAlertModel } from '../Services/Models/Constant/ConstantModel';
import { setAlertMessage } from '../Services/Actions/Constant/ConstantActions';
import { useTypedDispatch } from '../Services/Store';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar({AlertMessage,typeOfAlert,openALert}) {
  const [open, setOpen] = useState(false);
  const dispatch =useTypedDispatch();
  useEffect(()=>{
    if(openALert){
        setOpen(true);
    }else {
        setOpen(false);
    }
  },[openALert])

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    const payloadAlertMessage: GetAlertModel = {
    alertMessage: '',
    alertOpen:false,
    typeOfAlert: 'success'
    };
   dispatch(setAlertMessage(payloadAlertMessage));
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open}  onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeOfAlert} sx={{ width: '100%' }}>
         {AlertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}