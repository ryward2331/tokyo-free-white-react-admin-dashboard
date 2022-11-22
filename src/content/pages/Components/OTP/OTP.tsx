import { Helmet } from 'react-helmet-async';
import React, { useCallback } from 'react';
import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Alert,
  AlertTitle
} from '@mui/material';
import './otp.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Overview from '../../../overview';
import { iOTP, UserLogin } from '../../../../Interface/Login/LoginInterface';
import { OTPModel, SignInModel } from '../../../../Services/Models/Login/SignInModel';
import {UserActivate} from '../../../../Services/Actions/Login/ActivateActions';
import { useTypedDispatch } from '../../../../Services/Store';
import {ActivateUser, SignIn}  from "../../../../Services/API/Login/SignIn";
import { APP_NAME } from '../../../../Helpers/AppConfig';
import OTPInput from "../../../../Hooks/OTPinput";
function OTP() {
  const dispatch=useTypedDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");
  const [values, setValues] = useState('');

  const email = localStorage.getItem('email');
  const handleSubmit = useCallback(async() => {
    const payload: OTPModel = {
      otp: values,
      email:email
    };

    setIsAuthenticating(true);
    const response = await ActivateUser(payload);
    setIsAuthenticating(false);
    
    if (response.success) {
      dispatch(UserActivate(payload));
      window.location.pathname = './login'
    } else {
      if (typeof response.message === "string") {
        setAuthError(response.message);
      }
    }

  },[dispatch,values,email]);
  return (
      <div className='login-card-container'>
        <Container maxWidth="sm" >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={12}
          >
            <Grid item xs={12}>
         
              <Card>
            
              <Overview/>
              {!!authError && (
                <div>
                  <Alert variant="filled" className="error" severity="error">
                    {authError}
                  </Alert>
                </div>
              )}
                <Divider />
               
                <CardContent>
                <Alert icon={false}  severity="error">
                  <AlertTitle>OTP Verification</AlertTitle>
                  Your OTP is sent to your registered email address.
                </Alert>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: .5, width: '100%' }
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                    <OTPInput
                        autoFocus
                        length={6}
                        className="otpContainer"
                        inputClassName="otpInput"
                        onChangeOTP={(otp)=> setValues(otp)}
                    />
                    </div>
               
                    <Button onClick={()=>handleSubmit()}  fullWidth variant="contained" sx={{ margin: 1 }} style={{color:'#FFFFFFF', backgroundColor:'#C60000'}}>
                      Submit
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              
            </Grid>
            
          </Grid>
         
        </Container>
      </div>
  );
}

export default OTP;
