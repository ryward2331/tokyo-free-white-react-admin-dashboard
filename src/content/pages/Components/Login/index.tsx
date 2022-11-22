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
  Alert
} from '@mui/material';
import './login.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Overview from '../../../overview';
import { iOTP, UserLogin } from '../../../../Interface/Login/LoginInterface';
import { EmailOTPModel, OTPModel, SignInModel } from '../../../../Services/Models/Login/SignInModel';
import {UserSignIn} from '../../../../Services/Actions/Login/SignInActions';
import { useTypedDispatch } from '../../../../Services/Store';
import {SignIn}  from "../../../../Services/API/Login/SignIn";
import {SendNewOTP}  from "../../../../Services/API/SignUp/SignUp";
import { APP_NAME } from '../../../../Helpers/AppConfig';
import { UserSendNewOTP } from '../../../../Services/Actions/SignUp/SignUpActions';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import CustomCircularProgress from '../../../../Hooks/CustomCircularProgress';
function Login() {
  const dispatch=useTypedDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");
  const [logginIn, setlogginIn] = useState<boolean>(false);
  const [values, setValues] = useState<UserLogin>({
    email: '',
    password: '',
  });
  const handleChange =
  (prop: keyof UserLogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = useCallback(async() => {
    setlogginIn(true);
    const payload: SignInModel = {
      email: values.email,
      password: values.password,
    };

    setIsAuthenticating(true);
    const response = await SignIn(payload);
    setIsAuthenticating(false);
    
    if (response.success) {
      localStorage.setItem(
        APP_NAME,
        JSON.stringify({
          access_token: response.data.token,
        })
      );
      dispatch(UserSignIn(payload));
      setTimeout(() => {
        
      setlogginIn(false);
      }, 233000);
      setAuthError('');
    } else {
      if (typeof response.message === "string") {
        setAuthError(response.message);
        setTimeout(() => {
        
          setlogginIn(false);
          }, 233000);
      }
    }

  },[dispatch,values])
  const sendActivation = useCallback(async() => {
    const payload: EmailOTPModel = {
      email: values.email,
    };
    const response = await SendNewOTP(payload);
    if (response.success && values.email !== '') {
      localStorage.setItem('email',values.email);
      window.location.pathname = './otp'
    } else {
      if (typeof response.message === "string") {
        setAuthError(response.message);
      }
    }
     
  },[values]);
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
                  <Alert variant="filled" className="error" severity="error"  action={
                    authError.includes('activate') ?
                      <Button onClick={()=> sendActivation()} color="inherit" size="small" style={{color:'#FFFFFF'}}>
                        Activate Account
                      </Button>
                      : null
                    }>
                    {authError}
                  </Alert>
                </div>
              )}
                {logginIn ?  (<CustomCircularProgress/>):null}
                <Divider />
              
                
                <CardContent>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: .5, width: '100%' }
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        fullWidth
                        id="outlined-required"
                        label="Email Address"
                        onChange={ handleChange('email')}
                        value={values.email}
                      />
                    </div>
                    <div>
                    <TextField
                        id="outlined-password-input"
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={ handleChange('password')}
                        value={values.password}
                      />
                
                    </div>
               
                    <Button onClick={()=>handleSubmit()}  fullWidth variant="contained" sx={{ margin: 1 }} style={{color:'#FFFFFFF', backgroundColor:'#C60000'}}>
                      Login
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

export default Login;

