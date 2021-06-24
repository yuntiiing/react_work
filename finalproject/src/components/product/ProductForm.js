import { useState, useContext } from 'react';
import AppContext from 'src/Context';
import {
  TextField,
  Box,
  CardContent,
  Card
} from '@material-ui/core';

const ProductForm = () => {
  const { insertProduct } = useContext(AppContext);
  const [newProduct, setNewProduct] = useState({});

  const addNewProduct = (e, field) => {
    setNewProduct({
      ...newProduct,
      [field]: e.target.value,
    });
  };

  const submitProduct = (e) => {
    e.preventDefault();
    insertProduct(newProduct);
    e.target.reset();
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ maxWidth: 3000 }}>
          <form className="insertForm" onSubmit={submitProduct}>
            <h3 style={{ margin: 10 }} align="center">新增產品</h3>
            <TextField
              require
              type="text"
              variant="outlined"
              label="產品編號"
              placeholder="請輸入產品編號"
              id="ProdID"
              name="ProdID"
              style={{ margin: 10 }}
              onChange={(e) => addNewProduct(e, 'ProdID')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="產品名稱"
              placeholder="請輸入產品名稱"
              id="ProdName"
              name="ProdName"
              style={{ margin: 10 }}
              onChange={(e) => addNewProduct(e, 'ProdName')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="單　　價"
              placeholder="請輸入價格"
              id="UnitPrice"
              name="UnitPrice"
              style={{ margin: 10 }}
              onChange={(e) => addNewProduct(e, 'UnitPrice')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="成　　本"
              placeholder="請輸入價格"
              id="Cost"
              name="Cost"
              style={{ margin: 10 }}
              onChange={(e) => addNewProduct(e, 'Cost')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="submit"
              value="新增"
              style={{ margin: 10 }}
            />
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
