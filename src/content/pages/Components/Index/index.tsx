import { Helmet } from 'react-helmet-async';
import React  from 'react';
import {FC}  from 'react';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from '@mui/material';
import './index.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Overview from '../../../overview';




const Login:FC = () => {
  return (
      <div className='main-card-container'>
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
                    <Button fullWidth variant="contained" sx={{ margin: 1 }} style={{color:'#FFFFFFF', backgroundColor:'#C60000'}} href='/login'>
                      Login
                    </Button>
                    </div>
                    <div>
                    <Button fullWidth variant="outlined" sx={{ margin: 1 }} color='error' href='/signup'>
                      Sign Up
                    </Button>
                    </div>
                  
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
