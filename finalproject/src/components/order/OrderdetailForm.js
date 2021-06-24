import { useState, useContext } from 'react';
import AppContext from 'src/Context';
import {
  TextField,
  Box,
  CardContent,
  Card,
  MenuItem
} from '@material-ui/core';

const OrderdetailFrom = () => {
  const {
    sorder,
    insertOrderdetail,
    product
  } = useContext(AppContext);
  const [newOrder, setNewOrder] = useState({});

  const addNewOrder = (e, field) => {
    setNewOrder({
      ...newOrder,
      OrderId: sorder[0].OrderId,
      [field]: e.target.value,
    });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    insertOrderdetail(newOrder);
    e.target.reset();
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ maxWidth: 3000 }}>
          <form className="insertForm" onSubmit={submitOrder}>
            <h3 style={{ margin: 10 }} align="center">新增訂單產品明細</h3>
            <TextField
              require
              select
              type="text"
              variant="outlined"
              label="產品編號"
              id="ProdId"
              name="ProdId"
              style={{ margin: 10, width: 500 }}
              onChange={(e) => addNewOrder(e, 'ProdId')}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {product.map(({ ProdID, ProdName }) => (
                <MenuItem key={ProdID} value={ProdID}>
                  {ProdID}
                  &nbsp;－&nbsp;
                  {ProdName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              require
              type="text"
              variant="outlined"
              label="數　　量"
              placeholder="請輸入數量"
              id="Qty"
              name="Qty"
              style={{ margin: 10 }}
              onChange={(e) => addNewOrder(e, 'Qty')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              require
              type="text"
              variant="outlined"
              label="折　　扣"
              placeholder="請輸入折扣"
              id="Discount"
              name="Discount"
              style={{ margin: 10 }}
              onChange={(e) => addNewOrder(e, 'Discount')}
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

export default OrderdetailFrom;
