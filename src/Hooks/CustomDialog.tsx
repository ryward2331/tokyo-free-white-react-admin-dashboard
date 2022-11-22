import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
 const CustomDialog = ({Title,DialogBody,DialogFooter,openDialog,maxWidth,fullWidth,closeDialog}) => {
  const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
    closeDialog(false);
  };
  useEffect(()=>{
    if(openDialog){
      setOpen(true);
    }else{
      setOpen(false);
    }
  },[openDialog,open])
  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {Title} 
        </BootstrapDialogTitle>
        <DialogContent>
            {DialogBody}
        </DialogContent>
        <DialogActions>
         {DialogFooter}
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default CustomDialog;