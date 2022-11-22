import { useState,useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootStore, useTypedDispatch } from '../../../Services/Store';
import CustomTable from '../../../Hooks/CustomTable';
import { editStocks } from '../../../Interface/Stocks/StocksInterface';
import { AddCircleOutline, Title } from '@mui/icons-material';
import CustomDialog from '../../../Hooks/CustomDialog';
import { AddProductModel, EditProductModel, GetListTypeofProduct, GetStockbyBusinessModel } from '../../../Services/Models/Stocks/StocksModel';
import { AddNewProduct, EditProduct } from '../../../Services/API/Stocks/Stocks';
import { fetchStocksByBusiness } from '../../../Services/Actions/Stocks/StocksActions';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import { setAlertMessage } from '../../../Services/Actions/Constant/ConstantActions';
import { GetAlertModel } from '../../../Services/Models/Constant/ConstantModel';

const RecentOrdersTable = ({addStock,closeModal}) => {

  const stocks_by_business_table = useSelector(
    (store: RootStore) => store.StockReducers.fetch_stocks_by_business
  );
  const list_of_type = useSelector(
    (store: RootStore) => store.StockReducers?.fetchlistOfType
  );
  const tabletitle = ['Product name','Description', 'Category', 'Price', 'Qty', 'Action'];
  const tablecells = JSON.parse(JSON.stringify(stocks_by_business_table))?.map((value) =>[value.type_id,value.stock_id,value.prod_id,value.name,value.description,value.type_name,value.price,value.qty]);

  const [values, setValues] = useState<editStocks>({
    type_id:'',
    stock_id: '',
    prod_id: '',
    name: '',
    description: '',
    type: '',
    price: '',
    qty: '',
  });
  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const dispatch =useTypedDispatch();
  const handleChange =
  (prop: keyof editStocks) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    setFocus(true);
  };
  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
    }
  }, [focus]);

  const editProduct = useCallback(async (value) => {
    setOpen(true);
    await setValues({
      type_id:'',
      stock_id: '',
      prod_id: '',
      name: '',
      description: '',
      type:  '',
      price: '',
      qty:  '',
    });
    await setValues({
        type_id: value[0],
        stock_id: value[1],
        prod_id: value[2],
        name: value[3],
        description: value[4],
        type: value[5],
        price:value[6],
        qty: value[7],
      });
  },[focus,values]);
  const handleSubmitNewProduct = useCallback(async () => {
    const payload2: GetStockbyBusinessModel = {
      bussiness_id: '4d0f8c29-c7d6-443d-8ba8-b5f0781e8e27',
    };
    if(values.name === '' || values.description === '' || values.type_id === '' || values.price==='' || values.qty === '')
    {
      const payloadAlertMessage: GetAlertModel = {
        alertMessage: 'Please fill all required fields',
        alertOpen:true,
        typeOfAlert: 'warning'
      };
       dispatch(setAlertMessage(payloadAlertMessage));
     
      return;
    }
    if(values.prod_id === ''){
      const payload: AddProductModel = {
        name: values.name,
        description: values.description,
        type_of_prod_id: values.type_id,
        bussiness_id: '4d0f8c29-c7d6-443d-8ba8-b5f0781e8e27',
        price: values.price,
        qty: values.qty,
      };
      const response = await AddNewProduct(payload);
      
      if (response?.success) {
        await dispatch(fetchStocksByBusiness(payload2));
        await setOpen(false);
        await closeModal(false);
        const payloadAlertMessage: GetAlertModel = {
          	alertMessage: response.message.toString(),
            alertOpen:true,
            typeOfAlert: 'success'
        };
        await dispatch(setAlertMessage(payloadAlertMessage));

      } else {
        if (typeof response?.message === "string") {
          const payloadAlertMessage: GetAlertModel = {
          	alertMessage: response.message.toString(),
            alertOpen:true,
            typeOfAlert: 'error'
        };
        await dispatch(setAlertMessage(payloadAlertMessage));
        }
      }
    }else {
      if(values.stock_id === '' || values.prod_id === '' || values.name === '' || values.description === '' || values.type_id === '' || values.price==='' || values.qty === '')
      {
        const payloadAlertMessage: GetAlertModel = {
          alertMessage: 'Please fill all required fields',
          alertOpen:true,
          typeOfAlert: 'warning'
        };
        await dispatch(setAlertMessage(payloadAlertMessage));
       
        return;
      }
      const payload: EditProductModel = {
        stock_id: values.stock_id,
        prod_id: values.prod_id,
        name: values.name,
        description: values.description,
        type_of_prod_id: values.type_id,
        bussiness_id: '4d0f8c29-c7d6-443d-8ba8-b5f0781e8e27',
        price: values.price,
        qty: values.qty,
      };
      const response = await EditProduct(payload);
      
      if (response?.success) {
        const payloadAlertMessage: GetAlertModel = {
          alertMessage: response?.message.toString(),
          alertOpen:true,
          typeOfAlert: 'success'
        };
        await dispatch(setAlertMessage(payloadAlertMessage));

        await dispatch(fetchStocksByBusiness(payload2));
        await setValues({
          type_id:'',
          stock_id: '',
          prod_id: '',
          name: '',
          description: '',
          type:  '',
          price: '',
          qty:  '',
        });
        await setOpen(false);
        await closeModal(false);
      } else {
        if (typeof response?.message === "string") {
          const payloadAlertMessage: GetAlertModel = {
            alertMessage: 'Please fill all required fields',
            alertOpen:true,
            typeOfAlert: 'warning'
          };
          await dispatch(setAlertMessage(payloadAlertMessage));
        }
      }
    }

  
  },[values,dispatch]);

  useEffect(()=>{
    if(addStock){
       setValues({
        type_id:'',
        stock_id: '',
        prod_id: '',
        name: '',
        description: '',
        type:  '',
        price: '',
        qty:  '',
      });
      setOpen(true);
    }
  },[addStock]);
  return (
    <>
      <Grid container spacing={5}  justifyContent="center">
        <CustomDialog 
          Title={"Add new products"}
          DialogBody={
          <Grid container spacing={5}  justifyContent="center">
          <Grid item xs={8}>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 2, width: '100%' }
            }}
            >
            <div>
              <TextField
                required
                label="Product Name"
                disabled={Title?.name?.includes('Add') ? true : false}
                 variant={focus || open? "outlined" : "standard"}
                onChange={handleChange('name')}
                value={values.name}
                inputRef={inputRef}
                FormHelperTextProps={{error:true}}
                helperText="This is a required field"
              />
            </div>
            <div>
              <TextField
                
                label="Product Description"
                disabled={Title?.name?.includes('Add') ? true : false}
                variant={focus || open? "outlined" : "standard"}
                onChange={handleChange('description')}
                value={values.description}
                inputRef={inputRef}
              />
            </div>
            <div>
            <FormControl sx={{ m: 2, width: '100%' }} size="medium">
            <InputLabel id="demo-select-small">Product Type</InputLabel>
            <Select
                disabled={Title?.name?.includes('Add') ? true : false}
                value={values?.type_id}
                label="Product Type"
                variant={focus || open? "outlined" : "standard"}
                onChange={handleChange('type_id')}
                inputRef={inputRef}
                fullWidth
              >
                {
                  JSON.parse(JSON.stringify(list_of_type))?.map((value)=>{
                    return(
                      <MenuItem key={value?.type_of_prod_id} value={value?.type_of_prod_id}>{value?.name}</MenuItem>
                    )
                
                  })
                }
              </Select>
              </FormControl>
              </div>
            <div>
              <TextField
               FormHelperTextProps={{error:true}}
               helperText="This is a required field"
                required
                label="Price"
                variant={focus || open? "outlined" : "standard"}
                onChange={handleChange('price')}
                value={values.price}
                inputRef={inputRef}
              />
            </div>
            <div>
              <TextField
              FormHelperTextProps={{error:true}}
               helperText="This is a required field"
                required
                label="Qty"
                variant={focus || open? "outlined" : "standard"}
                onChange={handleChange('qty')}
                value={values.qty}
                inputRef={inputRef}
              />
            </div>
            </Box>
          </Grid>
          </Grid>
        } DialogFooter={ 
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={values.prod_id ===''? <AddCircleOutline fontSize="small" />  : <EditIcon fontSize="small" />}
            onClick={() => handleSubmitNewProduct()}
          >
           {values.prod_id ===''?  "Add New Products" :  "Update Products"}
          </Button>
        </Grid>
      </Grid>
    }
    openDialog={open} 
    maxWidth={"sm"}
    fullWidth={true}
    closeDialog={(value)=> {setOpen(value); closeModal(value);}}
    />
 
      <Grid item xs={12}>
        <CustomTable tableTitle={tabletitle} tableCells={tablecells} withActions={true} handleClickAction={(value)=>  editProduct(value)} tableValue={stocks_by_business_table}/>
      </Grid>
      
      </Grid>
    
      </>
  );
};
export default RecentOrdersTable;

