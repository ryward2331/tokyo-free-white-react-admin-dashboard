import { Helmet } from 'react-helmet-async';

import { Grid, Container, Box, Tooltip, IconButton, Typography } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import Feed from './Feed';
import PopularTags from './PopularTags';
import MyCards from './MyCards';
import Addresses from './Addresses';
import Footer from '../../../../components/Footer';
import { useSelector } from 'react-redux';
import { RootStore, useTypedDispatch } from '../../../../Services/Store';
import { fetchListOfTypeBusiness } from '../../../../Services/Actions/Business/BusinessActions';
import { useEffect, useState } from 'react';
import { FetchListOfType } from '../../../../Services/API/Business/Business';
import { fetch_province } from '../../../../Services/API/Constant/Constant';
import { getProvince } from '../../../../Services/Actions/Constant/ConstantActions';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
function ManagementUserProfile() {
  const user_info = useSelector(
    (store: RootStore) => store.SignInReducer.fetch_user_info
  );
  const dispatch =useTypedDispatch();
    const [ open, setOpen] = useState(false);
  useEffect(() => {
    let mounted = true;
    const fetchData = async() => {
      if(mounted){
     
        const FetchListOfType_response = await FetchListOfType();
        const fetch_province_response = await fetch_province();
        if (fetch_province_response.success) {
          dispatch(getProvince());
        } else {
          if (typeof fetch_province_response.message === "string") {
            alert(fetch_province_response.message);
          }
        }

        if (FetchListOfType_response.success) {
          dispatch(fetchListOfTypeBusiness());
        } else {
          if (typeof FetchListOfType_response.message === "string") {
            alert(FetchListOfType_response.message);
          }
        }
      }
      
    }
    /* eslint-disable no-unused-expressions */
    fetchData();
    
  },[]);
  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <Box display="flex" mb={3}>
              <Tooltip arrow placement="top" title="Go back">
                <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
                  <ArrowBackTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Box>
                <Typography variant="h3" component="h3" gutterBottom>
                  Profile for {user_info.first_name}
                </Typography>
                <Typography variant="subtitle2">
                  This is a profile page. Easy to modify, always blazing fast
                </Typography>
              </Box>
            </Box>
      </Grid>
          <Grid item xs={12} md={8}>
            <ProfileCover user={user_info} openRegisterModal={open} closeModal={(value)=> setOpen(value)}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity openModal={(value)=> setOpen(value)} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Feed />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid> */}
          {/* <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
