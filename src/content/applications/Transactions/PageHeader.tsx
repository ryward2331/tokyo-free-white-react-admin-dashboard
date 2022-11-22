import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useTypedDispatch } from '../../../Services/Store';
import { fetchListOfTypeOfProduct } from '../../../Services/Actions/Stocks/StocksActions';
import { ListOfType } from '../../../Services/API/Stocks/Stocks';

function PageHeader({addNewStock}) {
  const dispatch =useTypedDispatch();
  const AddNewStock = async() =>{
    addNewStock(true);
    const response = await ListOfType();
    if (response.success) {
        dispatch(fetchListOfTypeOfProduct());
    } else {
      if (typeof response.message === "string") {
        alert(response.message);
      }
    }
  }
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Stocks
        </Typography>
        <Typography variant="subtitle2">
         Manage your stocks here
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={()=>AddNewStock()}
        >
          Add New Products
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
