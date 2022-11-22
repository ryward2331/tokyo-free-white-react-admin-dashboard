import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import Blur from "react-blur";
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import Thumbnail from '../../../../assets/RegisterBusiness.png'
import { useSelector } from 'react-redux';
import { RootStore, useTypedDispatch } from '../../../../Services/Store';
import { setAlertMessage } from '../../../../Services/Actions/Constant/ConstantActions';
import { GetAlertModel } from '../../../../Services/Models/Constant/ConstantModel';
const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity({openModal}) {
  const dispatch =useTypedDispatch();
  const theme = useTheme();
  const user_info = useSelector(
    (store: RootStore) => store.SignInReducer.fetch_user_info
  );
  const handleRegister = async() => {
    if(user_info?.bussiness_id !== null){
      const payloadAlertMessage: GetAlertModel = {
        alertMessage: 'Already registered',
        alertOpen:true,
        typeOfAlert: 'warning'
      };
      await dispatch(setAlertMessage(payloadAlertMessage));
    }else{
      openModal(true);
    }
  };
  return (
      <Card>
        {user_info?.bussiness_id ===null ? 
        (  
          <Blur img={Thumbnail} blurRadius={10} enableStyles>
         <Card>
          <CardHeader title="Recent Activity" />
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
            
              <Box pl={2} flex={1}>
                <Typography variant="h3">Orders</Typography>
    
                <Box pt={2} display="flex">
                  <Box pr={8}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Total
                    </Typography>
                    <Typography variant="h2">485</Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Failed
                    </Typography>
                    <Typography variant="h2">8</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
              <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <Button size="large" variant="contained" color='info' onClick={handleRegister}>
                  Register business
                </Button>
              </Box>
            <Box px={2} py={4} display="flex" alignItems="flex-start">
              <Box pl={2} flex={1}>
                <Typography variant="h3">Favourites</Typography>
    
                <Box pt={2} display="flex">
                  <Box pr={8}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Products
                    </Typography>
                    <Typography variant="h2">64</Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Lists
                    </Typography>
                    <Typography variant="h2">15</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
              <Box pl={2} flex={1}>
                <Typography variant="h3">Reviews</Typography>
    
                <Box pt={2} display="flex">
                  <Box pr={8}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Total
                    </Typography>
                    <Typography variant="h2">654</Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Useful
                    </Typography>
                    <Typography variant="h2">21</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
          </Blur>
          ):(
            <>
            <CardHeader title="Recent Activity" />
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
              <AvatarPrimary>
                <ShoppingBagTwoToneIcon />
              </AvatarPrimary>
              <Box pl={2} flex={1}>
                <Typography variant="h3">Orders</Typography>
    
                <Box pt={2} display="flex">
                  <Box pr={8}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Total
                    </Typography>
                    <Typography variant="h2">485</Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Failed
                    </Typography>
                    <Typography variant="h2">8</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
              <AvatarPrimary>
                <FavoriteTwoToneIcon />
              </AvatarPrimary>
              <Box pl={2} flex={1}>
                <Typography variant="h3">Favourites</Typography>
    
                <Box pt={2} display="flex">
                  <Box pr={8}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Products
                    </Typography>
                    <Typography variant="h2">64</Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Lists
                    </Typography>
                    <Typography variant="h2">15</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
              <AvatarPrimary>
                <StarTwoToneIcon />
              </AvatarPrimary>
              <Box pl={2} flex={1}>
                <Typography variant="h3">Reviews</Typography>
    
                <Box pt={2} display="flex">
                  <Box pr={8}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Total
                    </Typography>
                    <Typography variant="h2">654</Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Useful
                    </Typography>
                    <Typography variant="h2">21</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
        </>    
          )
        }
   
     
      </Card>
  );
}

export default RecentActivity;
