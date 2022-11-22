import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { Grid, Container, Card } from '@mui/material';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import Footer from '../../../components/Footer';
import { useEffect, useState } from 'react';
import { GetStocksByBusiness, ListOfType } from '../../../Services/API/Stocks/Stocks';
import { fetchListOfTypeOfProduct, fetchStocksByBusiness } from '../../../Services/Actions/Stocks/StocksActions';
import { GetStockbyBusinessModel } from '../../../Services/Models/Stocks/StocksModel';
import { RootStore, useTypedDispatch } from '../../../Services/Store';
import { useSelector } from 'react-redux';
import RecentOrdersTable from './RecentOrdersTable';
import CustomSnackbar from '../../../Hooks/CustomSnackBar';
function ApplicationsTransactions() {

  const dispatch =useTypedDispatch();
  const [openModal, setopenModal] =useState(false);
  useEffect(() => {
    let mounted = true;
    const fetchData = async() => {
      if(mounted){
        const payload: GetStockbyBusinessModel = {
          bussiness_id: '4d0f8c29-c7d6-443d-8ba8-b5f0781e8e27',
        };
        const response = await GetStocksByBusiness(payload);
        if (response.success) {
          dispatch(fetchStocksByBusiness(payload));
          dispatch(fetchListOfTypeOfProduct());
        } else {
          if (typeof response.message === "string") {
            alert(response.message);
          }
        }
      }
      
    }
    /* eslint-disable no-unused-expressions */
    fetchData();
    
  },[dispatch]);
  return (
    <>
      <PageTitleWrapper>
        <PageHeader addNewStock={(value)=> setopenModal(value)}/>
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Card>
          
          <RecentOrdersTable addStock={openModal} closeModal={(value)=> setopenModal(value)}/>
        
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
