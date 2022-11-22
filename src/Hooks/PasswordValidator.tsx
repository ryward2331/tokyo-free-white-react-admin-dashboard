import { TextField } from '@mui/material';
import { useState, useEffect, FC } from 'react';
import React from 'react';
import { Props } from 'react-apexcharts';
import { RegistrationModel } from '../Interface/SignUp/SignUpInterface';

const PasswordFiled: FC<Props> = ({IsFormInvalidPassword,accountPassword,confirmPassword}) => {
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
    password: accountPassword,
    confirmpassword:confirmPassword,
  });
  const handleChange = (prop: keyof RegistrationModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  }

  useEffect(() => {
    setValidLength(values.password.length >= requiredLength ? true : false);
    setUpperCase(values.password.toLowerCase() !== values.password);
    setLowerCase(values.password.toUpperCase() !== values.password);
    setHasNumber(/\d/.test(values.password));
    setMatch(!!values.password && values.password === values.confirmpassword)
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(values.password));

  }, [values, requiredLength]);

  return (
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
  );
}

export default PasswordFiled;