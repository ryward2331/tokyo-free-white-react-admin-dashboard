import { FC, useCallback, useEffect, useState } from 'react';
import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  MenuItem
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import validate from 'deep-email-validator';
import Overview from '../../../../content/overview';
import { RegistrationModel } from '../../../../Interface/SignUp/SignUpInterface';
import { SignUpModel } from '../../../../Services/Models/SignUp/SignUpModel';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import './signUp.css';
import { useDispatch } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import { useTypedDispatch } from '../../../../Services/Store';
import PasswordFiled from '../../../../Hooks/PasswordValidator';
import { AddUser } from '../../../../Services/Actions/SignUp/SignUpActions';
const SignUp: FC =() =>{
  const [IsFormInvalidFirstName, setIsFormInvalidFirstName] = useState<boolean>(false);
  const [IsFormInvalidLastName, setIsFormInvalidLastName] = useState<boolean>(false);
  const [IsFormInvalidContactNo, setIsFormInvalidContactNo] = useState<boolean>(false);
  const [IsFormInvalidCity, setIsFormInvalidCity] = useState<boolean>(false);
  const [IsFormInvalidBaranggay, setIsFormInvalidBaranggay] = useState<boolean>(false);
  const [IsFormInvalidStreet, setIsFormInvalidStreet] = useState<boolean>(false);
  const [IsFormInvalidEmail, setIsFormInvalidEmail] = useState<boolean>(false);
  const [IsFormInvalidPassword, setIsFormInvalidPassword] = useState<boolean>(false);
  const [IsFormInvalidUserType, setIsFormInvalidUserType] = useState<boolean>(false);
  const [birthdateValue, setBirthdate] = useState<Dayjs | null>(
    dayjs('0000-00-00T00:00:00'),
  );
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(8)
  const [values, setValues] = useState<RegistrationModel>({
    user_type: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    contact_no: '',
    city: '',
    baranggay: '',
    birth_date:'',
    street: '',
    email: '',
    password: '',
    confirmpassword:'',
  });
  const [UserType, setUserType] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const dispatch=useTypedDispatch();
  
  useEffect(() => {
    setValidLength(values.password.length >= requiredLength ? true : false);
    setUpperCase(values.password.toLowerCase() !== values.password);
    setLowerCase(values.password.toUpperCase() !== values.password);
    setHasNumber(/\d/.test(values.password));
    setMatch(!!values.password && values.password === values.confirmpassword)
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(values.password));

  }, [values, requiredLength]);
  const handleChangeUserType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
    values.user_type = event.target.value;
    if(event.target.value !== "") {
      setIsFormInvalidUserType(false);
      setFormError('Please enter user type');
      
    } else {
   
      setIsFormInvalidUserType(true);
    
    } 
  };
  const handleChange = (prop: keyof RegistrationModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
      if (values.first_name !== ""  ) 
      { 
        setIsFormInvalidFirstName(false);
        setFormError('Please enter a first name');
      
      } else {
        setIsFormInvalidFirstName(true);
      }
    
      if (values.last_name !== ""  ){
        setIsFormInvalidLastName(false);
        setFormError('Please enter a last name');
      
      }  else {
        setIsFormInvalidLastName(true);
      
      }
      
      if (values.contact_no !== "" ) {
        setIsFormInvalidContactNo(false);
        setFormError('Please enter a contact number');
      
      } else {
        setIsFormInvalidContactNo(true);
      }
      
      if (values.city !== "" ){
        setIsFormInvalidCity(false);
        setFormError('Please enter city');
      
      }  else {
        setIsFormInvalidCity(true);
      }
      if(values.baranggay !== "" ){
        setIsFormInvalidBaranggay(false);
        setFormError('Please enter baranggay');
      }  else {
        setIsFormInvalidBaranggay(true);
      }
      if(values.email !== "" ){
        setIsFormInvalidEmail(false);
        setFormError('Please enter valid email');
      
      }  else { 
        setIsFormInvalidEmail(false);
        setFormError('Please enter valid email');
      }
      if(values.street !== "" ){
        setIsFormInvalidStreet(false);
        setFormError('Please enter street');
      
      }  else {
        setIsFormInvalidStreet(true);
      
      }
      if(birthdateValue){
        values.birth_date = birthdateValue.toString();
      }
      validate({
        email: values.email,
        sender: values.email,
        validateRegex: true,
        validateMx: true,
        validateTypo: false,
        validateDisposable: true,
        validateSMTP: true,
      }).then((res)=>{
          if(res.valid){
            setIsFormInvalidEmail(false);
          }else {
        console.log(res);
            setIsFormInvalidEmail(true);
            setFormError('Please enter valid email');
          }
      }).catch((err)=>{
        setIsFormInvalidEmail(false);
        setFormError('Please enter valid email');
      });
  };
  
  const handleBirthdateChange = (newValue: Dayjs | null) => {
    setBirthdate(newValue);
    values.birth_date = birthdateValue.toString();
  };
const handleSubmit = useCallback(() => {
  if(values.first_name === ""  || values.last_name === ""  || values.email === ""  ||
  values.password === ""  || values.street === ""  || values.city === ""  || values.baranggay === ""  || values.user_type === ""
   || values.birth_date === ""){
    alert('Something went wrong');
    setFormError('PLease fill all required fields');
    return;
  }
  if(!validLength || !hasNumber  || !upperCase  || !lowerCase  || !specialChar){
    alert('Please double check the password');
    setFormError('PLease fill all required fields');
    return;
  }
  const payload: SignUpModel = {
    user_type: values.user_type,
    first_name: values.first_name,
    middle_name: values.middle_name,
    last_name: values.last_name,
    contact_no: values.contact_no,
    city: values.city,
    baranggay: values.baranggay,
    birth_date: dayjs(values.birth_date).format('YYYY-MM-DD'),
    street: values.street,
    email: values.email,
    password: values.password,
    confirmpassword: values.confirmpassword,
  };
  dispatch(AddUser(payload));
  alert('Successfully registered');
},[dispatch,values,validLength,hasNumber,upperCase,lowerCase,specialChar])

  const userType = [
    {
      value: '1',
      label: 'Seller',
    },
    {
      value: '2',
      label: 'Customer',
    },
  ];
  return (
      <div className='card-container'>
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
                    required
                    error={IsFormInvalidFirstName}
                    id="outlined-required"
                    label="First Name"
                    onChange={ handleChange('first_name')}
                    value={values.first_name}
                  />
                </div> 
                <div>
                      <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="Middle Name"
                        onChange={ handleChange('middle_name')}
                        value={values.middle_name}
                      />
                    </div> 
                    <div>
                      <TextField
                       required
                        fullWidth
                        error={IsFormInvalidLastName}
                        id="outlined-required"
                        label="Last Name"
                        onChange={ handleChange('last_name')}
                        value={values.last_name}
                      />
                    </div> 
                    <div>
                      <MobileDatePicker
                        label="Birth Date"
                        inputFormat="MM/dd/yyyy"
                        onChange={handleBirthdateChange}
                        value={birthdateValue}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div> <div>
                      <TextField
                       required
                        fullWidth
                        id="outlined-required"
                        label="Contact Number"
                        error={IsFormInvalidContactNo}
                        onChange={ handleChange('contact_no')}
                        value={values.contact_no}
                      />
                    </div> <div>
                      <TextField
                       required
                        fullWidth
                        id="outlined-required"
                        label="Address"
                        placeholder='Blk/Lot/Street' 
                        error={IsFormInvalidStreet}
                        onChange={ handleChange('street')}
                        value={values.street}
                      />
                    </div> <div>
                      <TextField
                       required
                        fullWidth
                        id="outlined-required"
                        label="Barrangay"
                        error={IsFormInvalidBaranggay}
                        onChange={ handleChange('baranggay')}
                        value={values.baranggay}
                      />
                    </div> <div>
                      <TextField
                       required
                        fullWidth
                        id="outlined-required"
                        label="City"
                        error={IsFormInvalidCity}
                        onChange={ handleChange('city')}
                        value={values.city}
                      />
                    </div>
                     <div>
                      <TextField
                       required
                        fullWidth
                        select
                        id="outlined-required"
                        label="User Type"
                        error={IsFormInvalidUserType}
                        onChange={handleChangeUserType}
                        value={UserType}
                      >
                        {userType.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div>
                      <TextField
                       required
                        fullWidth
                        id="outlined-required"
                        label="Email Address"
                        type='email'
                        error={IsFormInvalidEmail}
                        onChange={handleChange('email')}
                        value={values.email}
                      />
                    </div>
                    <div>
        <div>
        <TextField
            required
                id="outlined-password-input"
                fullWidth
                label="Password"
                type="password"
                error={IsFormInvalidPassword}
                autoComplete="current-password"
                onChange={ handleChange('password')}
                value={values.password}
            />
        </div>
        <div>
        <TextField
            required
                id="outlined-password-input"
                fullWidth
                label="Confirm Password"
                type="password"
                error={IsFormInvalidPassword}
                autoComplete="confirm-password"
                onChange={ handleChange('confirmpassword')}
                value={values.confirmpassword}
            />
        </div>
      <ul>
        <li>
          Valid Length: {validLength ? <span style={{color:'#4BB543'}}>True</span> : <span style={{color:'red'}}>False</span>}
        </li>
        <li>
          Has a Number: {hasNumber ? <span style={{color:'#4BB543'}}>True</span> :<span style={{color:'red'}}>False</span>}
        </li>
        <li>
          UpperCase: {upperCase ? <span style={{color:'#4BB543'}}>True</span> :<span style={{color:'red'}}>False</span>}
        </li>
        <li>
          LowerCase: {lowerCase ? <span style={{color:'#4BB543'}}>True</span> :<span style={{color:'red'}}>False</span>}
        </li>
        <li>Match: {match ? <span style={{color:'#4BB543'}}>True</span> :<span style={{color:'red'}}>False</span>}</li>
        <li>
          Special Character: {specialChar ? <span style={{color:'#4BB543'}}>True</span> :<span style={{color:'red'}}>False</span>}
        </li>
      </ul>
    </div>
                    <Button onClick={()=>handleSubmit()} fullWidth variant="contained" sx={{ margin: 1 }} style={{color:'#FFFFFFF', backgroundColor:'#C60000'}}>
                      Register
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

export default SignUp;
