import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { list_of_stocks_model } from '../models/stocks_list_model';
const CustomTable = ({tableTitle,tableCells,withActions,handleClickAction,tableValue}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const theme = useTheme();
  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const applyPagination = (
      tableCells,
      page,
      limit
    ) => {
        return tableCells?.slice(page * limit, page * limit + limit);
    };
    const paginatedTable = applyPagination(
      tableCells,
      page,
      limit
    );
    const handleEditClick = (value) => {
        handleClickAction(value)
    };
  return (
    <Card>
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={selectedAllCryptoOrders}
              indeterminate={selectedSomeCryptoOrders}
              onChange={handleSelectAllCryptoOrders}
            />
          </TableCell> */}
          {tableTitle?.map((value,index)=> {
            if(value ==='Action' && !withActions){
               return;
            }
            return(
                <TableCell key={index}>{value}</TableCell>
            )
          }
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedTable?.map((value,index) => {
        //     const isCryptoOrderSelected = selectedCryptoOrders.includes(
        //     stocks.prod_id
        //   );
          return ( 
            <TableRow
            key={index}
            //   selected={isCryptoOrderSelected}
            >
              {/* <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isCryptoOrderSelected}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleSelectOneCryptoOrder(event, stocks.prod_id)
                  }
                  value={isCryptoOrderSelected}
                />
              </TableCell> */}
            {value?.map((cellValue,index) =>
                index>2 ?
                (
                    <TableCell key={index}>
                        <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap>
                            {cellValue}
                        </Typography>
                    </TableCell>
                )
                :
                null
                )}
                    
                
            {withActions ? (
                <TableCell align="left">
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        
                        onClick={()=>handleEditClick(value)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                        <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        textAlign={'center'}
                        noWrap>
                            Edit
                        </Typography>
                      </IconButton>
                  </TableCell>
                     ): 
                     null}
            </TableRow>
         );
        })}
      </TableBody>
    </Table>
  </TableContainer>
    <Box p={2}>
        <TablePagination
            component="div"
            count={tableCells?.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
        />
    </Box>
 
        
    </Card>
  )};
  export default CustomTable;