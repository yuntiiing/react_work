import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import { Search } from 'react-feather';
import AppContext from 'src/Context';
import ActionsO from 'src/ActionsO';
import { useState } from 'react';
import OrderSearch from 'src/components/order/OrderSearch';
import OrderList from 'src/components/order/OrderList';

const Order = () => {
  const data = ActionsO();
  const [newData, setNewData] = useState({});

  const search = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    data.pressSet(true);
    data.searchOrder(newData);
    e.target.reset();
  };

  return (
    <AppContext.Provider value={data}>
      <>
        <Helmet>
          <title>Orders | Material Kit</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <div className="Product">
            <h1 align="center">訂單資料</h1>
            <Card>
              <CardContent>
                <Box sx={{ maxWidth: 1000 }}>
                  <form className="SearchForm" onSubmit={submitOrder}>
                    <TextField
                      fullWidth
                      color="primary"
                      style={{ margin: 15, width: 500 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              fontSize="small"
                              color="action"
                            >
                              <Search />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      id="Search"
                      name="Search"
                      type="text"
                      placeholder="Search Order"
                      variant="outlined"
                      onChange={(e) => search(e, 'OrderId')}
                    />
                    <TextField
                      style={{ margin: 15 }}
                      type="submit"
                      value="查詢"
                    />
                  </form>
                </Box>
              </CardContent>
            </Card>
            <br />
            <div className="Order">
              {(data.press === true ? (
                <OrderSearch />
              ) : (
                <OrderList />
              )
              )}
            </div>
          </div>
        </Box>
      </>
    </AppContext.Provider>
  );
};

export default Order;
