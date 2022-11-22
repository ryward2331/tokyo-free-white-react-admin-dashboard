import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import CustomDialog from '../../../../Hooks/CustomDialog';
import { AddBusiness } from '../../../../Interface/Stocks/StocksInterface';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootStore, useTypedDispatch } from '../../../../Services/Store';
import { AddBusinessModel } from '../../../../Services/Models/Business/BusinessModel';
import { addBusiness } from '../../../../Services/API/Business/Business';
import { GetAlertModel, SetProvince } from '../../../../Services/Models/Constant/ConstantModel';
import { getBaranggay, setAlertMessage } from '../../../../Services/Actions/Constant/ConstantActions';
import DropZoneFile from '../../../../Hooks/DropZoneFile';
import { FormProvider, useForm } from 'react-hook-form';
import Dropzone, { useDropzone } from 'react-dropzone';
import React from 'react';
import ObjectToFormDataHelper from '../../../../Helpers/ObjectToFormDataHelper';
import TextFieldHookForm from '../../../../Hooks/TextFieldHookForm';
import SelectFieldHookForm from '../../../../Hooks/SelectFieldHookForm';
import { addBusinessAction } from '../../../../Services/Actions/Business/BusinessActions';
import { fetch_baranggay } from '../../../../Services/API/Constant/Constant';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ user,openRegisterModal,closeModal }) => {
  const fetch_type_list = useSelector(
    (store: RootStore) => store.BusinessReducers.fetch_type_list
  );
  const fetch_province = useSelector(
    (store: RootStore) => store.ConstantReducers.fetch_province
  );
  const fetch_baranggay_selector = useSelector(
    (store: RootStore) => store.ConstantReducers.fetch_baranggay
  );
  const [open, setOpen] = useState(false);
  const user_info = useSelector(
    (store: RootStore) => store.SignInReducer.fetch_user_info
  );
  const dispatch =useTypedDispatch();
  const inputRef = React.useRef()


  const [values, setValues] = useState<any>({
    name: '',
    type_id: '',
    dti_no: '',
    bir_no: '',
    email: '',
    contact_no: '',
    city: '',
    baranggay: '',
    street: '',
    uploaded_files:[]
  });

  const handleChange =useCallback((prop: keyof any) => async (event) => {
    setValues({ ...values, [prop]: event.target.nextSibling.attributes.value.nodeValue });
  
  },[values?.city]);
  useEffect(()=>{
    let mounted =true;
    const fetchBarangay= async() => {
      if(mounted){
        if(values?.city ===''){
          return;
        }
        const payload:SetProvince = {
          provincecode:values?.city
        };
        const fetch_barangay_response = await fetch_baranggay(payload);
        if (fetch_barangay_response.success) {
          dispatch(getBaranggay(payload));
        } else {
          if (typeof fetch_barangay_response.message === "string") {
            alert(fetch_barangay_response.message);
          }
        }
      }
   
    };
    fetchBarangay();
  },[values?.city]);
  const handleRegisterBusiness = async (data) => {
    const payload = ObjectToFormDataHelper(data);
    const token = localStorage.getItem('sbe_token');

    const response = await addBusiness(payload,token);
    if(response.success) {
      const payloadAlertMessage: GetAlertModel = {
        alertMessage:response?.message.toString(),
        alertOpen:true,
        typeOfAlert: 'info'
      };
      await dispatch(setAlertMessage(payloadAlertMessage));
      await closeModal(false);
    } else {
      const payloadAlertMessage: GetAlertModel = {
        alertMessage:response?.message.toString(),
        alertOpen:true,
        typeOfAlert: 'error'
      };
      await dispatch(setAlertMessage(payloadAlertMessage));
      await closeModal(false);
    }
  };
  const form_link_business = useForm({
    defaultValues: values,
    mode: "onBlur",
  });
  return (
    <>
    
      <CardCover>
        <CardMedia  />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Change cover
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded"  />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <CustomDialog 
       Title={"Register business"}
          DialogBody={
          <Grid container spacing={5}  justifyContent="center">
          <Grid item xs={8}>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 2, width: '100%' }
            }}
            >
            <FormProvider {...form_link_business}>
            <form    id="form_link_business"  noValidate onSubmit={form_link_business.handleSubmit(handleRegisterBusiness)}>
            <div>
            <TextFieldHookForm
                name="name"
                label="Business Name"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <Grid container spacing={5} justifyContent="center" alignItems="center">
            <Grid item  xs={6}>
            <div>
            <TextFieldHookForm
                name="dti_no"
                label="DTI No."
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            </Grid>
            <Grid item  xs={6}>
            <div>
            <TextFieldHookForm
                name="bir_no"
                label="BIR No."
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            </Grid>
            </Grid>
             <div>
              <SelectFieldHookForm
                name="type_id"
                label="Business Type"
                options={JSON.parse(JSON.stringify(fetch_type_list))}
              />
              </div>
            <div>
            <TextFieldHookForm
                name="email"
                label="Email Address"
                value={values.email}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
            <TextFieldHookForm
                name="contact_no"
                label="Contact No"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
            <SelectFieldHookForm
                name="city"
                label="City"
                onFocus={handleChange('city')}
                options={JSON.parse(JSON.stringify(fetch_province))}
              />
            </div>
            
            {fetch_baranggay_selector !== null?
            <div>
            <SelectFieldHookForm
                name="baranggay"
                label="Barrangay"
                 options={JSON.parse(JSON.stringify(fetch_baranggay_selector))}
              />
            </div>
            : null
            }
            <div>
            <TextFieldHookForm
                name="street"
                label="Address"
                fullWidth
                helperText={"Street/block/lot"}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            {/* <Grid item container>
              <Grid item xs={12}>
                <DropZoneFile  name="uploaded_files"/>
              </Grid>
            </Grid> */}
            </form>
            </FormProvider>
            </Box>
          </Grid>
          </Grid>
        } 
        DialogFooter={
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Button
                type="submit"
                form="form_link_business"
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={user.bussiness_id === null? <AddCircleOutline fontSize="small" />  : <EditIcon fontSize="small" />}
              >
              {user.bussiness_id === null?  "Add new business" :  "Update business details"}
              </Button>
            </Grid>
          </Grid> 
        }
        openDialog={openRegisterModal} 
        maxWidth={"sm"}
        fullWidth={true}
        closeDialog={(value)=> {setOpen(value); closeModal(value);}}
      />
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
