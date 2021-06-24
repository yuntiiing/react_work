import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search } from 'react-feather';
import AppContext from 'src/Context';
import ActionsP from 'src/ActionsP';
import { useState } from 'react';
import ProductForm from 'src/components/product/ProductForm';
import ProductSearch from 'src/components/product/ProductSearch';
import ProductList from 'src/components/product/ProductList';

const Product = () => {
  const data = ActionsP();
  const [newData, setNewData] = useState({});
  const [press, setPress] = useState(false);

  const search = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const submitProduct = (e) => {
    setPress(true);
    e.preventDefault();
    data.searchProduct(newData);
    e.target.reset();
  };

  const cancle = () => {
    setNewData(null);
    setPress(false);
  };

  return (
    <AppContext.Provider value={data}>
      <>
        <Helmet>
          <title>Products | Material Kit</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <div className="Product">
            <h1 align="center">產品資料</h1>
            <br />
            <ProductForm />
            <br />
            <Card>
              <CardContent>
                <Box sx={{ maxWidth: 1000 }}>
                  <form className="SearchForm" onSubmit={submitProduct}>
                    <TextField
                      fullWidth
                      style={{ margin: 15, width: 500, color: 'yellow !important' }}
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
                      placeholder="Search Product"
                      variant="outlined"
                      onChange={(e) => search(e, 'prod')}
                    />
                    <TextField
                      style={{ margin: 15 }}
                      type="submit"
                      value="查詢"
                    />
                    <TextField
                      style={{ margin: 15 }}
                      type="button"
                      value="返回"
                      onClick={() => cancle()}
                    />
                  </form>
                </Box>
              </CardContent>
            </Card>
            <br />
            <div className="Product">
              {(press === true ? (
                <ProductSearch />
              ) : (
                <ProductList />
              )
              )}
            </div>
          </div>
        </Box>
      </>
    </AppContext.Provider>
  );
};

export default Product;
